import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import UnauthNav from "../UnAuthNav/UnauthNav.tsx";
import AuthNav from "../AuthNav/AuthNav.tsx";

import classes from "./navigation.module.scss";

import { StateProps } from "../../../store/store.ts";
import { setIsDark } from "../../../store/reducers/themeSlice.ts";

const MainNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth: boolean = useSelector((state: StateProps) => state.auth.isAuth);
  const isDark: boolean = useSelector(
    (state: StateProps) => state.theme.isDark
  );

  return (
    <nav className={isDark ? classes.navbar_dark : classes.navbar_light}>
      <div className={classes.left}>
        <Link className={classes.logo} to="/">
          <h1>Events App</h1>
        </Link>
        <FontAwesomeIcon
          className={classes.icon}
          icon={isDark ? faMoon : faSun}
          onClick={() => dispatch(setIsDark(!isDark))}
          size="xl"
        />
      </div>
      <div className={classes.right}>
        {!isAuth ? <UnauthNav /> : <AuthNav />}
      </div>
    </nav>
  );
};

export default MainNavigation;
