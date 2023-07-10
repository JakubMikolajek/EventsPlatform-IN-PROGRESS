import React from "react";
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {globalStyles} from "../../utils/variables/globalStyles";
import Header from "../Header/Header";

const Loading: React.FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={globalStyles.colors.light.main_blue}/>
            <Header variant="h5" color={globalStyles.colors.light.main_blue}>Ładowanie...</Header>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
