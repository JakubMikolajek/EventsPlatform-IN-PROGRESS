import { NavLink } from "react-router-dom";
import classes from "./navigation.module.scss";
import React from "react";
import { useSelector } from "react-redux";
import UnauthNav from "./UnauthNav.tsx";
import AuthNav from "./AuthNav.tsx";
import { fetchSingleUser } from "../../hooks/fetchSingleUser.tsx";

const MainNavigation: React.FC = () => {
  const isAuth: boolean = useSelector((state: any) => state.auth.isAuth);
  const ownId: string = useSelector((state: any) => state.auth.loggedUserId);
  const { isLoading } = fetchSingleUser(ownId, true);

  if (isLoading) {
    return null;
  }

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
        {!isAuth ? <UnauthNav /> : <AuthNav />}
      </div>
    </nav>
  );
};

export default MainNavigation;
