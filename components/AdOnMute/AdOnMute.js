import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadScreen from './UploadScreen';
import LoginScreen from './LoginScreen';
import SubscriptionScreen from './SubscriptionScreen';
import LegalScreen from './LegalScreen';

const Stack = createNativeStackNavigator();

export default function AdOnMute({ onBack }) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Upload"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4f3f4',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={onBack} style={{ marginLeft: 10 }}>
              <Text style={{ color: '#007AFF', fontSize: 16 }}>← Back</Text>
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen 
          name="Upload" 
          component={UploadScreen} 
          options={{ title: 'Ad On Mute - Simba AI' }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="Subscription" 
          component={SubscriptionScreen} 
          options={{ title: 'Subscription Plans' }}
        />
        <Stack.Screen 
          name="Legal" 
          component={LegalScreen} 
          options={{ title: 'Legal Documents' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}