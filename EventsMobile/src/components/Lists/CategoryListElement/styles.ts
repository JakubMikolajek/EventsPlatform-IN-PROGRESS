import {StyleSheet} from "react-native";
import {screenWidth} from "../../../utils/variables/dimension";
import {globalStyles} from "../../../utils/variables/globalStyles";

export const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenWidth * 0.2,
        alignItems: "center",
    },
    innerContainer: {
        width: screenWidth * 0.8,
        height: screenWidth * 0.2,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: globalStyles.colors.light.main_dark,
        borderRadius: 8
    },

    title: {
        fontSize: globalStyles.sizes.h1,
        color: globalStyles.colors.light.main_dark
    }
})
