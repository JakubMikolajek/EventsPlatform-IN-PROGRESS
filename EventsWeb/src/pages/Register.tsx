import React from "react";
import RegisterForm from "../components/forms/RegisterForm.tsx";
import classes from "./register.module.scss";

const Register: React.FC = () => {
  return (
    <div className={classes.main}>
      <RegisterForm />
    </div>
  );
};

export default Register;
