import React from "react";
import classes from "./submitInput.module.scss";

interface SubmitInputProps {
  type: string;
  value: string;
}

const SubmitInput: React.FC<SubmitInputProps> = ({ type, value }) => {
  return <input className={classes.submitInput} type={type} value={value} />;
};

export default SubmitInput;
