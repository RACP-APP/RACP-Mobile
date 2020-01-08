import React, { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native';

export default function Fade(props) {

    return (
        <Animatable.View
            animation={'fadeInDown'}

            useNativeDriver
        >
            {props.component}
        </Animatable.View>
    )

}







