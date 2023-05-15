import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "../../utils/validation/validation.ts";
import { supabasClient } from "../../supabase/supabase.ts";
import { setIsAuth, setIsLoggedIn } from "../../store/reducers/authSlice.ts";
import { useDispatch } from "react-redux";
import classes from "./loginForm.module.scss";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    return await supabasClient.auth
      .signInWithPassword({
        email: email,
        password: password,
      })
      .then((response) => {
        dispatch(setIsLoggedIn(response.data.user?.id));
        dispatch(setIsAuth(true));
      })
      .then(() => navigate("/", { replace: true }));
  };

  return (
    <form
      className={classes.form}
      onClick={handleSubmit((values: FieldValues) =>
        loginUser(values.email, values.password)
      )}
    >
      <input {...register("email")} type="email" placeholder="Email" />
      <p>{errors.email?.message}</p>
      <input {...register("password")} type="password" placeholder="Hasło" />
      <p>{errors.password?.message}</p>
      <input type="submit" value="Zaloguj się" />
    </form>
  );
};

export default LoginForm;
