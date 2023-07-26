import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {screenWidth} from "../../../utils/variables/dimension";
import {globalStyles} from "../../../utils/variables/globalStyles";
import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native";

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

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenWidth * 0.2,
        alignItems: "center",
    },
    innerContainer: {
        width: screenWidth * 0.8,
        height: screenWidth * 0.2,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: globalStyles.colors.light.main_dark,
        borderRadius: 8
    },

    title: {
        fontSize: globalStyles.sizes.h1,
        color: globalStyles.colors.light.main_dark
    }
})
