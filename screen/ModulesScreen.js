import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {MODULES} from '../data/dummy-data';




const ModulesScreen = props =>{
  const modId = props.navigation.getParam('moduleId');
  const selectedModule = MODULES.find(mod => mod.id === modId)
  

    
    return(
        <View  style={styles.screen}>
        <Text>
          The Modules Screen!
        </Text>
        <Text>{selectedModule.title} </Text>
      <View stye={styles.buttonContainer}>
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

    </View>
  
    );
};
ModulesScreen.navigationOptions = {
  headerTitle: 'Module',
  headerStyle: {
    backgroundColor: '#4169e1'
  },
  headerTintColor: 'white'
}

ModulesScreen.navigationOptions = (navigationData) => {
  const modId = navigationData.navigation.getParam('moduleId');
  const selectedModule = MODULES.find(mod => mod.id === modId)
  return {
    headerTitle: selectedModule.title
  }

}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5

  }
})



export default ModulesScreen;