import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GreetingScreen from '../screens/Auth/GreetingScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* SignIn is now the landing/initial route */}
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Greeting" component={GreetingScreen} />
    </Stack.Navigator>
  );
}