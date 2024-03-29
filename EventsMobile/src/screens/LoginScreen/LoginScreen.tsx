import React from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {NavigationProp, ParamListBase} from "@react-navigation/native";

import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import CustomButton from "../../components/Buttons/CustomButton/CustomButton";
import Header from "../../components/Header/Header";

import {styles} from "./styles";

interface LoginScreenProps {
    navigation: NavigationProp<ParamListBase>
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.innerContainer}>
                    <Header variant="h1">Zaloguj się</Header>
                    <LoginForm/>
                    <CustomButton isAlt={true} title="Zarejestruj się" onPress={() => navigation.navigate("Register")}/>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen
