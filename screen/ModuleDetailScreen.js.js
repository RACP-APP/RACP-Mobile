import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';





const ModuleDetailScreen = props =>{ 
    return(
        <View style={styles.screen}>
        <Text>
          Module Detail
        </Text>
        <Button
            title="Go Back"
            onPress={()=>{props.navigation.goBack()}}
         />
    </View>
  
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
        
    }

});

export default ModuleDetailScreen;