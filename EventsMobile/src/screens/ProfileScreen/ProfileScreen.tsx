import React from "react";
import {Alert, StyleSheet, Text} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import {StateProps} from "../../store/store";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "../../components/Buttons/CustomButton/CustomButton";
import {supabaseClient} from "../../supabase/supabase";
import {Dispatch} from "redux";
import {setIsAuth, setIsLoggedIn} from "../../store/reducers/authSlice";

const ProfileScreen: React.FC = () => {
    const dispatch: Dispatch = useDispatch()
    const ownId = useSelector((state: StateProps) => state.auth.loggedUserId)

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
            <Text>ProfileScreen</Text>
            <Text>{ownId}</Text>
            <CustomButton isAlt={false} title="Wyloguj się" onPress={logoutUser}/>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
