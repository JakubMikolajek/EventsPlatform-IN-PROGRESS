import React from "react";
import { Link } from "react-router-dom";
import classes from "./buttons.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";

interface ButtonProps {
  title: string;
  path: string;
  isAlt: boolean;
}

const NavButton: React.FC<ButtonProps> = ({ title, path, isAlt }) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <>
      {isAlt ? (
        <Link to={path}>
          <button
            className={isDark ? classes.btn_alt_dark : classes.btn_alt_light}
          >
            {title}
          </button>
        </Link>
      ) : (
        <Link to={path}>
          <button className={isDark ? classes.btn_dark : classes.btn_light}>
            {title}
          </button>
        </Link>
      )}
    </>
  );
};

export default NavButton;
