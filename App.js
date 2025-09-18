import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import AdOnMute from './components/AdOnMute/AdOnMute';
import { testFirebaseConfig } from './utils/firebaseTest';
import { initializeUpdates, getCurrentUpdateInfo } from './utils/updateManager';

export default function App() {
  const [showAdOnMute, setShowAdOnMute] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState(null);
  const [updateInfo, setUpdateInfo] = useState(null);

  useEffect(() => {
    async function initializeApp() {
      // Test Firebase configuration
      const firebaseResult = testFirebaseConfig();
      setFirebaseStatus(firebaseResult.isValid ? '🔥 Firebase Connected' : '❌ Firebase Config Error');
      
      // Initialize EAS Updates
      try {
        const updateResult = await initializeUpdates();
        const currentInfo = await getCurrentUpdateInfo();
        setUpdateInfo(currentInfo);
        console.log('🚀 App initialized with updates:', currentInfo);
      } catch (error) {
        console.error('❌ Error initializing updates:', error);
      }
    }
    
    initializeApp();
  }, []);

  if (showAdOnMute) {
    return <AdOnMute onBack={() => setShowAdOnMute(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.title}>VoiceApp Me</Text>
        <Text style={styles.subtitle}>Voice Call Communication App</Text>
        {firebaseStatus && (
          <Text style={styles.statusText}>{firebaseStatus}</Text>
        )}
        {updateInfo && (
          <Text style={styles.statusText}>
            📲 Updates: {updateInfo.isEmbeddedLaunch ? 'Built-in' : 'OTA'} | Channel: {updateInfo.channel || 'default'}
          </Text>
        )}
        
        <View style={styles.toolsContainer}>
          <TouchableOpacity 
            style={styles.toolButton}
            onPress={() => setShowAdOnMute(true)}
          >
            <Text style={styles.toolButtonText}>🎯 Ad On Mute Tool</Text>
            <Text style={styles.toolDescription}>AI-powered ad creation with Simba AI</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
  },
  toolsContainer: {
    width: '100%',
    maxWidth: 300,
  },
  toolButton: {
    backgroundColor: '#f4f3f4',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    marginVertical: 8,
  },
  toolButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  toolDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
