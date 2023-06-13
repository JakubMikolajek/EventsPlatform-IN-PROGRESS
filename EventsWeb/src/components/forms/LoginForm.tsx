import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "../../utils/validation/loginValidation.ts";
import { supabaseClient } from "../../supabase/supabase.ts";
import { setIsAuth, setIsLoggedIn } from "../../store/reducers/authSlice.ts";
import { useDispatch } from "react-redux";
import classes from "./authForms.module.scss";
import { NavigateFunction, useNavigate } from "react-router-dom";
import FormInput from "../inputs/FormInput.tsx";
import SubmitInput from "../inputs/SubmitInput.tsx";
import { AuthResponse } from "@supabase/supabase-js";
import { Dispatch } from "redux";

const LoginForm: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUser = async (email: string, password: string) => {
    return await supabaseClient.auth
      .signInWithPassword({
        email: email,
        password: password,
      })
      .then((response: AuthResponse) => {
        dispatch(setIsLoggedIn(response.data.user?.id));
        dispatch(setIsAuth(true));
      })
      .then(() => navigate("/", { replace: true }));
  };

  return (
    <form
      className={classes.authForm}
      onSubmit={handleSubmit((values: FieldValues) =>
        loginUser(values.email, values.password)
      )}
    >
      <FormInput
        register={register}
        type="email"
        placeholder="Email"
        name="email"
        errors={errors.email?.message}
      />
      <FormInput
        register={register}
        type="password"
        placeholder="Hasło"
        name="password"
        errors={errors.password?.message}
      />
      <SubmitInput type="submit" value="Zaloguj się" />
    </form>
  );
};

export default LoginForm;
