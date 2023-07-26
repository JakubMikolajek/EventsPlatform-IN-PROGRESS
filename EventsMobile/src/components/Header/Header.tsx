import React from "react";
import {Text} from 'react-native'

import {styles} from "./styles";

interface HeaderProps {
    children: React.ReactNode
    variant: "h1" | "h2" | "h3" | "h4" | "h5"
    color?: string
}

const Header: React.FC<HeaderProps> = ({children, variant, color}) => {
    return (
        <Text style={[styles.header, styles[variant], {color}]}>
            {children}
        </Text>
    )
}

export default Header

