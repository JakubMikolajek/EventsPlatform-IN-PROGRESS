import React from "react";
import { useSelector } from "react-redux";

import RegisterForm from "../../components/Forms/RegisterForm/RegisterForm.tsx";

import classes from "./register.module.scss";

import { StateProps } from "../../store/store.ts";

const Register: React.FC = () => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <div className={classes.main_container}>
      <div
        className={
          isDark ? classes.form_container_dark : classes.form_container_light
        }
      >
        <h1>Zarejestruj się</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
