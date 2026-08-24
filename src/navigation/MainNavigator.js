import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PassengerDashboardScreen from '../screens/Home/PassengerDashboardScreen';
import StaffDashboardScreen from '../screens/Home/StaffDashboardScreen';
import useAuthStore from '../store/useAuthStore';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const user = useAuthStore((state) => state.user);
  
  // If user is a driver or conductor, show the Staff Dashboard, otherwise Passenger
  const isStaff = user?.role === 'driver' || user?.role === 'conductor';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isStaff ? (
        <Stack.Screen name="StaffDashboard" component={StaffDashboardScreen} />
      ) : (
        <Stack.Screen name="PassengerDashboard" component={PassengerDashboardScreen} />
      )}
    </Stack.Navigator>
  );
}