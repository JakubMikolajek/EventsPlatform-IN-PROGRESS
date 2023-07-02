import React from "react";
import { Link } from "react-router-dom";
import classes from "./buttons.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";

interface ButtonProps {
  title: string;
  path: string;
  isAlt: boolean;
  onClick?: any;
}

const NavButton: React.FC<ButtonProps> = ({ title, path, isAlt, onClick }) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <div className={classes.btn_container}>
      {isAlt ? (
        <Link to={path}>
          <button
            onClick={onClick}
            className={isDark ? classes.btn_alt_dark : classes.btn_alt_light}
          >
            {title}
          </button>
        </Link>
      ) : (
        <Link to={path}>
          <button
            onClick={onClick}
            className={isDark ? classes.btn_dark : classes.btn_light}
          >
            {title}
          </button>
        </Link>
      )}
    </div>
  );
};

export default NavButton;
