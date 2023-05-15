import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { supabasClient } from "../../supabase/supabase.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidation } from "../../utils/validation/validation.ts";
import classes from "./registerForm.module.scss";

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
    <form
      className={classes.form}
      onClick={handleSubmit((values: FieldValues) =>
        registerUser(
          values.email,
          values.password,
          values.firstName,
          values.lastName
        )
      )}
    >
      <input {...register("email")} type="email" placeholder="Email" />
      <p>{errors.email?.message}</p>
      <input {...register("password")} type="password" placeholder="Hasło" />
      <p>{errors.password?.message}</p>
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Potwierdź hasło"
      />
      <p>{errors.confirmPassword?.message}</p>
      <input {...register("firstName")} type="text" placeholder="Imię" />
      <p>{errors.firstName?.message}</p>
      <input {...register("lastName")} type="text" placeholder="Nazwisko" />
      <p>{errors.lastName?.message}</p>
      <input type="submit" value="Zarejestruj się" />
    </form>
  );
};

export default RegisterForm;
