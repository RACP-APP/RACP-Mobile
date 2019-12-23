import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';




const ModulesScreen = props =>{
    console.log(props)

    
    return(
        <View  style={styles.screen}>
        <Text>
          The Modules Screen!
        </Text>
        <Button 
          title="Go to Details"
           onPress ={()=>{props.navigation.navigate('ModuleDetail')
           }}
            />
        <Button title="Go Back"
            onPress={()=>{props.navigation.popToTop();
            }}
         />

    </View>
  
    );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  

  }
})



export default ModulesScreen;