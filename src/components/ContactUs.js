import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import Colors from '../../constants/Colors';


const ContactUs = props =>{ 
    return(
        <View style={styles.screen}>
        <Text>
            Contact Us!!!!
        </Text>

    </View>
  
    );
};

ContactUs.navigationOptions = {
   headerTitle: 'Contact Us....'
   
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
        
    }

});

export default ContactUs;