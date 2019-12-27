import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons, EvilIcons} from '@expo/vector-icons';

import HomeScreen from '../screen/HomeScreen';
import ModulesScreen from '../screen/ModulesScreen';
import ModuleDetailScreen from '../screen/ModuleDetailScreen.js'
import Messages from '../src/components/Messages';
import Colors from '../constants/Colors';



const MainNavigator = createStackNavigator({
    Home: HomeScreen,
    Modules:{
        screen: ModulesScreen
    },
    ModuleDetail: ModuleDetailScreen,
},
{
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.blueColor
        },
        headerTintColor: Colors.whiteColor
    }
}
);

const MessageTabNavigator = createStackNavigator({
    Message: Messages

});

const AppTabNavigator = createBottomTabNavigator({
    Start: {
        screen: MainNavigator,
        navigationOptions:{
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
    tabBarOptions:{
        headerStyle:{
            backgroundColor: Colors.blueColor
        },
        activeTintColor: Colors.blueColor
    }
}
);

export default createAppContainer(AppTabNavigator);