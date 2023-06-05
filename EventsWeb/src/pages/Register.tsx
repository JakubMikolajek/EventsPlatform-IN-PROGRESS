import React from "react";
import RegisterForm from "../components/forms/RegisterForm.tsx";
import classes from "./register.module.scss";

const Register: React.FC = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.formContainer}>
        <h1>Zarejestruj się</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
