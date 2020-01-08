import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import ModuleIcon from './module_icon';
import sample from '../../../qdd.js'
// missing data config. module page navigator.
import Modules_Page from './modules_page'
const headerT = (t) => {
    Modules_Page.navigationOptions = () => {
        return {
            headerTitle: t
        }

    }
}
const Modules_list = (props) => {
    return (
        <View style={styles.screen}>
            <FlatList
                data={sample}
                renderItem={({ item }) =>
                    <View>
                        <ModuleIcon iconName={item.icon}></ModuleIcon>
                        <Text>{item.title}</Text>
                        <Button onPress={
                            () => props.navigation.navigate('Modules_Page', { content: item.content })
                                &&
                                headerT(item.title)

                        } title="go to this page" />
                    </View>
                }
                keyExtractor={item => item.id}
            />
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

export default Modules_list;