import React from "react";
import {Image, StyleSheet, View} from 'react-native'
import Header from "../Header/Header";
import {globalStyles} from "../../utils/variables/globalStyles";

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

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: globalStyles.spacing.xl
    },
    image: {
        width: 92,
        height: 92,
        borderRadius: 48
    }
})
