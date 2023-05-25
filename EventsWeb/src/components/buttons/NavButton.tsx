import React from "react";
import { Link } from "react-router-dom";
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
        <Link to={path}>
          <button className={classes.btnAlt}>{title}</button>
        </Link>
      ) : (
        <Link to={path}>
          <button className={classes.btn}>{title}</button>
        </Link>
      )}
    </>
  );
};

export default NavButton;
