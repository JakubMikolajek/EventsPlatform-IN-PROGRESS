import React from "react";
import {Text, TouchableOpacity, View} from 'react-native'
import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native";

import {styles} from "./styles";

interface CategoryListElementProps {
    category: string
}

const CategoryListElement: React.FC<CategoryListElementProps> = ({category}) => {
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    const goTo = () => {
        navigation.navigate("Category", {
            category: category
        })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={goTo}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>{category}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryListElement
