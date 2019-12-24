import React from 'react';
import {  
    View, 
    Text, 
    StyleSheet,
    Button, 
    FlatList,
    TouchableOpacity
} from 'react-native';

import {MODULES} from '../data/dummy-data';


const HomeScreen = props =>{
   
    const renderGridItem = (itemData)=>{
        return (
            <TouchableOpacity 
            style={styles.screen}
            onPress={()=>{props.navigation.navigate({
                routeName: 'Modules',
                params: {
                    moduleId: itemData.item.id
                }
            })}}
            >
            <View>
                <Text>{itemData.item.title}</Text>
            </View>
            </TouchableOpacity>
        );
    }
    
    return(
        <FlatList
            keyExtractor={(item, index)=> item.id}
            data={MODULES}
            renderItem={renderGridItem}
         />
    );
};
HomeScreen.navigationOptions = {
    headerTitle: 'Module Categories',
    headerStyle: {
        backgroundColor: '#4169e1'
    },
    headerTintColor: 'white'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: 200,
        margin: 20
    }
})



export default HomeScreen;