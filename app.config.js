import { ExpoConfig, ConfigContext } from "expo/config";
import "dotenv/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: process.env.EXPO_PUBLIC_APP_NAME || "VoiceApp Me",
    slug: "voiceapp-me",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.shambebabu.voiceappme"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.shambebabu.voiceappme"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-dev-client",
      [
        "expo-av",
        {
          microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone to record audio."
        }
      ],
      [
        "expo-media-library",
        {
          photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
          savePhotosPermission: "Allow $(PRODUCT_NAME) to save photos.",
          isAccessMediaLocationEnabled: true
        }
      ]
    ],
    runtimeVersion: {
      policy: "sdkVersion"
    },
    updates: {
      url: "https://u.expo.dev/your-project-id",
      requestHeaders: {
        "expo-channel-name": "main"
      }
    },
    extra: {
      eas: {
        projectId: process.env.EXPO_PROJECT_ID
      }
    }
  };
};
