import React from "react";
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import CustomButton from "../../components/Buttons/CustomButton/CustomButton";
import Header from "../../components/Header/Header";

const LoginScreen: React.FC = () => {
    const navigation: NavigationProp<ParamListBase> = useNavigation()
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
