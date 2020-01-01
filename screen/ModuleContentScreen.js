import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';





const ModuleContentScreen = props =>{ 
    return(
        <View style={styles.screen}>
        <Text>
          Module Content
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

export default ModuleContentScreen;