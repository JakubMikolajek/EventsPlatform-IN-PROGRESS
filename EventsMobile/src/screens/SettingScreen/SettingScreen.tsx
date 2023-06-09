import React from "react";
import {Alert, StyleSheet} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "../../components/Buttons/CustomButton/CustomButton";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {supabaseClient} from "../../supabase/supabase";
import {setIsAuth, setIsLoggedIn} from "../../store/reducers/authSlice";
import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native";

const SettingScreen = () => {
    const dispatch: Dispatch = useDispatch()
    const navigation: NavigationProp<ParamListBase> = useNavigation()

    const logoutUser = async () => {
        const {error} = await supabaseClient.auth.signOut()

        if (!error) {
            dispatch(setIsAuth(false))
            dispatch(setIsLoggedIn(""))
        } else {
            return Alert.alert("Wystąpił błąd", "Spróbuj ponownie później")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <CustomButton isAlt={true} title="Edytuj profil" onPress={() => navigation.navigate("EditProfile")}/>
            <CustomButton isAlt={true} title="Zresetuj hasło"
                          onPress={() => navigation.navigate("ResetPassword")}/>
            <CustomButton isAlt={false} title="Wyloguj się" onPress={logoutUser}/>
        </SafeAreaView>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
