import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { supabasClient } from "../../supabase/supabase.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidation } from "../../utils/validation/validation.ts";
import classes from "./registerForm.module.scss";
import FormInput from "../inputs/FormInput.tsx";
import SubmitInput from "../inputs/SubmitInput.tsx";

const RegisterForm: React.FC = () => {
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
    return await supabasClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: first_name,
          last_name: last_name,
        },
      },
    });
  };

  return (
    <div className={classes.main}>
      <h1>Zarejestruj się</h1>
      <form
        className={classes.form}
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
    </div>
  );
};

export default RegisterForm;
