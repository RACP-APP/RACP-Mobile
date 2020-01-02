import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import Colors from '../../constants/Colors';


const LightMode = props =>{ 
    return(
        <View style={styles.screen}>
        <Text>
            Light Mode!!!!
        </Text>

    </View>
  
    );
};

LightMode.navigationOptions = {
   headerTitle: 'Light Mode....'
   
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
        
    }

});

export default LightMode;