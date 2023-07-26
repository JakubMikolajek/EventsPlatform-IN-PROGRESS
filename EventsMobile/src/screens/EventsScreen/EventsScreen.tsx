import React from "react";
import {ScrollView, StyleSheet, View} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {useFetchEvent} from "../../hooks/useFetchEvent";
import Loading from "../../components/Loading/Loading";
import {getCategoriesOfEvents, getOpenEvents} from "../../utils/functions/sortEvents";
import CategoryList from "../../components/Lists/CategoryList/CategoryList";
import EventsList from "../../components/Lists/EventsList/EventsList";
import {useSelector} from "react-redux";
import {StateProps} from "../../store/store";
import {useFetchEventWithTickets} from "../../hooks/useFetchEventWithTickets";

const EventsScreen: React.FC = () => {
    const ownId = useSelector((state: StateProps) => state.auth.loggedUserId)
    let events_with_tickets
    let isEventsWithTicketsLoading

    const {events, isLoading: isEventLoading} = useFetchEvent(true)

    if (typeof ownId !== "undefined") {
        const {events, isLoading} = useFetchEventWithTickets(ownId, true)

        events_with_tickets = events
        isEventsWithTicketsLoading = isLoading
    }

    const open_events = getOpenEvents(events)
    const uniqueCategories = getCategoriesOfEvents(events)

    const isLoading = isEventLoading || isEventsWithTicketsLoading

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <Loading/> : <View>
                <ScrollView>
                    <EventsList events={open_events} name="Najbliższe wydarzenia"/>
                    <EventsList events={events_with_tickets} name="Wydarzenia w których bierzesz udział"/>
                    <CategoryList category={uniqueCategories}/>
                </ScrollView>
            </View>}
        </SafeAreaView>
    )
}

export default EventsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
})
