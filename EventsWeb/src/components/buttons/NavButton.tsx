import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./buttons.module.scss";

interface ButtonProps {
  title: string;
  path: string;
  isAlt: boolean;
}

const NavButton: React.FC<ButtonProps> = ({ title, path, isAlt }) => {
  return (
    <>
      {isAlt ? (
        <NavLink to={path} end>
          <button className={classes.btnAlt}>{title}</button>
        </NavLink>
      ) : (
        <NavLink to={path} end>
          <button className={classes.btn}>{title}</button>
        </NavLink>
      )}
    </>
  );
};

export default NavButton;
