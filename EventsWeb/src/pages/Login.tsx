import React from "react";
import LoginForm from "../components/forms/LoginForm.tsx";
import classes from "./login.module.scss";

const Login: React.FC = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.formContainer}>
        <h1>Zaloguj się</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
