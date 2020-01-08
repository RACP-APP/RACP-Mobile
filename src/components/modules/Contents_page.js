import React, { useState, forwardRef } from "react";
import { View, Text, StyleSheet, FlatList, AsyncStorage, Button, Image } from 'react-native';
import Fade from './Fade';
import sample from '../../../qdd'
import VideoHandler from "./video_handler";







const Contents = (props) => {

    const [progressC, setC] = useState(false);
    const [fade, setF] = useState(false);
    AsyncStorage.getItem(props.Pid, (e, r) => {
        const res = JSON.parse(r)
        if (r !== null) {
            setC(res.check)
        } else {
            console.log(e)
        }
    })



    const generate = (type, cont, md5) => {

        if (type === "Text") {
            return <Text>{cont}</Text>
        }
        else if (type === "Video") {
            return <VideoHandler source={cont} md5={md5} />
        }
        else if (type === "Image") {
            return <Image style={{ width: 300, height: 300 }} source={{ uri: cont }} />
        }

        else {
            return <Text>Content Unavailable</Text>
        }
    }
    ///

    const complete = () => {
        if (progressC !== true) {
            setF(true)
        }

    }

    const done = () => {
        console.log("pressed done")
        if (progressC !== true) {
            AsyncStorage.setItem(props.Pid, JSON.stringify({ check: true }))
            AsyncStorage.getItem(props.Pid, (e, r) => {
                const res = JSON.parse(r)
                if (r !== null) {
                    setC(res.check)
                } else {
                    console.log(e)
                }
            })
            console.log("llll")
            //props.updatC();
        }
    }
    const fader = () => {
        if (fade) {
            return <Fade component={<Button onPress={done} title={'Completed?'} />} />
        }
    }


    return (

        <View style={styles.screen}>
            <FlatList

                data={props.contentData}
                renderItem={({ item }) =>
                    <View style={styles.screen}>
                        <Text>{item.subtitle}</Text>
                        {generate(item.type, item.content, item.md5)}



                    </View>
                }
                keyExtractor={item => item.id}
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                    console.log('on end reached ')
                    complete()
                }}

            />
            {fader()}


        </View>




    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }

});



export default Contents;