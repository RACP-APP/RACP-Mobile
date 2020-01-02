import React from 'react';
import {Platform}from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {
    Ionicons, 
    EvilIcons, 
    MaterialCommunityIcons
} from '@expo/vector-icons';


import HomeScreen from '../screen/HomeScreen';
import ModulesScreen from '../screen/ModulesScreen';
import ModuleContentScreen from '../screen/ModuleContentScreen';
import Messages from '../src/components/Messages';
import Progress from '../src/components/Progress';
import LightMode from '../src/components/LightMode';
import Language from '../src/components/Language';
import FontSizes from '../src/components/FontSizes';
import Colors from '../constants/Colors';



const defaultStackNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen',
  };


const ModulesNavigator = createStackNavigator({
    Home: HomeScreen,
    Modules:{
        screen: ModulesScreen
    },
    ModuleContent: ModuleContentScreen,
},
{
    // initialRouteName: 'Home',
    defaultNavigationOptions: defaultStackNavOptions
    
}
);


const ProgressTabNavigator = createStackNavigator({
    Progress: Progress
},
{
    defaultNavigationOptions: defaultStackNavOptions
});

const MessageTabNavigator = createStackNavigator({
    Message: Messages
},
{
    defaultNavigationOptions: defaultStackNavOptions
});

const LightModeTabNavigator = createStackNavigator({
    LightModes: LightMode
},
{
  defaultNavigationOptions: defaultStackNavOptions
});

const LanguageTabNavigator = createStackNavigator({
  Languages: Language
},
{
  defaultNavigationOptions: defaultStackNavOptions
});

const FontSizeTabNavigator = createStackNavigator({
  FontSizes:  FontSizes
},
{
  defaultNavigationOptions: defaultStackNavOptions
});


const tabScreenConfig = {
    Start: {
        screen: ModulesNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
              return (
                <Ionicons name="ios-play" size={25} color={tabInfo.tintColor} />
              );
            },
            tabBarColor: Colors.primaryColor
          }
    },
    Progress: {
        screen: ProgressTabNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
              return (
                <MaterialCommunityIcons name="progress-check" size={25} color={tabInfo.tintColor} />
              );
            },
            tabBarColor: Colors.accentColor
          }
    },

    Messages: {
        screen: MessageTabNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
              return (
                <EvilIcons name="envelope" size={25} color={tabInfo.tintColor} />
              );
            },
            tabBarColor: Colors.lightBlueColor
          }
    }
} 



  const ModulesTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        initialRouteName:'Start',
        tabBarOptions: {
          activeTintColor: Colors.accentColor
        }
        
      });
      const MainNavigator = createDrawerNavigator(
        {
          ModulesContents: {
            screen: ModulesTabNavigator,
            navigationOptions: {
              drawerLabel: 'Lists'
            }
          },
          LightModes: LightModeTabNavigator,
          Languages: LanguageTabNavigator,
          FontSizes: FontSizeTabNavigator
        

        },
        {
          contentOptions: {
            activeTintColor: Colors.accentColor
          }
        }
      );

export default createAppContainer(MainNavigator);