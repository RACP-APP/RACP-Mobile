import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';







const Modules_Page = (props) => {
    const [value, setB] = useState(1);

    const forceRemount = () => {
        setB(value + 1)
    }

    const generate = (type, cont) => {

        if (type === "Text") {
            return <Text>{cont}</Text>
        }
        else if (type === "Video") {
            return
        }
        else if (type === "img") {
            return
        }

        else {
            return <Text>Content Unavailable</Text>
        }
    }





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