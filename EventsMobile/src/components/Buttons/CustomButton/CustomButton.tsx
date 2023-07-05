import React from "react";
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {globalStyles} from "../../../utils/variables/globalStyles";
import {screenWidth} from "../../../utils/variables/dimension";

interface CustomButtonProps {
    title: string
    onPress: () => void
    isAlt: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({title, onPress, isAlt}) => {
    return (
        <TouchableOpacity style={[styles.container, isAlt && styles.containerAlt]} onPress={onPress}>
            <Text style={[styles.text, isAlt && styles.textAlt]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.colors.light.main_blue,
        borderRadius: 8,
        width: screenWidth * 0.5,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: globalStyles.spacing.sm

    },
    containerAlt: {
        backgroundColor: "transparent",
        borderColor: globalStyles.colors.light.main_blue,
        borderWidth: 2
    },
    text: {
        fontSize: globalStyles.sizes.body_md,
        color: globalStyles.colors.light.main_dark,
    },
    textAlt: {
        color: globalStyles.colors.light.main_blue
    }
})
