import React from "react";
import {StyleSheet, View} from 'react-native'
import {useSelector} from "react-redux";
import {StateProps} from "../../store/store";
import {SafeAreaView} from "react-native-safe-area-context";
import {useFetchSingleUser} from "../../hooks/useFetchSingleUser";
import User from "../../components/User/User";
import {UserProps} from "../../utils/types/types";
import Loading from "../../components/Loading/Loading";
import {useFetchEventWithTickets} from "../../hooks/useFetchEventWithTickets";
import EventsList from "../../components/Lists/EventsList/EventsList";

const ProfileScreen: React.FC = () => {
    const ownId = useSelector((state: StateProps) => state.auth.loggedUserId)
    let user_data: UserProps | undefined | null
    let isUserLoading

    let events_with_tickets

    if (typeof ownId !== "undefined") {
        const {user, isLoading} = useFetchSingleUser(ownId, true)

        user_data = user
        isUserLoading = isLoading
    }


    if (typeof ownId !== "undefined") {
        const {events} = useFetchEventWithTickets(ownId, false)

        events_with_tickets = events
    }

    const isLoading = isUserLoading

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <Loading/> :
                <View>
                    <User first_name={user_data?.first_name} last_name={user_data?.last_name}
                          image_url={user_data?.image_url}/>
                    <EventsList events={events_with_tickets} name="Wydarzenia w których bierzesz udział"/>
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
