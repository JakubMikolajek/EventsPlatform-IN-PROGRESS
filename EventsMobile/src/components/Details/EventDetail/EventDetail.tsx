import React from "react";
import {Image, View} from 'react-native'

import Header from "../../Header/Header";

import {styles} from "./styles";

interface EventDetailProps {
    image_url: string | undefined | null
    date: string
    title: string | undefined | null
    event_location: string | undefined | null
    description: string | undefined | null
    event_category: string | undefined | null
}

const EventDetail: React.FC<EventDetailProps> = (
    {
        title,
        image_url,
        date,
        description,
        event_category,
        event_location
    }) => {
    return (
        <View style={styles.container}>
            {image_url && <Image style={styles.image} source={{uri: image_url}}/>}
            <Header variant="h2">{title}</Header>
            <Header variant="h4">{date}</Header>
            <Header variant="h4">{event_location}</Header>
            <Header variant="h5">{description}</Header>
            <Header variant="h5">{event_category}</Header>
        </View>
    )
}

export default EventDetail
