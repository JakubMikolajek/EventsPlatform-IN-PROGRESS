import React from "react";
import {KeyboardTypeOptions, Text, TextInput, View} from 'react-native'
import {Controller} from "react-hook-form";

import {styles} from "./styles";

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
