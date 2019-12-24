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
    console.log(props)
    const renderGridItem = (itemData)=>{
        return (
            <TouchableOpacity 
            style={styles.screen}
            onPress={()=>{props.navigation.navigate({
                routeName: 'Modules'
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

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: 200,
        margin: 20
    }
})



export default HomeScreen;