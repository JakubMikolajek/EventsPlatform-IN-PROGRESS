import React, { useState } from "react";
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
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AuthNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch: Dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );
  const isDark: boolean = useSelector(
    (state: StateProps) => state.theme.isDark
  );
  let user_data: UserProps | undefined | null;
  let user_isLoading;
  if (typeof ownId !== "undefined") {
    const { user, isLoading }: FetchSingleUserDataProps = fetchSingleUser(
      ownId,
      true
    );
    user_isLoading = isLoading;
    user_data = user;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logoutUser = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (!error) {
      dispatch(setIsAuth(false));
      dispatch(setIsLoggedIn(""));
      navigate("/", { replace: true });
    } else {
      alert("Wystąpił błąd. Spróbuj ponownie.");
    }
    setIsOpen(false);
  };

  return (
    <>
      {user_isLoading ? null : (
        <div
          className={isDark ? classes.container_dark : classes.container_light}
        >
          <div className={classes.web}>
            <NavButton
              title="Utwórz wydarzenie"
              isAlt={true}
              path="add-event"
            />
            <Button title="Wyloguj się" isAlt={true} onClick={logoutUser} />
            <Link to="profile" style={{ textDecoration: "none" }}>
              <div className={classes.profile}>
                {user_data?.image_url && (
                  <img src={user_data?.image_url} alt="user" />
                )}
              </div>
            </Link>
          </div>
          <div className={classes.mobile}>
            <FontAwesomeIcon
              className={classes.icon}
              icon={isOpen ? faXmark : faBars}
              onClick={() => toggleMenu()}
              size="xl"
            />
            <div
              className={isOpen ? classes.elements_active : classes.elements}
            >
              <div
                className={isDark ? classes.active_dark : classes.active_light}
              >
                <div className={classes.element}>
                  <Link
                    onClick={closeMenu}
                    to="profile"
                    style={{ textDecoration: "none" }}
                  >
                    <div className={classes.profile}>
                      {user_data?.image_url && (
                        <img src={user_data?.image_url} alt="user" />
                      )}
                    </div>
                  </Link>
                </div>
                <div className={classes.element}>
                  <NavButton
                    title="Utwórz wydarzenie"
                    isAlt={true}
                    path="add-event"
                    onClick={closeMenu}
                  />
                </div>
                <div className={classes.element}>
                  <Button
                    title="Wyloguj się"
                    isAlt={true}
                    onClick={logoutUser}
                  />
                </div>

                <FontAwesomeIcon
                  className={classes.icon}
                  icon={isOpen ? faXmark : faBars}
                  onClick={() => toggleMenu()}
                  size="xl"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthNav;
