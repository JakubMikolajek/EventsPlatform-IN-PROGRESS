import React from "react";
import classes from "./button.module.scss";

interface ButtonProps {
  title: string;
  onClick: () => void;
  isAlt: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, isAlt }) => {
  return (
    <>
      {isAlt ? (
        <button onClick={onClick} className={classes.btnAlt}>
          {title}
        </button>
      ) : (
        <button onClick={onClick} className={classes.btn}>
          {title}
        </button>
      )}
    </>
  );
};

export default Button;
