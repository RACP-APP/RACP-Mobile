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
import ModuleGridTile from '../src/components/ModuleGridTile';


const HomeScreen = props =>{
   
    const renderGridItem = (itemData)=>{
        return (
            <ModuleGridTile
            title={itemData.item.title}
            color={itemData.item.color}
            onSelect={()=> {props.navigation.navigate({
                routeName: 'Modules',
                params: {
                    moduleId: itemData.item.id
                }
            })}}
             />
           
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
    headerTitle: 'Module Categories'
}

const styles = StyleSheet.create({

})



export default HomeScreen;