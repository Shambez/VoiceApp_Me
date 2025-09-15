import 'dotenv/config';

export default {
  expo: {
    name: 'VoiceApp Me',
    slug: 'voiceapp-me',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.shambebabu.voiceappme'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF'
      },
      package: 'com.shambebabu.voiceappme'
    },
    web: {
      favicon: './assets/favicon.png'
    },
    plugins: [
      [
        'expo-av',
        {
          microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone for voice recordings.',
        },
      ],
    ],
    extra: {
      eas: {
        projectId: process.env.EXPO_PROJECT_ID || ''
      }
    }
  }
};