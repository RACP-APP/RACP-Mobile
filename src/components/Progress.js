import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import Colors from '../../constants/Colors';


const Progress = props =>{ 
    return(
        <View style={styles.screen}>
        <Text>
          Progress!!!
        </Text>

    </View>
  
    );
};

Progress.navigationOptions = {
    headerStyle:{
        backgroundColor: Colors.blueColor
    },
    headerTitle: 'Progress',
    headerTintColor: Colors.whiteColor
    
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
        
    }

});

export default Progress;