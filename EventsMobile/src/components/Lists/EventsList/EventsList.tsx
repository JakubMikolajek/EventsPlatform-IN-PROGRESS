import React from "react";
import {FlatList, View} from 'react-native'

import Header from "../../Header/Header";
import EventsListElement from "../EventsListElement/EventsListElement";

import {styles} from "./styles";
import {formatDate} from "../../../utils/functions/formatDate";

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
        <View>
            <View style={styles.headerContainer}>
                <Header variant="h5">{name}:</Header>
            </View>
            <FlatList data={events} keyExtractor={(item: any) => item.id} renderItem={renderElement} horizontal={true}
                      showsHorizontalScrollIndicator={false}/>
        </View>
    )
}

export default EventsList
