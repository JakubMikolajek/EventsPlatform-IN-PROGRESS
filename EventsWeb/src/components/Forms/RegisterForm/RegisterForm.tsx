import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavigateFunction, useNavigate } from "react-router-dom";

import FormInput from "../../Inputs/FormInput/FormInput.tsx";
import SubmitInput from "../../Inputs/SubmitInput/SubmitInput.tsx";

import classes from "./registerForm.module.scss";

import { registerValidation } from "../../../utils/validation/registerValidation.ts";
import { supabaseClient } from "../../../supabase/supabase.ts";

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
    const { error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: first_name,
          last_name: last_name,
        },
      },
    });

    if (!error) {
      navigate("/login", { replace: true });
    } else {
      alert("Spróbuj jeszcze raz");
    }
  };

  return (
    <form
      className={classes.auth_form}
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
