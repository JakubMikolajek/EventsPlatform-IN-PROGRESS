import React from "react";
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "../../components/Header/Header";
import RegisterForm from "../../components/Forms/RegisterForm/RegisterForm";

const RegisterScreen: React.FC = () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.innerContainer}>
                    <Header variant="h1">Zarejestruj się</Header>
                    <RegisterForm/>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
