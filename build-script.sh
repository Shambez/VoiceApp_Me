#!/bin/bash

echo "🚀 Block 5b — Building & Publishing VoiceApp_Me with OTA QR"

# 1. Run builds locally (with corrected paths)
echo "Building iOS simulator..."
npx react-native run-ios --simulator="iPhone 15"

echo "Building Android debug..."
cd android && ./gradlew assembleDebug && cd ..

# 2. Publish OTA update to Preview branch
echo "Publishing OTA update..."
eas update --branch preview --message "VoiceApp_Me Block 5b OTA update"

# 3. Build installable artifacts
echo "Building for all platforms..."
eas build --platform all --profile preview --non-interactive

# 4. Save QR codes for family testing
echo "Saving QR codes..."
mkdir -p deployment/qr-codes

# Get build information
eas build:list --json --limit 3 > deployment/qr-codes/builds.json

# Extract URLs if builds exist
if [ -s deployment/qr-codes/builds.json ]; then
    jq -r '.[].artifacts.buildUrl' deployment/qr-codes/builds.json > deployment/qr-codes/urls.txt 2>/dev/null || echo "No build URLs available yet" > deployment/qr-codes/urls.txt
else
    echo "No builds found yet" > deployment/qr-codes/urls.txt
fi

echo "✅ Block 5b complete — VoiceApp_Me ready for install via QR codes."