import React from 'react'
import { AsyncStorage } from 'react-native';
import { View, Image, Text } from 'react-native'
import VideoComp from '../modules/VideoComp'
let lit = null;
let cft = 'file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540jacob997%252FRACP-Mobile/title%20for%20the%20image.png'
AsyncStorage.getItem('fs-module-page-Ctest22', (err, result) => {
    const fish = JSON.parse(result)
    console.log('second test');
    if (fish !== null) {

        lit = fish.uri
    }
});

const Test2 = () => {
    {
        if (lit === null) {
            return (
                <View>
                    <Text>lol</Text>
                </View>
            )
        }
    }

    return (
        <View>
            <VideoComp path={lit}></VideoComp>
        </View>
    )
}
export default Test2