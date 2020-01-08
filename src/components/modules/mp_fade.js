import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Fade from './Fade'

const Mp_fade = (props) => {


    const [fadeL, setL] = useState(props.L);
    const [fadeN, setN] = useState(props.N);
    useEffect(() => {
        setL(props.L);
        setN(props.N);
    }, [props.L, props.N]);

    console.log(fadeL && fadeN)
    console.log(fadeL && fadeN === false)
    console.log(fadeN && fadeL === false)

    {
        if (fadeL && fadeN) {
            return (
                <View>
                    <Fade component={<Button onPress={props.nex} title={'Next!'} />} />
                    <Fade component={<Button onPress={props.las} title={'Last!'} />} />
                </View>
            )
        }
    }

    {
        if (fadeL && fadeN === false) {
            return (
                <Fade component={<Button onPress={props.las} title={'Last!'} />} />
            )
        }
    }

    {
        if (fadeN && fadeL === false) {
            return (
                <Fade component={<Button onPress={props.nex} title={'Next!'} />} />
            )
        }
    }


    return null;
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }

});



export default Mp_fade;