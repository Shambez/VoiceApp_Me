#!/usr/bin/env node

// Enhanced QR Code Generator for VoiceApp Me
// Updates all QR codes and creates comprehensive download page

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Updated app download URLs with latest information
const APP_URLS = {
  // Latest successful iOS build
  ios: 'https://expo.dev/artifacts/eas/mXN4dkGXdAhcEtTo78MUYo.ipa',
  
  // Expo Go development URL for Android
  android: 'exp://exp.host/@shambez/voiceapp-me',
  
  // GitHub Pages URL for web app
  web: 'https://shambez.github.io/VoiceApp_Me/',
  
  // Alternative local web URL
  webLocal: 'http://localhost:3000',
  
  // GitHub repository
  github: 'https://github.com/Shambez/VoiceApp_Me',
  
  // Firebase console
  firebase: 'https://console.firebase.google.com/project/voiceappme-27679'
};

const QR_OPTIONS = {
  width: 400,
  margin: 3,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  },
  errorCorrectionLevel: 'M'
};

// High contrast QR options for printing
const PRINT_QR_OPTIONS = {
  width: 500,
  margin: 4,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  },
  errorCorrectionLevel: 'H'
};

async function generateAllQRCodes() {
  const qrDir = path.join(__dirname, 'qr-codes');
  
  // Ensure directory exists
  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir, { recursive: true });
  }

  try {
    console.log('🔄 Generating updated QR codes for VoiceApp Me...\n');

    // Generate iOS QR codes (regular and print versions)
    await QRCode.toFile(
      path.join(qrDir, 'ios-app-qr.png'),
      APP_URLS.ios,
      QR_OPTIONS
    );
    await QRCode.toFile(
      path.join(qrDir, 'ios-app-qr-print.png'),
      APP_URLS.ios,
      PRINT_QR_OPTIONS
    );
    console.log('📱 iOS QR codes generated: ios-app-qr.png, ios-app-qr-print.png');

    // Generate Android QR codes
    await QRCode.toFile(
      path.join(qrDir, 'android-app-qr.png'),
      APP_URLS.android,
      QR_OPTIONS
    );
    await QRCode.toFile(
      path.join(qrDir, 'android-app-qr-print.png'),
      APP_URLS.android,
      PRINT_QR_OPTIONS
    );
    console.log('🤖 Android QR codes generated: android-app-qr.png, android-app-qr-print.png');

    // Generate Web QR codes
    await QRCode.toFile(
      path.join(qrDir, 'web-app-qr.png'),
      APP_URLS.web,
      QR_OPTIONS
    );
    await QRCode.toFile(
      path.join(qrDir, 'web-app-qr-print.png'),
      APP_URLS.web,
      PRINT_QR_OPTIONS
    );
    console.log('🌐 Web QR codes generated: web-app-qr.png, web-app-qr-print.png');

    // Generate GitHub repository QR code
    await QRCode.toFile(
      path.join(qrDir, 'github-repo-qr.png'),
      APP_URLS.github,
      QR_OPTIONS
    );
    console.log('📂 GitHub QR code generated: github-repo-qr.png');

    // Generate Firebase console QR code
    await QRCode.toFile(
      path.join(qrDir, 'firebase-console-qr.png'),
      APP_URLS.firebase,
      QR_OPTIONS
    );
    console.log('🔥 Firebase QR code generated: firebase-console-qr.png');

    // Generate comprehensive HTML download page
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VoiceApp Me - Download & QR Codes</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        
        .header {
            text-align: center;
            margin-bottom: 50px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 30px;
        }
        
        .header h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2.5em;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .header .subtitle {
            color: #666;
            font-size: 1.2em;
            margin-bottom: 20px;
        }
        
        .update-info {
            background: #e8f4f8;
            padding: 15px;
            border-radius: 10px;
            border-left: 5px solid #667eea;
        }
        
        .update-info strong {
            color: #333;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin: 40px 0;
        }
        
        .download-card {
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .download-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            border-color: #667eea;
        }
        
        .download-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #667eea, #764ba2);
        }
        
        .download-card h3 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.5em;
        }
        
        .qr-container {
            margin: 25px 0;
            position: relative;
        }
        
        .qr-container img {
            max-width: 200px;
            height: auto;
            border: 3px solid #eee;
            border-radius: 12px;
            transition: transform 0.3s ease;
        }
        
        .qr-container img:hover {
            transform: scale(1.05);
        }
        
        .qr-versions {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
            margin-top: 15px;
        }
        
        .qr-versions a {
            color: #667eea;
            text-decoration: none;
            font-size: 0.9em;
            padding: 5px 10px;
            border: 1px solid #667eea;
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        
        .qr-versions a:hover {
            background: #667eea;
            color: white;
        }
        
        .download-link {
            display: inline-block;
            padding: 15px 30px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            margin: 15px 10px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .download-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .status {
            margin: 15px 0;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 0.9em;
            font-weight: 500;
        }
        
        .status.success { 
            background: #d4edda; 
            color: #155724; 
            border: 1px solid #c3e6cb;
        }
        
        .status.warning { 
            background: #fff3cd; 
            color: #856404; 
            border: 1px solid #ffeaa7;
        }
        
        .status.info { 
            background: #cce7ff; 
            color: #004085; 
            border: 1px solid #74c0fc;
        }
        
        .instructions {
            margin-top: 50px;
            background: #f8f9fa;
            padding: 30px;
            border-radius: 15px;
            border: 2px solid #e9ecef;
        }
        
        .instructions h3 {
            color: #333;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        
        .instructions h4 {
            color: #495057;
            margin-top: 25px;
            margin-bottom: 15px;
        }
        
        .instructions ol, .instructions ul {
            padding-left: 20px;
        }
        
        .instructions li {
            margin-bottom: 8px;
            line-height: 1.6;
        }
        
        .features {
            background: linear-gradient(135deg, #667eea15, #764ba215);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        
        .features ul {
            list-style: none;
            padding-left: 0;
        }
        
        .features li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        
        .features li:last-child {
            border-bottom: none;
        }
        
        .developer-info {
            background: #343a40;
            color: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            margin-top: 30px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.9em;
        }
        
        .developer-info h3 {
            color: #17a2b8;
            margin-bottom: 15px;
        }
        
        .print-section {
            margin-top: 40px;
            padding: 25px;
            background: #fff5d6;
            border-radius: 10px;
            border: 2px dashed #ffc107;
        }
        
        .print-section h3 {
            color: #856404;
            margin-bottom: 15px;
        }
        
        @media print {
            body {
                background: white !important;
                font-size: 12pt;
            }
            .container {
                box-shadow: none;
                padding: 20px;
            }
            .download-link, .qr-versions {
                display: none;
            }
            .download-card {
                break-inside: avoid;
                margin-bottom: 30px;
            }
        }
        
        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            .download-card {
                padding: 20px;
            }
            .header h1 {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎤 VoiceApp Me</h1>
            <p class="subtitle">Voice Call Communication App with Ad On Mute Tool</p>
            <div class="update-info">
                <strong>📅 Last Updated:</strong> ${new Date().toLocaleString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}<br>
                <strong>🔄 Status:</strong> QR Codes Generated & Ready for Scanning<br>
                <strong>📱 Platforms:</strong> iOS, Android, Web
            </div>
        </div>

        <div class="grid">
            <!-- iOS App Card -->
            <div class="download-card">
                <h3>📱 iOS App</h3>
                <div class="qr-container">
                    <img src="ios-app-qr.png" alt="iOS App QR Code" />
                    <div class="qr-versions">
                        <a href="ios-app-qr.png" target="_blank">Screen Version</a>
                        <a href="ios-app-qr-print.png" target="_blank">Print Version</a>
                    </div>
                </div>
                <div class="status success">✅ Build Available</div>
                <a href="${APP_URLS.ios}" class="download-link">📲 Download IPA</a>
                <p><small><strong>Requirements:</strong> iOS device with developer/ad-hoc certificate</small></p>
                <p><small><strong>Size:</strong> ~50MB | <strong>Platform:</strong> iPhone/iPad</small></p>
            </div>

            <!-- Android App Card -->
            <div class="download-card">
                <h3>🤖 Android App</h3>
                <div class="qr-container">
                    <img src="android-app-qr.png" alt="Android App QR Code" />
                    <div class="qr-versions">
                        <a href="android-app-qr.png" target="_blank">Screen Version</a>
                        <a href="android-app-qr-print.png" target="_blank">Print Version</a>
                    </div>
                </div>
                <div class="status warning">⚠️ Development Mode (Expo Go)</div>
                <a href="${APP_URLS.android}" class="download-link">🚀 Open in Expo Go</a>
                <p><small><strong>Requirements:</strong> Expo Go app from Google Play Store</small></p>
                <p><small><strong>Note:</strong> Live development version with hot reload</small></p>
            </div>

            <!-- Web App Card -->
            <div class="download-card">
                <h3>🌐 Web App</h3>
                <div class="qr-container">
                    <img src="web-app-qr.png" alt="Web App QR Code" />
                    <div class="qr-versions">
                        <a href="web-app-qr.png" target="_blank">Screen Version</a>
                        <a href="web-app-qr-print.png" target="_blank">Print Version</a>
                    </div>
                </div>
                <div class="status success">✅ Web Version Ready</div>
                <a href="${APP_URLS.web}" class="download-link">🌍 Open Web App</a>
                <p><small><strong>Compatibility:</strong> Any device with web browser</small></p>
                <p><small><strong>Features:</strong> Full app functionality, installable PWA</small></p>
            </div>

            <!-- GitHub Repository Card -->
            <div class="download-card">
                <h3>📂 Source Code</h3>
                <div class="qr-container">
                    <img src="github-repo-qr.png" alt="GitHub Repository QR Code" />
                </div>
                <div class="status info">🔓 Open Source</div>
                <a href="${APP_URLS.github}" class="download-link">💻 View on GitHub</a>
                <p><small><strong>Repository:</strong> Shambez/VoiceApp_Me</small></p>
                <p><small><strong>License:</strong> MIT | <strong>Language:</strong> React Native</small></p>
            </div>

            <!-- Firebase Console Card -->
            <div class="download-card">
                <h3>🔥 Firebase Console</h3>
                <div class="qr-container">
                    <img src="firebase-console-qr.png" alt="Firebase Console QR Code" />
                </div>
                <div class="status info">⚙️ Backend Dashboard</div>
                <a href="${APP_URLS.firebase}" class="download-link">🔧 Open Console</a>
                <p><small><strong>Project:</strong> voiceappme-27679</small></p>
                <p><small><strong>Services:</strong> Auth, Firestore, Storage, Analytics</small></p>
            </div>
        </div>

        <div class="print-section">
            <h3>🖨️ Printing Instructions</h3>
            <p><strong>For Best Results:</strong></p>
            <ul>
                <li>Use the "Print Version" QR codes for physical printing</li>
                <li>Print on white paper with black ink</li>
                <li>Ensure QR codes are at least 2cm x 2cm in size</li>
                <li>Test scan before cutting/distributing</li>
                <li>Consider laminating for durability</li>
            </ul>
        </div>

        <div class="instructions">
            <h3>📋 Installation Instructions</h3>
            
            <h4>📱 iOS (iPhone/iPad):</h4>
            <ol>
                <li><strong>Scan QR Code:</strong> Use your device camera or QR reader app</li>
                <li><strong>Download:</strong> Tap the notification to open Safari</li>
                <li><strong>Install:</strong> Tap "Download" and then "Install"</li>
                <li><strong>Trust Certificate:</strong> Go to Settings > General > VPN & Device Management</li>
                <li><strong>Trust Developer:</strong> Find and trust the developer certificate</li>
                <li><strong>Launch:</strong> App will appear on home screen</li>
            </ol>

            <h4>🤖 Android:</h4>
            <ol>
                <li><strong>Install Expo Go:</strong> Download from Google Play Store</li>
                <li><strong>Scan QR Code:</strong> Use Expo Go app scanner</li>
                <li><strong>Load App:</strong> App will download and run in development mode</li>
                <li><strong>Live Updates:</strong> App updates automatically with changes</li>
            </ol>

            <h4>🌐 Web Version:</h4>
            <ol>
                <li><strong>Scan QR Code:</strong> Or click the web app link directly</li>
                <li><strong>Open Browser:</strong> Works on Chrome, Safari, Firefox, Edge</li>
                <li><strong>Install as PWA:</strong> Add to home screen for app-like experience</li>
                <li><strong>Offline Support:</strong> Basic functionality works offline</li>
            </ol>

            <div class="features">
                <h4>🎯 App Features:</h4>
                <ul>
                    <li>🎯 <strong>Ad On Mute Tool:</strong> AI-powered ad creation with Simba AI assistant</li>
                    <li>🎙️ <strong>Voice Communication:</strong> High-quality voice call functionality</li>
                    <li>🔥 <strong>Firebase Integration:</strong> Real-time data sync and authentication</li>
                    <li>📱 <strong>Cross-Platform:</strong> Native iOS, Android, and Web support</li>
                    <li>🔒 <strong>Secure:</strong> End-to-end encryption for sensitive data</li>
                    <li>🌙 <strong>Modern UI:</strong> Clean, intuitive interface design</li>
                    <li>⚡ <strong>Performance:</strong> Optimized for speed and battery life</li>
                    <li>🔄 <strong>Live Updates:</strong> Over-the-air updates without app store</li>
                </ul>
            </div>
        </div>

        <div class="developer-info">
            <h3>🔧 Developer Information</h3>
            <p><strong>Project:</strong> @shambez/voiceapp-me</p>
            <p><strong>Bundle ID:</strong> com.shambebabu.voiceappme</p>
            <p><strong>Latest Commit:</strong> ${await getLatestCommitHash()}</p>
            <p><strong>Firebase Project:</strong> voiceappme-27679</p>
            <p><strong>Build Profile:</strong> preview</p>
            <p><strong>Expo SDK:</strong> 54.0.0</p>
            <p><strong>React Native:</strong> 0.81.4</p>
            <p><strong>Node.js:</strong> ${process.version}</p>
            <p><strong>Generated:</strong> ${new Date().toISOString()}</p>
        </div>
    </div>
</body>
</html>`;

    const downloadHtmlPath = path.join(qrDir, 'download.html');
    fs.writeFileSync(downloadHtmlPath, htmlContent);
    console.log('📄 Comprehensive download page created: download.html');

    // Create a simple index.html redirect
    const indexRedirect = `<!DOCTYPE html>
<html><head><meta http-equiv="refresh" content="0;url=download.html"></head>
<body><p>Redirecting to <a href="download.html">download page</a>...</p></body></html>`;
    
    fs.writeFileSync(path.join(qrDir, 'index.html'), indexRedirect);

    console.log('\n✅ All QR codes and download pages generated successfully!');
    console.log(`📁 Files saved to: ${qrDir}`);
    console.log(`🌐 Main page: file://${downloadHtmlPath}`);
    console.log('\n📱 QR Codes Generated:');
    console.log('   📱 iOS: ios-app-qr.png (+ print version)');
    console.log('   🤖 Android: android-app-qr.png (+ print version)');
    console.log('   🌐 Web: web-app-qr.png (+ print version)');
    console.log('   📂 GitHub: github-repo-qr.png');
    console.log('   🔥 Firebase: firebase-console-qr.png');

    // Try to open the download page automatically
    const { exec } = require('child_process');
    exec(`open "${downloadHtmlPath}"`, (error) => {
      if (!error) {
        console.log('\n🚀 Opening download page in your default browser...');
      } else {
        console.log('\n💡 Manually open the download page in your browser:');
        console.log(`   file://${downloadHtmlPath}`);
      }
    });

  } catch (error) {
    console.error('❌ Error generating QR codes:', error);
    process.exit(1);
  }
}

async function getLatestCommitHash() {
  try {
    const { exec } = require('child_process');
    return new Promise((resolve) => {
      exec('git rev-parse --short HEAD', (error, stdout) => {
        resolve(error ? 'unknown' : stdout.trim());
      });
    });
  } catch {
    return 'unknown';
  }
}

// Run if called directly
if (require.main === module) {
  generateAllQRCodes();
}

module.exports = { generateAllQRCodes, APP_URLS };