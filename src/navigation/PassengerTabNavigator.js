import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import MyPassesScreen from '../screens/Passes/MyPassesScreen';
import JourneysScreen from '../screens/Journeys/JourneysScreen';
import HistoryScreen from '../screens/History/HistoryScreen';
import BottomTabBar from '../components/BottomTabBar/BottomTabBar';

const Tab = createBottomTabNavigator();

export default function PassengerTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MyPasses" component={MyPassesScreen} />
      <Tab.Screen name="Journeys" component={JourneysScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}
