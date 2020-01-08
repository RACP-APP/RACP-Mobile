import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useScreens } from 'react-native-screens';



import ModulesNavigator from './navigation/ModulesNavigator';
useScreens();


export default function App() {
  return (
    <ModulesNavigator />
  
  );
}


