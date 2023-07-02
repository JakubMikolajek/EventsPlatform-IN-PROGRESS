import React from "react";
import { useSelector } from "react-redux";

import classes from "./backButton.module.scss";

import { StateProps } from "../../../store/store.ts";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <button
      className={isDark ? classes.btn_dark : classes.btn_light}
      onClick={onClick}
    >
      Powrót
    </button>
  );
};

export default BackButton;
