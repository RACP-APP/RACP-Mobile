import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import Colors from '../../constants/Colors';


const Language = props =>{ 
    return(
        <View style={styles.screen}>
        <Text>
            Language!!!!
        </Text>

    </View>
  
    );
};

Language.navigationOptions = {
   headerTitle: 'Language....'
   
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
        
    }

});

export default Language;