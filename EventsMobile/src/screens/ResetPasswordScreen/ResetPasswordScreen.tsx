import React from "react";
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import ChangePasswordForm from "../../components/Forms/ChangePasswordForm/ChangePasswordForm";
import Header from "../../components/Header/Header";

const ResetPasswordScreen = () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.innerContainer}>
                    <Header variant="h2">Zmień hasło</Header>
                    <ChangePasswordForm/>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default ResetPasswordScreen

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
