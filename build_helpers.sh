#!/bin/bash

# VoiceApp_Me Build Helper Script
# This script contains helper functions for building the VoiceApp_Me project

echo "VoiceApp_Me Build Helpers"
echo "========================"

# Helper function to check if dependencies are installed
check_dependencies() {
    echo "Checking dependencies..."
    if ! command -v npm &> /dev/null; then
        echo "npm is not installed"
        return 1
    fi
    
    if ! command -v expo &> /dev/null; then
        echo "expo-cli is not installed"
        echo "Install with: npm install -g @expo/cli"
        return 1
    fi
    
    echo "Dependencies check passed"
    return 0
}

# Helper function to install project dependencies
install_deps() {
    echo "Installing project dependencies..."
    npm install
}

# Helper function to start development server
start_dev() {
    echo "Starting development server..."
    expo start
}

# Main execution
case "$1" in
    "check")
        check_dependencies
        ;;
    "install")
        install_deps
        ;;
    "start")
        start_dev
        ;;
    *)
        echo "Usage: $0 {check|install|start}"
        echo "  check   - Check if all dependencies are installed"
        echo "  install - Install project dependencies"
        echo "  start   - Start development server"
        ;;
esac