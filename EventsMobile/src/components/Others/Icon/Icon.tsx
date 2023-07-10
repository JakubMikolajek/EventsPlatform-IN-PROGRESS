import React from "react";
import {MaterialIcons} from "@expo/vector-icons"

interface IconProps {
    name: any
    size: number
    color: string
    onPress?: () => void
}

const Icon: React.FC<IconProps> = ({name, size, color, onPress}) => {
    return <MaterialIcons onPress={onPress} name={name} size={size} color={color}/>
}

export default Icon

