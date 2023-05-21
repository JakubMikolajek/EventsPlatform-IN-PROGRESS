import React from "react";
import Button from "../buttons/Button.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./navigation.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "../../hooks/fetchSingleUser.tsx";
import { supabaseClient } from "../../supabase/supabase.ts";
import { setIsAuth, setIsLoggedIn } from "../../store/reducers/authSlice.ts";
import NavButton from "../buttons/NavButton.tsx";

const AuthNav: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ownId: string = useSelector((state: any) => state.auth.loggedUserId);
  const { user, isLoading }: any = fetchSingleUser(ownId, true);

  if (isLoading) {
    return null;
  }

  const logoutUser = async () => {
    return await supabaseClient.auth
      .signOut()
      .then(() => {
        dispatch(setIsAuth(false));
        dispatch(setIsLoggedIn(""));
      })
      .then(() => navigate("/", { replace: true }));
  };

  return (
    <>
      <NavButton title="Utwórz wydarzenie" isAlt={true} path="add-event" />
      <NavLink to="profile" style={{ textDecoration: "none" }}>
        <div className={classes.profile}>
          <img src={user?.image_url} alt="user" />
          <p>
            {user?.first_name} {user?.last_name}
          </p>
        </div>
      </NavLink>
      <Button title="Wyloguj się" isAlt={true} onClick={logoutUser} />
    </>
  );
};

export default AuthNav;
