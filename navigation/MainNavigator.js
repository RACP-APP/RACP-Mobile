import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'

import HomeScreen from '../screen/HomeScreen';
import ModulesScreen from '../screen/ModulesScreen';
import ModuleDetailScreen from '../screen/ModuleDetailScreen.js'
import Messages from '../src/components/Messages';



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
            backgroundColor:'#4169e1'
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
    }
    
        
    
});

export default createAppContainer(AppTabNavigator);