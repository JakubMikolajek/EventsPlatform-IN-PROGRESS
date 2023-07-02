import React from "react";
import { useSelector } from "react-redux";

import classes from "./formInput.module.scss";

import { StateProps } from "../../../store/store.ts";

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
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <div className={classes.main_form}>
      <input
        className={isDark ? classes.form_input_dark : classes.form_input_light}
        {...register(name)}
        type={type}
        placeholder={placeholder}
      />
      <p className={isDark ? classes.error_dark : classes.error_light}>
        {errors}
      </p>
    </div>
  );
};

export default FormInput;
