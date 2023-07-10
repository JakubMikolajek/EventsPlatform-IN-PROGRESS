import React from "react";
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {useSelector} from "react-redux";
import {StateProps} from "../../store/store";
import {UserProps} from "../../utils/types/types";
import {useFetchSingleUser} from "../../hooks/useFetchSingleUser";
import EditProfileForm from "../../components/Forms/EditProfileForm/EditProfileForm";
import Header from "../../components/Header/Header";

const EditProfileScreen = () => {
    const ownId = useSelector((state: StateProps) => state.auth.loggedUserId)
    let user_data: UserProps | undefined | null
    let refetch_user_data

    if (typeof ownId !== "undefined") {
        const {user, refetch} = useFetchSingleUser(ownId, false)

        user_data = user
        refetch_user_data = refetch
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.innerContainer}>
                    <Header variant="h2">Edytuj profil</Header>
                    <EditProfileForm first_name={user_data?.first_name} last_name={user_data?.last_name}
                                     image_url={user_data?.image_url} uuid={ownId} refetch={refetch_user_data}/>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default EditProfileScreen

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
