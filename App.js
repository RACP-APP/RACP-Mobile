import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useScreens } from 'react-native-screens';


import MainNavigator from './navigation/MainNavigator';
useScreens();

export default function App() {
  return (
    <MainNavigator />
  
  );
}


