import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ColorPropType
} from 'react-native';


const ModuleGridTile = props => {
    return (
        <TouchableOpacity
            style={styles.GridItem}
            onPress={props.onSelect}
        >
            <View style={{ ...styles.container, ...{ backgroundColor: props.color } }} >
                <Text style={styles.textStyle}> {props.title} </Text>
            </View>
        </TouchableOpacity>

    );

};

const styles = StyleSheet.create({
    GridItem: {
        flex: 1,
        height: 200,
        margin: 20
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        padding: 15,
        justifyContent: 'space-evenly',
        alignItems: 'stretch'

    }

});

export default ModuleGridTile;