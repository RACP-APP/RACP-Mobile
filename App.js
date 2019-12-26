import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';


import MainNavigator from './navigation/MainNavigator';
enableScreens();

export default function App() {
  return (
    <MainNavigator />

  );
}


