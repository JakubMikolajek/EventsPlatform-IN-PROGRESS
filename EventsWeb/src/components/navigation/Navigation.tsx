import { NavLink } from "react-router-dom";
import classes from "./navigation.module.scss";
import React from "react";
import NavButton from "../buttons/NavButton.tsx";

const Navigation: React.FC = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.left}>
        <NavLink
          className={({ isActive }) =>
            isActive ? classes.active : classes.logo
          }
          to="/"
          end
        >
          <h1>Events App</h1>
        </NavLink>
      </div>
      <div className={classes.right}>
        <NavButton isAlt={true} title="Zaloguj się" path="/login" />
        <NavButton isAlt={false} title="Zarejestruj się" path="/register" />
      </div>
    </nav>
  );
};

export default Navigation;
