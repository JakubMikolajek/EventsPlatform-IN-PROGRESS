import React from "react";
import {StyleSheet, View} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {useFetchEventDetails} from "../../hooks/useFetchEventDetails";
import Loading from "../../components/Loading/Loading";
import {formatDate} from "../../utils/functions/formatDate";
import EventDetail from "../../components/Details/EventDetail/EventDetail";

interface EventDetailScreenProps {
    route: any
}

const EventDetailScreen: React.FC<EventDetailScreenProps> = ({route}) => {
    const id = route.params.id
    const {event, isLoading} = useFetchEventDetails(id, true)
    const date = formatDate(event)

    const eventProps = {
        title: event?.title,
        date: date,
        image_url: event?.image_url,
        description: event?.description,
        event_location: event?.event_location,
        event_category: event?.event_category
    }

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <Loading/> : <View>
                <EventDetail {...eventProps}/>
            </View>}
        </SafeAreaView>
    )
}

export default EventDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
