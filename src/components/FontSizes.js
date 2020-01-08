import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import Colors from '../../constants/Colors';


const FontSizes = props =>{ 
    return(
        <View style={styles.screen}>
        <Text>
            Font Size !!!!
        </Text>

    </View>
  
    );
};

FontSizes.navigationOptions = {
   headerTitle: 'Font Size....'
   
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
        
    }

});

export default FontSizes;