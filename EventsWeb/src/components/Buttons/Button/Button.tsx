import React from "react";
import { useSelector } from "react-redux";

import classes from "./button.module.scss";

import { StateProps } from "../../../store/store.ts";

interface ButtonProps {
  title: string;
  onClick: () => void;
  isAlt: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, isAlt }) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <div className={classes.btn_container}>
      {isAlt ? (
        <button
          onClick={onClick}
          className={isDark ? classes.btn_dark : classes.btn_light}
        >
          {title}
        </button>
      ) : (
        <button
          onClick={onClick}
          className={isDark ? classes.btn_alt_dark : classes.btn_alt_light}
        >
          {title}
        </button>
      )}
    </div>
  );
};

export default Button;
