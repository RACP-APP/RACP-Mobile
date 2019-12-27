import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'

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

const MessageTabNav = createStackNavigator({
    Message: Messages

});

const AppTabNavigator = createBottomTabNavigator({
    StartApp: {
        screen: MainNavigator
    },
    Message: {
        screen: MessageTabNav
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