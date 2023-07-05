import React from "react";
import {StyleSheet, Text} from 'react-native'
import {globalStyles} from "../../utils/variables/globalStyles";

interface ParagraphProps {
    children: React.ReactNode
}

const Paragraph: React.FC<ParagraphProps> = ({children}) => {
    return (
        <Text style={styles.paragraph}>
            {children}
        </Text>
    )
}

export default Paragraph

const styles = StyleSheet.create({
    paragraph: {
        fontSize: globalStyles.sizes.body_sm,
        color: globalStyles.colors.light.main_dark
    }
})
