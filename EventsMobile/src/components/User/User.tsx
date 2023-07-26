import React from "react";
import {Image, View} from 'react-native'
import Header from "../Header/Header";
import {styles} from "./styles";

interface UserProps {
    first_name: string | null | undefined
    last_name: string | null | undefined
    image_url: string | null | undefined
}

const User: React.FC<UserProps> = ({first_name, last_name, image_url}) => {
    return (
        <View style={styles.container}>
            {image_url && <Image style={styles.image} resizeMode="cover" source={{uri: image_url}}/>}
            <Header variant="h4">{first_name} {last_name}</Header>
        </View>
    )
}

export default User
