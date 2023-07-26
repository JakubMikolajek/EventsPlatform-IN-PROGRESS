import React from "react";
import {Image, Text, TouchableOpacity} from 'react-native'
import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native";

import {styles} from "./styles";

interface EventsListElementProps {
    date: string
    image_url: string,
    title: string,
    location: string,
    id: number
}

const EventsListElement: React.FC<EventsListElementProps> = ({date, image_url, title, location, id}) => {
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const goTo = () => {
        navigation.navigate("EventDetail", {
            id: id
        })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={goTo}>
            <Image style={styles.image} resizeMode="cover" source={{uri: image_url}}/>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{date}, {location}</Text>
        </TouchableOpacity>
    )
}

export default EventsListElement
