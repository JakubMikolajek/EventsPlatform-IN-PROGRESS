import React, { useEffect } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import UnauthNav from "../UnAuthNav/UnauthNav.tsx";
import AuthNav from "../AuthNav/AuthNav.tsx";

import classes from "./navigation.module.scss";

import { StateProps } from "../../../store/store.ts";
import { setIsDark } from "../../../store/reducers/themeSlice.ts";
import { supabaseClient } from "../../../supabase/supabase.ts";
import { setIsAuth, setIsLoggedIn } from "../../../store/reducers/authSlice.ts";
import { getItem } from "../../../utils/functions/localStorage.ts";

const MainNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const isAuth: boolean = useSelector((state: StateProps) => state.auth.isAuth);
  const isDark: boolean = useSelector(
    (state: StateProps) => state.theme.isDark
  );

  const logoutUser = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
      dispatch(setIsAuth(false));
      dispatch(setIsLoggedIn(""));
      navigate("/", { replace: true });
    } else {
      alert("Wystąpił błąd. Spróbuj ponownie.");
    }
  };

  useEffect(() => {
    const asyncGetItem = async () => {
      const data = await getItem("sb-jydvcrgomskcwastsjqh-auth-token");
      if (data) {
        const user_data = JSON.parse(data);
        if (user_data.expires_at * 1000 < Date.now()) {
          logoutUser();
        }
      }
    };
    asyncGetItem();
  }, []);

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
