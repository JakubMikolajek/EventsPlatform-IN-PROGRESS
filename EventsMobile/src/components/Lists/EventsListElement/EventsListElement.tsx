import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {screenWidth} from "../../../utils/variables/dimension";
import {globalStyles} from "../../../utils/variables/globalStyles";
import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native";

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: screenWidth,
        height: screenWidth * 0.75,
        alignItems: "center"
    },
    image: {
        width: screenWidth * 0.9,
        height: screenWidth * 0.5
    },
    title: {
        fontSize: globalStyles.sizes.h5,
        fontWeight: "500"
    },
    description: {
        fontSize: globalStyles.sizes.body_lg
    }
})
