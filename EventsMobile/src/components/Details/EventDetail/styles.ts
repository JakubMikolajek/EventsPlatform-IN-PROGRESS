import {StyleSheet} from "react-native";
import {globalStyles} from "../../../utils/variables/globalStyles";
import {screenWidth} from "../../../utils/variables/dimension";

export const styles = StyleSheet.create({
    container: {
        marginTop: globalStyles.spacing.sm,
        alignItems: "center",
    },
    image: {
        width: screenWidth * .75,
        height: screenWidth * .75
    }
})
