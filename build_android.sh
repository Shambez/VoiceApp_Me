#!/bin/bash

echo "🤖 Starting Android Build..."
echo "This will:"
echo "1. Build Android APK with EAS"
echo "2. Generate QR code when complete"
echo "3. Update the download page"
echo ""

# Start the build
echo "Starting EAS build..."
BUILD_ID=$(npx eas build --platform android --profile preview --no-wait --json | jq -r '.id' 2>/dev/null)

if [ "$BUILD_ID" != "null" ] && [ ! -z "$BUILD_ID" ]; then
    echo "✅ Build started! ID: $BUILD_ID"
    echo "🔍 You can check status at: https://expo.dev/accounts/shambez/projects/voiceapp-me/builds/$BUILD_ID"
    
    # Wait for build completion (optional)
    echo ""
    echo "💡 To generate QR code after build completes, run:"
    echo "   ./update_android_qr.sh"
else
    echo "❌ Build failed to start. Try again when network is more stable."
    echo ""
    echo "Manual command:"
    echo "npx eas build --platform android --profile preview"
fi