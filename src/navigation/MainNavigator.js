import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PassengerTabNavigator from './PassengerTabNavigator';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PassengerDashboard" component={PassengerTabNavigator} />
    </Stack.Navigator>
  );
}