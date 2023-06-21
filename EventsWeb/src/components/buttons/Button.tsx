import React from "react";
import classes from "./buttons.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";

interface ButtonProps {
  title: string;
  onClick: () => void;
  isAlt: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, isAlt }) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <>
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
    </>
  );
};

export default Button;
