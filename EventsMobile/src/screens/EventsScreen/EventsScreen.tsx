import React from "react";
import {StyleSheet, View} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {useFetchEvent} from "../../hooks/useFetchEvent";
import Loading from "../../components/Loading/Loading";
import {getCategoriesOfEvents, getOpenEvents} from "../../utils/functions/sortEvents";
import CategoryList from "../../components/Lists/CategoryList/CategoryList";
import EventsListV2 from "../../components/Lists/EventsListV2/EventsListV2";

const EventsScreen: React.FC = () => {
    const {events, isLoading} = useFetchEvent(true)
    const open_events = getOpenEvents(events)
    const uniqueCategories = getCategoriesOfEvents(events)

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <Loading/> : <View>
                <CategoryList category={uniqueCategories}/>
                <EventsListV2 events={open_events} name="Najbliższe wydarzenia"/>
            </View>}
        </SafeAreaView>
    )
}

export default EventsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }
})
