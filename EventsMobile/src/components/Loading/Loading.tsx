import React from "react";
import {ActivityIndicator, View} from 'react-native'

import Header from "../Header/Header";

import {styles} from "./styles";
import {globalStyles} from "../../utils/variables/globalStyles";

const Loading: React.FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={globalStyles.colors.light.main_blue}/>
            <Header variant="h5" color={globalStyles.colors.light.main_blue}>Ładowanie...</Header>
        </View>
    )
}

export default Loading
