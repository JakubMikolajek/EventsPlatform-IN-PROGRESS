import React from "react";
import LoginForm from "../components/forms/LoginForm.tsx";
import classes from "./login.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../store/store.ts";

const Login: React.FC = () => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <div className={classes.main_container}>
      <div
        className={
          isDark ? classes.form_container_dark : classes.form_container_light
        }
      >
        <h1>Zaloguj się</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
