import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import ModuleIcon from 'module_icon.js';
// missing data config. module page navigator.
const Modules_list = (props) => {
    return (
        <FlatList
            data={moduleList_data}
            renderItem={({ item }) => <View>
                <ModuleIcon iconName={item.icon_name} /> <Text>{item.title}</Text>
            </View>
            }
            keyExtractor={item => item.id}
        />

    );

};

const styles = StyleSheet.create({

});

export default Modules_list;