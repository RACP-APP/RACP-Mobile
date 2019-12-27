import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import Colors from '../../constants/Colors';


const Messages = props =>{ 
    return(
        <View style={styles.screen}>
        <Text>
          Messages!!!
        </Text>

    </View>
  
    );
};

Messages.navigationOptions = {
    headerStyle:{
        backgroundColor: Colors.blueColor
    },
    headerTitle: 'Messages',
    headerTintColor: Colors.whiteColor
    
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
        
    }

});

export default Messages;