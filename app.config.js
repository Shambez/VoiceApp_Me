import 'dotenv/config';

export default {
  expo: {
    name: 'VoiceApp Me',
    slug: 'voiceapp-me',
    version: '1.0.0',
    owner: 'shambez',
    orientation: 'portrait',
    icon: './assets/voiceappme_icon_update.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/voiceappme_icon_update.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.shambebabu.voiceappme',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      icon: './assets/voiceappme_icon_update.png',
      package: 'com.shambebabu.voiceappme',
      jsEngine: 'jsc'
    },
    web: {
      favicon: './assets/voiceappme_icon_update.png'
    },
    plugins: [
      [
        'expo-av',
        {
          microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone for voice recordings.',
        },
      ],
    ],
    updates: {
      url: "https://u.expo.dev/677f6294-79c1-4bf9-b8fb-b212ec28fb88",
      enabled: true,
      checkAutomatically: 'ON_LOAD',
      fallbackToCacheTimeout: 10000,
      requestHeaders: {
        'expo-channel-name': process.env.EXPO_PUBLIC_APP_ENV || 'preview'
      }
    },
    runtimeVersion: {
      policy: 'sdkVersion'
    },
    extra: {
      eas: {
        projectId: process.env.EXPO_PROJECT_ID || '677f6294-79c1-4bf9-b8fb-b212ec28fb88'
      },
      firebase: {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
      }
    }
  }
};
