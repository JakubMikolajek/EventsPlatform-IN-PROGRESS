import React from "react";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";

import Header from "../../components/Header/Header";
import CustomButton from "../../components/Buttons/CustomButton/CustomButton";

import {styles} from "./styles";
import {globalStyles} from "../../utils/variables/globalStyles";

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
