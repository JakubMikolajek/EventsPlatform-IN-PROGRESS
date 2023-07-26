import React from "react";
import {Text} from 'react-native'

import {styles} from "./styles";

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
