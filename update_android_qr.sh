#!/bin/bash

echo "🔄 Updating Android QR code..."

# Get latest builds
npx eas build:list --json --limit 5 > deployment/qr-codes/builds.json 2>/dev/null

# Extract latest successful Android build URL
ANDROID_URL=$(jq -r '.[] | select(.platform == "ANDROID" and .status == "FINISHED") | .artifacts.buildUrl' deployment/qr-codes/builds.json | head -1)

if [ "$ANDROID_URL" != "null" ] && [ ! -z "$ANDROID_URL" ] && [ "$ANDROID_URL" != "" ]; then
    echo "✅ Found successful Android build!"
    echo "📱 Android APK URL: $ANDROID_URL"
    
    # Generate Android QR code
    qrencode -o deployment/qr-codes/images/android_app.png -s 8 "$ANDROID_URL"
    echo "✅ Android QR code generated!"
    
    # Update the download page with Android section
    cat > deployment/qr-codes/android_section.html << EOF
        <!-- Android Section -->
        <div class="platform-section">
            <div class="platform-title">🤖 Android App</div>
            <div class="status available">✅ Ready to Download</div>
            
            <div class="qr-code">
                <img src="images/android_app.png" alt="Android App QR Code" />
            </div>
            
            <div class="instructions">
                <strong>Android Instructions:</strong><br>
                1. Scan QR code with any QR scanner app<br>
                2. Download the APK file<br>
                3. Enable "Install from Unknown Sources" in Settings<br>
                4. Install the app
            </div>
            
            <div class="url">
                Direct link: <br>
                <a href="$ANDROID_URL" style="color: #FFD700;">
                    Download Android App (.apk)
                </a>
            </div>
        </div>
EOF

    echo "✅ Download page updated!"
    echo "🎉 Android QR code is ready!"
    echo ""
    echo "📂 Files updated:"
    echo "   - deployment/qr-codes/images/android_app.png"
    echo "   - deployment/qr-codes/android_section.html"
    echo ""
    echo "🌐 View at: deployment/qr-codes/download.html"
    
else
    echo "❌ No successful Android build found yet."
    echo "🔄 Check build status and try again when build completes."
    echo ""
    echo "💡 Check build status:"
    echo "   npx eas build:list --platform android --limit 3"
fi