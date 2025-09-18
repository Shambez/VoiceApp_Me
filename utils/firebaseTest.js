import firebaseConfig from '../firebaseConfig';

export const testFirebaseConfig = () => {
  console.log('Firebase Configuration Test:');
  console.log('API Key:', firebaseConfig.apiKey ? '✓ Set' : '✗ Missing');
  console.log('Auth Domain:', firebaseConfig.authDomain ? '✓ Set' : '✗ Missing');
  console.log('Project ID:', firebaseConfig.projectId ? '✓ Set' : '✗ Missing');
  console.log('Storage Bucket:', firebaseConfig.storageBucket ? '✓ Set' : '✗ Missing');
  console.log('Messaging Sender ID:', firebaseConfig.messagingSenderId ? '✓ Set' : '✗ Missing');
  console.log('App ID:', firebaseConfig.appId ? '✓ Set' : '✗ Missing');
  console.log('Measurement ID:', firebaseConfig.measurementId ? '✓ Set' : '✗ Missing');
  
  return {
    isValid: !!(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId),
    config: firebaseConfig
  };
};

export default { testFirebaseConfig };