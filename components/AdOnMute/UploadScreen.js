import React from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';

export default function UploadScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/simba_ai.png')} style={styles.logo} />
      <Text style={styles.title}>
        Hey there, I’m Simba — your personal AI guide!
        {"\n"}Ready to help you roam the digital savannahs, answer your questions, create ads, or handle anything you throw at me.
        {"\n\n"}Speak or Type, and let’s conquer this together (Hyena-free)! 🦁✨
      </Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Subscription" onPress={() => navigation.navigate('Subscription')} />
      <Button title="Legal" onPress={() => navigation.navigate('Legal')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" },
  logo: { width: 120, height: 120, marginBottom: 20, borderRadius: 24 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }
});