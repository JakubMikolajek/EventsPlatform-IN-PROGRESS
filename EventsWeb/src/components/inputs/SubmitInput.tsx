import React from "react";
import classes from "./submitInput.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";

interface SubmitInputProps {
  type: string;
  value: string;
}

const SubmitInput: React.FC<SubmitInputProps> = ({ type, value }) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <input
      className={
        isDark ? classes.submit_input_dark : classes.submit_input_light
      }
      type={type}
      value={value}
    />
  );
};

export default SubmitInput;
