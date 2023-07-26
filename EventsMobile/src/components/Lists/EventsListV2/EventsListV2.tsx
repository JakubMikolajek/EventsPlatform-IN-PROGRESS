import React from "react";
import {FlatList, StyleSheet, View} from 'react-native'
import {formatDate} from "../../../utils/functions/formatDate";
import EventsListElement from "../EventsListElement/EventsListElement";
import Header from "../../Header/Header";
import {globalStyles} from "../../../utils/variables/globalStyles";

interface EventsListPropsV2 {
    events: any
    name?: string
}

const EventsListV2: React.FC<EventsListPropsV2> = ({events, name}) => {
    const renderElement = (eventData: any) => {
        const event = eventData.item
        const date = formatDate(event)

        const eventProps = {
            date: date,
            image_url: event.image_url,
            title: event.title,
            location: event.event_location,
            id: event.id
        }

        return <EventsListElement {...eventProps}/>
    }

    return (
        <View style={styles.container}>
            {name && <View style={styles.headerContainer}>
                <Header variant="h5">{name}:</Header>
            </View>}
            <FlatList data={events} keyExtractor={(item: any) => item.id} renderItem={renderElement}
                      showsVerticalScrollIndicator={false}/>
        </View>
    )
}

export default EventsListV2

const styles = StyleSheet.create({
    container: {
        flex: 7
    },
    headerContainer: {
        marginHorizontal: globalStyles.spacing.md
    }
})
