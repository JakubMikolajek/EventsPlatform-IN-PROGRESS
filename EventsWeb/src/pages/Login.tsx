import React from "react";
import LoginForm from "../components/forms/LoginForm.tsx";
import classes from "./login.module.scss";

const Login: React.FC = () => {
  return (
    <div className={classes.main}>
      <LoginForm />
    </div>
  );
};

export default Login;
