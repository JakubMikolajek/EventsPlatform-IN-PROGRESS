import React from "react";
import {StyleSheet, Text, View} from 'react-native'
import {useSelector} from "react-redux";
import {StateProps} from "../../store/store";
import {SafeAreaView} from "react-native-safe-area-context";
import {useFetchSingleUser} from "../../hooks/useFetchSingleUser";
import User from "../../components/User/User";
import {UserProps} from "../../utils/types/types";
import Loading from "../../components/Loading/Loading";

const ProfileScreen: React.FC = () => {
    const ownId = useSelector((state: StateProps) => state.auth.loggedUserId)
    let user_data: UserProps | undefined | null
    let isUserLoading

    if (typeof ownId!== "undefined") {
        const {user, isLoading} = useFetchSingleUser(ownId, true)

        user_data = user
        isUserLoading = isLoading
    }

    if (isUserLoading) {
        return <Text>Loading...</Text>
    }

    console.log(user_data)

    return (
        <SafeAreaView style={styles.container}>
            {isUserLoading ? <Loading/> :
                <View>
                    <User first_name={user_data?.first_name} last_name={user_data?.last_name}
                          image_url={user_data?.image_url}/>
                </View>}
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    image: {
        width: 92,
        height: 92,
        borderRadius: 48
    }
})
