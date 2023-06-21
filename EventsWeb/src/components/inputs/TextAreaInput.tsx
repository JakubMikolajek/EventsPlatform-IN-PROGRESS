import React from "react";
import classes from "./textAreaInput.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";

interface TextAreaInput {
  placeholder: string;
  name: string;
  register: any;
  errors: any;
}

const TextAreaInput: React.FC<TextAreaInput> = ({
  placeholder,
  name,
  register,
  errors,
}) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <div className={classes.main_textarea}>
      <textarea
        className={
          isDark ? classes.textarea_input_dark : classes.textarea_input_light
        }
        {...register(name)}
        placeholder={placeholder}
        rows={5}
      />
      <p className={isDark ? classes.error_dark : classes.error_light}>
        {errors}
      </p>
    </div>
  );
};

export default TextAreaInput;
