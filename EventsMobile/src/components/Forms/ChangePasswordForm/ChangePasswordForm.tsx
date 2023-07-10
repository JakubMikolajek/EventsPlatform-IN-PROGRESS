import React from "react";
import {Alert, StyleSheet, View} from 'react-native'
import {FieldValues, useForm} from "react-hook-form";
import {supabaseClient} from "../../../supabase/supabase";
import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native";
import {globalStyles} from "../../../utils/variables/globalStyles";
import FormInput from "../../Inputs/FormInput/FormInput";
import CustomButton from "../../Buttons/CustomButton/CustomButton";
import {yupResolver} from "@hookform/resolvers/yup";
import {changePasswordValidation} from "../../../utils/validation/changePasswordValidation";

const ChangePasswordForm = () => {
    const navigation: NavigationProp<ParamListBase> = useNavigation()

    const {control, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(changePasswordValidation),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const updatePassword = async (data: any) => {
        const {error} = await supabaseClient.auth.updateUser({password: data.password})
        if (error) {
            return Alert.alert("Błąd", "Spróbuj ponownie później")
        }
        reset()
        navigation.goBack()
        return Alert.alert("Zmieniono hasło")
    }

    return (
        <View style={styles.container}>
            <FormInput placeholder="Nowe hasło" name="password" control={control} errors={errors.password}
                       secureTextEntry={true}/>
            <FormInput placeholder="Potwierdź nowe hasło" name="confirmPassword" control={control}
                       errors={errors.confirmPassword} secureTextEntry={true}/>
            <CustomButton title="Zmień hasło" onPress={handleSubmit((values: FieldValues) => updatePassword(values))}
                          isAlt={false}/>
        </View>
    )
}

export default ChangePasswordForm

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: globalStyles.spacing.xl
    }
})
