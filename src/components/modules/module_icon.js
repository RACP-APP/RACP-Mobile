import React from "react";
import { Image } from 'react-native';

const ModuleIcon = ({ iconName }) => {
    return (
        <Image
            style={{ width: 25, height: 25 }}
            //should target asyncStorage or internal sorage.
            source={require('../../../assets/module_icons/' + iconName + '.png')}
        />
    );

};


export default ModuleIcon;