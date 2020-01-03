import React, { useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from 'react-native';
import VideoComp from './VideoComp'
import CachedImage from './CachedImage'
import CacheVid from "./CacheVid";
import Test from '../testmodu'
import TestVid from './testmoduv'
import Ctest from './ClassTest'




const generate = (type, cont) => {

    if (type === "Text") {
        return <Text>{cont}</Text>
    }
    else if (type === "Video") {
        return <CacheVid
            source={cont}
            title={'title for the image'}
        />
    }
    else if (type === "img") {
        return <CachedImage
            source={cont}
            title={'title for the image'}
        />
    }
    else if (type === "img2") {
        return <Test></Test>
    }
    else if (type === "vid2") {
        return <TestVid></TestVid>
    }
    else if (type === "vid3") {
        return <Ctest></Ctest>
    }
    else if (type === "check point") {
        return <View>
            <Text>later setup</Text>
            <Text>later setup test generate</Text>
        </View>
    }
    else {
        return <Text>{cont}</Text>
    }
}


const Modules_Page = (props) => {
    return (

        <View style={styles.screen}>
            <FlatList

                data={props.navigation.state.params.content}
                renderItem={({ item }) =>
                    <View style={styles.screen}>
                        <Text>{item.subtitle}</Text>
                        {generate(item.type, item.content)}
                    </View>
                }
                keyExtractor={item => item.subtitle}

            />


        </View>




    );
};
Modules_Page.navigationOptions = () => {
    return {
        headerTitle: title
    }

}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }

});



export default Modules_Page;

/*
    else if (type === "img2") {
        return <Test></Test>
    }
 */