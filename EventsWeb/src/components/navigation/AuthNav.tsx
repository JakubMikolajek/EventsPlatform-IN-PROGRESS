import React from "react";
import Button from "../buttons/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import classes from "./authNav.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "../../hooks/fetchSingleUser.tsx";
import { supabaseClient } from "../../supabase/supabase.ts";
import { setIsAuth, setIsLoggedIn } from "../../store/reducers/authSlice.ts";
import NavButton from "../buttons/NavButton.tsx";
import { StateProps } from "../../store/store.ts";

const AuthNav: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ownId = useSelector((state: StateProps) => state.auth.loggedUserId);
  let user_data;

  if (typeof ownId !== "undefined") {
    const { user, isLoading } = fetchSingleUser(ownId, true);
    if (isLoading) {
      return null;
    }
    user_data = user;
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
      <Link to="profile" style={{ textDecoration: "none" }}>
        <div className={classes.profile}>
          {user_data?.image_url && (
            <img src={user_data?.image_url} alt="user" />
          )}
          <p>
            {user_data?.first_name} {user_data?.last_name}
          </p>
        </div>
      </Link>
      <Button title="Wyloguj się" isAlt={true} onClick={logoutUser} />
    </>
  );
};

export default AuthNav;
