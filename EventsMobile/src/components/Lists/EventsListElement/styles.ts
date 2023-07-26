import {StyleSheet} from "react-native";
import {screenWidth} from "../../../utils/variables/dimension";
import {globalStyles} from "../../../utils/variables/globalStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: screenWidth,
        height: screenWidth * 0.75,
        alignItems: "center"
    },
    image: {
        width: screenWidth * 0.9,
        height: screenWidth * 0.5
    },
    title: {
        fontSize: globalStyles.sizes.h5,
        fontWeight: "500"
    },
    description: {
        fontSize: globalStyles.sizes.body_lg
    }
})
