import React from "react";
import {View} from 'react-native'
import {useSelector} from "react-redux";
import {SafeAreaView} from "react-native-safe-area-context";

import User from "../../components/User/User";
import Loading from "../../components/Loading/Loading";
import EventsList from "../../components/Lists/EventsList/EventsList";

import {useFetchSingleUser} from "../../hooks/useFetchSingleUser";
import {useFetchEventWithTickets} from "../../hooks/useFetchEventWithTickets";
import {styles} from "./styles";
import {StateProps} from "../../store/store";
import {UserProps} from "../../utils/types/types";

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
