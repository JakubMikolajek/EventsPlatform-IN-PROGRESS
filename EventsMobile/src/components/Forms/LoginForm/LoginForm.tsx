import React from "react";
import {Alert, View} from 'react-native'
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";

import FormInput from "../../Inputs/FormInput/FormInput";
import CustomButton from "../../Buttons/CustomButton/CustomButton";

import {styles} from "./styles";
import {loginValidation} from "../../../utils/validation/loginValidation";
import {supabaseClient} from "../../../supabase/supabase";
import {setIsAuth, setIsLoggedIn} from "../../../store/reducers/authSlice";

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
            <CustomButton title="Zaloguj się"
                          onPress={handleSubmit((values: FieldValues) => loginUser(values.email, values.password))}
                          isAlt={false}
            />
        </View>
    )
}

export default LoginForm
