import React from "react";
import {Alert, StyleSheet, View} from 'react-native'
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerValidation} from "../../../utils/validation/registerValidation";
import {supabaseClient} from "../../../supabase/supabase";
import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native";
import {globalStyles} from "../../../utils/variables/globalStyles";
import FormInput from "../../Inputs/FormInput/FormInput";
import CustomButton from "../../Buttons/CustomButton/CustomButton";

const RegisterForm = () => {
    const navigation: NavigationProp<ParamListBase> = useNavigation()

    const {control, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(registerValidation),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: ""
        }
    })

    const registerUser = async (email: string, password: string, first_name: string, last_name: string) => {
        const {error} = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    first_name: first_name,
                    last_name: last_name
                }
            }
        })

        if (!error) {
            reset()
            navigation.goBack()
        } else {
            return Alert.alert("Wystąpił problem", "Spróbuj ponownie")
        }
    }

    return (
        <View style={styles.container}>
            <FormInput placeholder="Email" name="email" control={control} errors={errors.email}
                       keyboardType="email-address"/>
            <FormInput placeholder="Hasło" name="password" control={control} errors={errors.password}
                       secureTextEntry={true}/>
            <FormInput placeholder="Potwierdź hasło" name="confirmPassword" control={control}
                       errors={errors.confirmPassword} secureTextEntry={true}
            />
            <FormInput placeholder="Imię" name="firstName" control={control} errors={errors.firstName}/>
            <FormInput placeholder="Nazwisko" name="lastName" control={control} errors={errors.lastName}/>
            <CustomButton title="Zarejestruj się"
                          onPress={handleSubmit((values: FieldValues) => registerUser(values.email, values.password, values.firstName, values.lastName))}
                          isAlt={false}
            />
        </View>
    )
}

export default RegisterForm

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: globalStyles.spacing.xl
    }
})
