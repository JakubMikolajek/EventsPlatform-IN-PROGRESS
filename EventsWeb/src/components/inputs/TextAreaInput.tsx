import React from "react";
import classes from "./inputs.module.scss";

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
  return (
    <div className={classes.mainTextarea}>
      <textarea
        className={classes.textareaInput}
        {...register(name)}
        placeholder={placeholder}
        rows={5}
      />
      <p className={classes.error}>{errors}</p>
    </div>
  );
};

export default TextAreaInput;
