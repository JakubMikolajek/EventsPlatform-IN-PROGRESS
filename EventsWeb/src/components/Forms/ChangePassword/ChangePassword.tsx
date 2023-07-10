import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import FormInput from "../../Inputs/FormInput/FormInput.tsx";
import SubmitInput from "../../Inputs/SubmitInput/SubmitInput.tsx";

import classes from "./changePassword.module.scss";

import { StateProps } from "../../../store/store.ts";
import { supabaseClient } from "../../../supabase/supabase.ts";

const ChangePassword: React.FC = () => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const updatePassword = async (data: any) => {
    return await supabaseClient.auth
      .updateUser({ password: data.password })
      .then(() => alert("Hasło zostało zmienione"))
      .then(() => reset());
  };

  return (
    <div
      className={
        isDark
          ? classes.password_container_dark
          : classes.password_container_light
      }
    >
      <h2>Zmień hasło</h2>
      <form
        className={classes.form}
        onSubmit={handleSubmit((values: FieldValues) => updatePassword(values))}
      >
        <FormInput
          register={register}
          type="password"
          name="password"
          placeholder="Nowe hasło"
          errors={errors.password?.message}
        />
        <FormInput
          register={register}
          type="password"
          name="confirmPassword"
          placeholder="Potwierdź nowe hasło"
          errors={errors.confirmPassword?.message}
        />
        <SubmitInput type="submit" value="Zmień hasło" />
      </form>
    </div>
  );
};

export default ChangePassword;
