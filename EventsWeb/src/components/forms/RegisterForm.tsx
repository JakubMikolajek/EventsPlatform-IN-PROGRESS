import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { supabaseClient } from "../../supabase/supabase.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidation } from "../../utils/validation/validation.ts";
import classes from "./authForms.module.scss";
import FormInput from "../inputs/FormInput.tsx";
import SubmitInput from "../inputs/SubmitInput.tsx";
import { NavigateFunction, useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const registerUser = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) => {
    return await supabaseClient.auth
      .signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: first_name,
            last_name: last_name,
          },
        },
      })
      .then(() => navigate("/login", { replace: true }));
  };

  return (
    <form
      className={classes.authForm}
      onSubmit={handleSubmit((values: FieldValues) =>
        registerUser(
          values.email,
          values.password,
          values.firstName,
          values.lastName
        )
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
      <FormInput
        register={register}
        type="password"
        placeholder="Potwierdź hasło"
        name="confirmPassword"
        errors={errors.confirmPassword?.message}
      />
      <FormInput
        register={register}
        type="text"
        placeholder="Imię"
        name="firstName"
        errors={errors.firstName?.message}
      />
      <FormInput
        register={register}
        type="text"
        placeholder="Nazwisko"
        name="lastName"
        errors={errors.lastName?.message}
      />
      <SubmitInput type="submit" value="Zarejestruj się" />
    </form>
  );
};

export default RegisterForm;
