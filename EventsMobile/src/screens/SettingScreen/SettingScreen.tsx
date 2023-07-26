import React from "react";
import {Alert} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {NavigationProp, ParamListBase} from "@react-navigation/native";

import CustomButton from "../../components/Buttons/CustomButton/CustomButton";

import {styles} from "./styles";
import {setIsAuth, setIsLoggedIn} from "../../store/reducers/authSlice";
import {supabaseClient} from "../../supabase/supabase";

interface SettingScreenProps {
    navigation: NavigationProp<ParamListBase>
}

const SettingScreen: React.FC<SettingScreenProps> = ({navigation}) => {
    const dispatch: Dispatch = useDispatch()

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
            <CustomButton isAlt={true} title="Zmień hasło"
                          onPress={() => navigation.navigate("ResetPassword")}/>
            <CustomButton isAlt={false} title="Wyloguj się" onPress={logoutUser}/>
        </SafeAreaView>
    )
}

export default SettingScreen

