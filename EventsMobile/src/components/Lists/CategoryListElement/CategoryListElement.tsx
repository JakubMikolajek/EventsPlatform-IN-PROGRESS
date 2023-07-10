import React from "react";
import {StyleSheet, Text, View} from 'react-native'
import {screenWidth} from "../../../utils/variables/dimension";
import {globalStyles} from "../../../utils/variables/globalStyles";

interface CategoryListElementProps {
    category: string
}

const CategoryListElement: React.FC<CategoryListElementProps> = ({category}) => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>{category}</Text>
            </View>
        </View>
    )
}

export default CategoryListElement

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenWidth * 0.3,
        alignItems: "center",
    },
    innerContainer:{
        width: screenWidth * 0.8,
        height: screenWidth * 0.3,
        alignItems: "center",
        justifyContent:"center",
        borderWidth: 2,
        borderColor: globalStyles.colors.light.main_dark,
        borderRadius: 8
    },

    title: {
        fontSize: globalStyles.sizes.h1,
        color: globalStyles.colors.light.main_dark
    }
})
