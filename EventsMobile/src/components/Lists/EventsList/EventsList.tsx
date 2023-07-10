import React from "react";
import {FlatList, StyleSheet, View} from 'react-native'
import {formatDate} from "../../../utils/functions/formatDate";
import EventsListElement from "../EventsListElement/EventsListElement";
import Header from "../../Header/Header";
import {globalStyles} from "../../../utils/variables/globalStyles";

interface EventsListProps {
    events: any
    name: string
}

const EventsList: React.FC<EventsListProps> = ({events, name}) => {

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
            <View style={styles.headerContainer}>
                <Header variant="h5">{name}:</Header>
            </View>
            <FlatList data={events} keyExtractor={(item: any) => item.id} renderItem={renderElement} horizontal={true}
                      showsHorizontalScrollIndicator={false}/>
        </View>
    )
}

export default EventsList

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        marginHorizontal: globalStyles.spacing.md
    }
})
