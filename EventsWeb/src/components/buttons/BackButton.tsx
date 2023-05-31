import React from "react";
import classes from "./backButton.module.scss";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button className={classes.btn} onClick={onClick}>
      Powrót
    </button>
  );
};

export default BackButton;
