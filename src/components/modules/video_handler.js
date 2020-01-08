import React, { useState, forwardRef } from "react";
import { View, Text, StyleSheet, FlatList, AsyncStorage, Button } from 'react-native';
import VideoContent from './VideoContent';


const VideoHandler = (props) => {
    const cont = props.source
    const md5 = props.md5

    const [value, setB] = useState(false);

    const forceRemount = (v) => {
        setB(v)
        console.log(value)
    }

    if (value) {
        return (
            <View style={styles.screen}>
                <Text>Background download interruption</Text>
                <VideoContent onBack={forceRemount} link={cont} md5={md5}></VideoContent>
            </View>
        )
    }
    return (
        <View style={styles.screen}>

            <VideoContent onBack={forceRemount} link={cont} md5={md5}></VideoContent>
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

export default VideoHandler;