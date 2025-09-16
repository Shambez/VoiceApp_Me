import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SubscriptionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Subscription Plan</Text>
      <Button title="Personal (Monthly)" onPress={() => alert('Subscribe: Personal Monthly Plan')} />
      <Button title="Personal (Yearly)" onPress={() => alert('Subscribe: Personal Yearly Plan')} />
      <Button title="Business (Monthly)" onPress={() => alert('Subscribe: Business Monthly Plan')} />
      <Button title="Business (Yearly)" onPress={() => alert('Subscribe: Business Yearly Plan')} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 }
});
