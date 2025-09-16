
#!/usr/bin/env bash
# FULL PIPELINE: cleanup → version bump → git sync → OTA (dev/preview/prod, with retries)
# → EAS builds (dev/preview/prod, iOS & Android, with polling/retries) → auto-download artifacts.
set -euo pipefail

APP_NAME="VoiceApp_Me"
APP_DIR="/Users/shambebabu/Desktop/VoiceApp_Me"
DOWNLOAD_DIR="${HOME}/Downloads/Autopilot/${APP_NAME}"
MAX_RETRIES=${MAX_RETRIES:-3}
SLEEP_SECS=${SLEEP_SECS:-30}
RETRY_WAIT=${RETRY_WAIT:-15}

require_cmd() { command -v "$1" >/dev/null 2>&1 || { echo "❌ Missing command: $1"; exit 1; }; }
json_get() { jq -r "$1"; }

ensure_login() {
  if ! eas whoami >/dev/null 2>&1; then
    echo "🔐 Logging into Expo…"
    eas login
  fi
}

cleanup_env() {
  echo "🧹 Cleanup…"
  watchman watch-del-all >/dev/null 2>&1 || true
  find "$APP_DIR" -name ".DS_Store" -delete || true
}

bump_versions() {
  local file="${APP_DIR}/app.json"
  if [[ ! -f "$file" ]]; then echo "⚠️ No app.json found; skipping version bump"; return 0; fi
  echo "📈 Bumping versions in app.json…"
  tmp="${file}.tmp"
  jq '
    .expo.version as $v
    | ($v // "1.0.0") as $safe
    | ($safe | split(".") | if (length==3) then . else ["1","0","0"] end) as $parts
    | ($parts[2] | tonumber? // 0) as $patch
    | .expo.version = ($parts[0]+"."+ $parts[1]+"."+ (($patch+1)|tostring))
    | .ios.buildNumber = ((.ios.buildNumber|tostring|tonumber? // 0) + 1 | tostring)
    | .android.versionCode = ((.android.versionCode // 0) + 1)
  ' "$file" > "$tmp" && mv "$tmp" "$file"
}

git_sync() {
  echo "🔄 Git sync…"
  (cd "$APP_DIR" && git add . && git commit -m "${APP_NAME} Autopilot $(date -u +'%Y-%m-%dT%H:%M:%SZ')" || true)
  (cd "$APP_DIR" && git push origin main || true)
  (cd "$APP_DIR" && git push origin preview || true)
  (cd "$APP_DIR" && git push origin backup/bare-current || true)
}

gpt5_check() {
  echo "🤖 Checking GPT-5 wiring…"
  if ! grep -Riq "gpt-5" "$APP_DIR"; then
    echo "⚠️ GPT-5 reference not found in repo. Proceeding, but verify your env and code paths."
  fi
}

ensure_update_config() {
  echo "⚙️ Ensuring update config…"
  npx expo install expo-updates >/dev/null 2>&1 || true
  eas update:configure --non-interactive || true
}

ota_push_with_retry() {
  local channel="$1"
  local attempt=1
  while (( attempt <= MAX_RETRIES )); do
    echo "🚀 OTA → channel=${channel} (attempt ${attempt}/${MAX_RETRIES})"
    if eas update --channel "${channel}" --message "${APP_NAME} OTA to ${channel}" --json --non-interactive | jq . >/dev/null; then
      echo "✅ OTA accepted for ${channel}"
      return 0
    fi
    echo "⚠️ OTA failed for ${channel}; applying fixes and retrying in ${RETRY_WAIT}s…"
    ensure_update_config
    bump_versions
    sleep "${RETRY_WAIT}"
    attempt=$((attempt+1))
  done
  echo "❌ OTA failed for ${channel} after ${MAX_RETRIES} attempts"; exit 1
}

start_build() {
  local profile="$1" platform="$2"
  echo "🏗️ Starting build: profile=${profile}, platform=${platform}"
  local out
  if ! out=$(eas build --profile "${profile}" --platform "${platform}" --json --non-interactive); then
    return 1
  fi
  echo "$out" | json_get '.[0].id'
}

wait_and_download() {
  local build_id="$1" profile="$2" platform="$3"
  mkdir -p "${DOWNLOAD_DIR}/${profile}"
  echo "⏳ Waiting for build ${build_id} (${profile}/${platform})…"

  while true; do
    local view
    if ! view=$(eas build:view --build-id "${build_id}" --json); then
      echo "⚠️ Could not view build ${build_id}; retrying in ${SLEEP_SECS}s…"
      sleep "${SLEEP_SECS}"; continue
    fi
    local status artifact
    status=$(echo "$view" | json_get '.status')
    artifact=$(echo "$view" | json_get '.artifacts.buildUrl // .artifacts.applicationArchiveUrl // empty')
    case "$status" in
      finished)
        if [[ -n "$artifact" && "$artifact" != "null" ]]; then
          local fname="${APP_NAME}_${profile}_${platform}_$(date +%Y%m%d_%H%M%S)"
          case "$platform" in
            ios) fname="${fname}.ipa" ;;
            android) fname="${fname}.apk" ;;
          esac
          echo "⬇️  Downloading ${platform} artifact…"
          curl -L --fail -o "${DOWNLOAD_DIR}/${profile}/${fname}" "$artifact"
          echo "✅ Downloaded → ${DOWNLOAD_DIR}/${profile}/${fname}"
          return 0
        else
          echo "❌ Finished but no artifact URL; treating as error."
          return 2
        fi
        ;;
      errored|canceled)
        echo "❌ Build ${build_id} ended with status=${status}"
        return 1
        ;;
      in-queue|in-progress|new|pending)
        sleep "${SLEEP_SECS}"
        ;;
      *)
        echo "ℹ️ status=${status}; sleeping ${SLEEP_SECS}s…"
        sleep "${SLEEP_SECS}"
        ;;
    esac
  done
}

build_with_retry() {
  local profile="$1" platform="$2"
  local attempt=1
  while (( attempt <= MAX_RETRIES )); do
    local build_id
    if ! build_id=$(start_build "$profile" "$platform"); then
      echo "⚠️ Failed to start build (${profile}/${platform}); fixing & retrying…"
      bump_versions
      ensure_update_config
      sleep "${RETRY_WAIT}"
      attempt=$((attempt+1))
      continue
    fi
    if wait_and_download "$build_id" "$profile" "$platform"; then
      echo "✅ Build OK: ${profile}/${platform}"
      return 0
    else
      echo "⚠️ Build failed or artifact missing (${profile}/${platform}); applying fixes & retrying in ${RETRY_WAIT}s…"
      bump_versions
      ensure_update_config
      sleep "${RETRY_WAIT}"
      attempt=$((attempt+1))
    fi
  done
  echo "❌ Build failed after ${MAX_RETRIES} attempts: ${profile}/${platform}"
  exit 1
}

main() {
  echo "📞 ${APP_NAME} — FULL Autopilot"
  require_cmd jq; require_cmd curl; require_cmd eas; require_cmd git
  cd "$APP_DIR"

  cleanup_env
  ensure_login
  bump_versions
  git_sync
  gpt5_check
  ensure_update_config

  for ch in development preview production; do
    ota_push_with_retry "$ch"
  done

  for profile in development preview production; do
    build_with_retry "$profile" ios
    build_with_retry "$profile" android
  done

  echo "🎉 ${APP_NAME} — Pipeline complete. Artifacts in ${DOWNLOAD_DIR}"
}

main "$@"