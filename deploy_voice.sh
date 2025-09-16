#!/bin/bash

# VoiceApp_Me Deployment Script
# Handles deployment of the VoiceApp_Me mobile application

echo "VoiceApp_Me Deployment"
echo "====================="

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "❌ Expo CLI is not installed"
    echo "Install with: npm install -g @expo/cli"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Run this script from the project root."
    exit 1
fi

echo "✅ Pre-deployment checks passed"

# Build the application
echo "🚀 Starting build process..."

case "$1" in
    "android")
        echo "Building Android APK..."
        expo build:android
        ;;
    "ios")
        echo "Building iOS IPA..."
        expo build:ios
        ;;
    "web")
        echo "Building for web..."
        expo build:web
        ;;
    *)
        echo "Usage: $0 {android|ios|web}"
        echo "  android - Build Android APK"
        echo "  ios     - Build iOS IPA"
        echo "  web     - Build for web"
        exit 1
        ;;
esac

echo "✅ Build completed successfully!"