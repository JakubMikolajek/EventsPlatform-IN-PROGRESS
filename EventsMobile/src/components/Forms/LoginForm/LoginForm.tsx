import React from "react";
import {Alert, StyleSheet, View} from 'react-native'
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginValidation} from "../../../utils/validation/loginValidation";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import FormInput from "../../Inputs/FormInput/FormInput";
import CustomButton from "../../Buttons/CustomButton/CustomButton";
import {supabaseClient} from "../../../supabase/supabase";
import {setIsAuth, setIsLoggedIn} from "../../../store/reducers/authSlice";
import {globalStyles} from "../../../utils/variables/globalStyles";

const LoginForm: React.FC = () => {
    const dispatch: Dispatch = useDispatch()

    const {control, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(loginValidation),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const loginUser = async (email: string, password: string) => {
        const {data, error} = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (!error) {
            dispatch(setIsLoggedIn(data.user?.id))
            dispatch(setIsAuth(true))
            reset()
        } else {
            return Alert.alert("Błędne dane", "Spróbuj ponownie")
        }
    }

    return (
        <View style={styles.container}>
            <FormInput placeholder="Email" name="email" control={control} errors={errors.email}
                       keyboardType="email-address"/>
            <FormInput placeholder="Hasło" name="password" control={control} errors={errors.password}
                       secureTextEntry={true}/>
            <CustomButton isAlt={false} title="Zaloguj się"
                          onPress={handleSubmit((values: FieldValues) => loginUser(values.email, values.password))}/>
        </View>
    )
}

export default LoginForm

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: globalStyles.spacing.xl
    }
})
