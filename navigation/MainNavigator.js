import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {Ionicons, EvilIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import HomeScreen from '../screen/HomeScreen';
import ModulesScreen from '../screen/ModulesScreen';
import ModuleDetailScreen from '../screen/ModuleDetailScreen.js'
import Messages from '../src/components/Messages';
import Modules_Page from '../src/components/modules/modules_page';
import Modules_list from '../src/components/modules/modules_list';
import Module from '../models/module';
import LandingPage from '../src/components/LandingPage'
import Progress from '../src/components/Progress';
import Colors from '../constants/Colors';


const MainNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Modules: {
            screen: ModulesScreen
        },
        ModuleDetail: ModuleDetailScreen,
        Modules_list: Modules_list,
        Modules_Page: Modules_Page
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#4169e1'
            },
            headerTintColor: 'white'
        }
    }
);
const AppTabNavigator = createBottomTabNavigator({
    StartApp: {
        screen: MainNavigator
    },
    Message: {
        screen: Messages
    },
    testModuleList: {
        screen: Modules_list
    }



});

export default createAppContainer(AppTabNavigator);