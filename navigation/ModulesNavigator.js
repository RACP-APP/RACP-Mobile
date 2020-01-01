import React from 'react';
import {Platform}from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons, EvilIcons, MaterialCommunityIcons} from '@expo/vector-icons';

import HomeScreen from '../screen/HomeScreen';
import ModulesScreen from '../screen/ModulesScreen';
import ModuleDetailScreen from '../screen/ModuleDetailScreen.js'
import Messages from '../src/components/Messages';
import Progress from '../src/components/Progress';
import Colors from '../constants/Colors';



const defaultStackNavOptions = {
    initialRouteName: 'Home',
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen',
    initialRouteName: 'Home'
  };




const ModulesNavigator = createStackNavigator({
    Home: HomeScreen,
    Modules:{
        screen: ModulesScreen
    },
    ModuleDetail: ModuleDetailScreen,
},
{
    initialRouteName: 'Home',
    defaultNavigationOptions: defaultStackNavOptions
    
}
);


const ProgressTabNavigator = createStackNavigator(
    {
    Progress: Progress
},
{
    defaultNavigationOptions: defaultStackNavOptions
}
)
const MessageTabNavigator = createStackNavigator({
    Message: Messages
});


const AppTabNavigator = createBottomTabNavigator(
    {
    Progress: {
        screen: ProgressTabNavigator,
        navigationOptions:{
            tabBarIcon: (tabInfo)=> <MaterialCommunityIcons
            name='progress-check' size={25} color={Colors.blueColor} />
        }

    },
    Start: {
        screen: ModulesNavigator,
        navigationOptions:{
            // tabBarLabel:'StartApp',
            tabBarIcon: (tabInfo)=> {
                return <Ionicons name='ios-play' size={25} color={Colors.blueColor} />;
            }
        }
    },

    Messages: {
        screen: MessageTabNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo)=> <EvilIcons
             name='envelope'
             size={25}
              color={Colors.blueColor}
             />
                
            
        }
    }

},{
    initialRouteName: 'Start',
    tabBarOptions:{
        headerStyle:{
            backgroundColor: Colors.blueColor
        },
        activeTintColor: Colors.blueColor,
        backgroundColor: Colors.blueColor
    }
}
);

export default createAppContainer(AppTabNavigator);