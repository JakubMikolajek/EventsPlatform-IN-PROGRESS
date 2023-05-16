import { NavLink } from "react-router-dom";
import classes from "./navigation.module.scss";
import React from "react";
import NavButton from "../buttons/NavButton.tsx";
import { useDispatch, useSelector } from "react-redux";
import Button from "../buttons/Button.tsx";
import { supabasClient } from "../../supabase/supabase.ts";
import { setIsAuth, setIsLoggedIn } from "../../store/reducers/authSlice.ts";

const Navigation: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth: boolean = useSelector((state: any) => state.auth.isAuth);
  const ownId: string = useSelector((state: any) => state.auth.loggedUserId);

  const logoutUser = async () => {
    return await supabasClient.auth.signOut().then(() => {
      dispatch(setIsAuth(false));
      dispatch(setIsLoggedIn(""));
    });
  };

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
        {!isAuth ? (
          <>
            <NavButton isAlt={true} title="Zaloguj się" path="/login" />
            <NavButton isAlt={false} title="Zarejestruj się" path="/register" />
          </>
        ) : (
          <>
            <p>{ownId}</p>
            <Button title="Wyloguj się" isAlt={true} onClick={logoutUser} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
