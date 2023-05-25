import React from "react";
import classes from "./formInput.module.scss";

interface FormInputProps {
  type: string;
  placeholder: string;
  name: string;
  register: any;
  errors: any;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  name,
  register,
  errors,
}) => {
  return (
    <div className={classes.mainForm}>
      <input
        className={classes.formInput}
        {...register(name)}
        type={type}
        placeholder={placeholder}
      />
      <p className={classes.error}>{errors}</p>
    </div>
  );
};

export default FormInput;
