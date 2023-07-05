import React from "react";
import {MaterialIcons} from "@expo/vector-icons"

interface IconProps {
    name: any
    size: number
    color: string
}

const Icon: React.FC<IconProps> = ({name, size, color}) => {
    return <MaterialIcons name={name} size={size} color={color}/>
}

export default Icon

