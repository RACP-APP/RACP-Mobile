import React, { useState } from "react";
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import VideoComp from './VideoComp'




const generate = (type, cont) => {

    if (type === "Text") {
        return <Text>{cont}</Text>
    }
    else if (type === "Video") {
        return <VideoComp path={cont}></VideoComp>
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