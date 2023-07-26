import React from "react";
import {StyleSheet} from 'react-native'
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "../../components/Header/Header";
import {globalStyles} from "../../utils/variables/globalStyles";
import CustomButton from "../../components/Buttons/CustomButton/CustomButton";

interface WelcomeScreenProps {
    navigation: NavigationProp<ParamListBase>
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header variant="h1" color={globalStyles.colors.light.main_blue}>Witaj!</Header>
            <CustomButton title="Start" onPress={() => navigation.navigate("Login")} isAlt={false}/>
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
