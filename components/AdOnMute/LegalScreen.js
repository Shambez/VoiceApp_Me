import React from 'react';
import { ScrollView, Text, Button, StyleSheet } from 'react-native';

export default function LegalScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Legal Documents</Text>
      <Text style={styles.legalText}>
        By using this app, you agree to our Terms of Use, Privacy Policy, Intellectual Property Policy, and Subscription Terms.
        {"\n\n"}These documents are available in multiple languages and protect both users and owners. For full legal details, see the /legal folder or contact smartifybuy@gmail.com.
        {"\n\n"}Powered by Simba AI — your digital guide.
      </Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  legalText: { fontSize: 16, textAlign: 'left', marginBottom: 24 }
});
