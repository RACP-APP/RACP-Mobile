import React from 'react';
import {View,  StyleSheet, Image} from 'react-native';




const LogoBarImage = props =>{ 
    return(
            <Image
             source ={require('../../assets/racpLogo.png')}
             style={styles.logo}
              />
    
    );
};


const styles = StyleSheet.create({
    logo:{
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        marginLeft: 15   
    }

});

export default LogoBarImage;