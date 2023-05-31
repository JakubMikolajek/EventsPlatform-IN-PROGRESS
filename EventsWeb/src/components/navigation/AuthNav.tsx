import React from "react";
import Button from "../buttons/Button.tsx";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import classes from "./authNav.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "../../hooks/fetchSingleUser.tsx";
import { supabaseClient } from "../../supabase/supabase.ts";
import { setIsAuth, setIsLoggedIn } from "../../store/reducers/authSlice.ts";
import NavButton from "../buttons/NavButton.tsx";
import { StateProps } from "../../store/store.ts";
import { Dispatch } from "redux";
import {
  FetchSingleUserDataProps,
  UserProps,
} from "../../utils/types/types.ts";

const AuthNav: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );
  let user_data: UserProps | undefined | null;

  if (typeof ownId !== "undefined") {
    const { user, isLoading }: FetchSingleUserDataProps = fetchSingleUser(
      ownId,
      true
    );
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
      <Button title="Wyloguj się" isAlt={true} onClick={logoutUser} />
      <Link to="profile" style={{ textDecoration: "none" }}>
        <div className={classes.profile}>
          {user_data?.image_url && (
            <img src={user_data?.image_url} alt="user" />
          )}
        </div>
      </Link>
    </>
  );
};

export default AuthNav;
