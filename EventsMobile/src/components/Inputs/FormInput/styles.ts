import {StyleSheet} from "react-native";
import {globalStyles} from "../../../utils/variables/globalStyles";
import {screenWidth} from "../../../utils/variables/dimension";

export const styles = StyleSheet.create({
    container: {
        marginVertical: globalStyles.spacing.sm,
        alignItems: "center"
    },
    input: {
        borderColor: globalStyles.colors.light.main_dark,
        borderRadius: 4,
        borderWidth: 1.5,
        height: 40,
        fontSize: globalStyles.sizes.body_md,
        width: screenWidth * 0.8,
        justifyContent: "center",
        paddingHorizontal: globalStyles.spacing.sm
    },
    inputError: {
        borderColor: globalStyles.colors.light.error
    },
    errorMessage: {
        color: globalStyles.colors.light.main_dark
    }
})
