import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';


<<<<<<< HEAD
import ModulesNavigator from './navigation/ModulesNavigator';
useScreens();

export default function App() {
  return (
    <ModulesNavigator />
  
=======
import MainNavigator from './navigation/MainNavigator';
enableScreens();

export default function App() {
  return (
    <MainNavigator />

>>>>>>> 3a69632d93384dc8593d514f2aaa7a3d42034364
  );
}


