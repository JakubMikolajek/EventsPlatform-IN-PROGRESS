import React from "react";
import {Text, TouchableOpacity} from 'react-native'

import {styles} from "./styles";

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
