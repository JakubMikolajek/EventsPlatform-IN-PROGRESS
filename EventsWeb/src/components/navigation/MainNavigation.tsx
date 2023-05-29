import { Link } from "react-router-dom";
import classes from "./navigation.module.scss";
import React from "react";
import { useSelector } from "react-redux";
import UnauthNav from "./UnauthNav.tsx";
import AuthNav from "./AuthNav.tsx";
import { StateProps } from "../../store/store.ts";

const MainNavigation: React.FC = () => {
  const isAuth: boolean = useSelector((state: StateProps) => state.auth.isAuth);

  return (
    <nav className={classes.navbar}>
      <div className={classes.left}>
        <Link className={classes.logo} to="/">
          <h1>Events App</h1>
        </Link>
      </div>
      <div className={classes.right}>
        {!isAuth ? <UnauthNav /> : <AuthNav />}
      </div>
    </nav>
  );
};

export default MainNavigation;
