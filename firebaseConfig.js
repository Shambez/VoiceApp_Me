// Firebase configuration for VoiceApp Me
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Fallback configuration if environment variables are not set
if (!firebaseConfig.apiKey) {
  console.warn('Firebase environment variables not found, using fallback configuration');
  Object.assign(firebaseConfig, {
    apiKey: 'AIzaSyAiZhgic2-8Dcbo2_t6grddSIDo_Cmwz64',
    authDomain: 'voiceappme-27679.firebaseapp.com',
    projectId: 'voiceappme-27679',
    storageBucket: 'voiceappme-27679.firebasestorage.app',
    messagingSenderId: '707688440355',
    appId: '1:707688440355:web:d0d6f792d54982f4794796',
    measurementId: 'G-28Q2QMH0MF'
  });
}

export default firebaseConfig;
