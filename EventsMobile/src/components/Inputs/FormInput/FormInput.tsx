import React from "react";
import {KeyboardTypeOptions, StyleSheet, Text, TextInput, View} from 'react-native'
import {screenWidth} from "../../../utils/variables/dimension";
import {Controller} from "react-hook-form";
import {globalStyles} from "../../../utils/variables/globalStyles";

interface FormInputProps {
    placeholder: string
    name: string
    control: any
    errors: any
    keyboardType?: KeyboardTypeOptions | undefined
    secureTextEntry?: boolean | undefined
}

const FormInput: React.FC<FormInputProps> = ({placeholder, name, control, errors, keyboardType, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <Controller control={control} name={name}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput style={[styles.input, errors && styles.inputError]} placeholder={placeholder}
                                       keyboardType={keyboardType}
                                       secureTextEntry={secureTextEntry} onChangeText={onChange} onBlur={onBlur}
                                       value={value}
                            />
                        )}/>
            <Text style={styles.errorMessage}>{errors?.message}</Text>
        </View>
    )
}

export default FormInput

const styles = StyleSheet.create({
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
