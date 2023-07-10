import React from "react";
import {StyleSheet, Text} from 'react-native'
import {globalStyles} from "../../utils/variables/globalStyles";

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

const styles = StyleSheet.create({
    header: {
        fontWeight: "500",
        color: globalStyles.colors.light.main_dark
    },
    h1: {
        fontSize: globalStyles.sizes.h1
    },
    h2: {
        fontSize: globalStyles.sizes.h2
    },
    h3: {
        fontSize: globalStyles.sizes.h3
    },
    h4: {
        fontSize: globalStyles.sizes.h4
    },
    h5: {
        fontSize: globalStyles.sizes.h5
    },
})
