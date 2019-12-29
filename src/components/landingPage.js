import React from 'react';
import {View, Text, TouchableOpacity,StyleSheet, Image} from 'react-native';
import VideoComp from './modules/VideoComp'
const LandingPage=(props)=> {
   return(<View style={styles.screen}>
       <Text>
            Placeholder for introduction statement
        </Text>
       <VideoComp path={'http://techslides.com/demos/sample-videos/small.mp4'}></VideoComp>
        <Text>
            Modules are the main content of this app so go check them out
        </Text>
        <TouchableOpacity
        onPress={()=>{props.navigation.navigate('Modules_list')}}
        >
            <Text>Go To Modules</Text>
        </TouchableOpacity>
    </View>
   )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }

});
export default LandingPage;