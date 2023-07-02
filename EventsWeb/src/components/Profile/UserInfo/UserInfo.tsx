import React from "react";
import { useSelector } from "react-redux";

import NavButton from "../../Buttons/NavButton/NavButton.tsx";

import classes from "./userInfo.module.scss";

import { StateProps } from "../../../store/store.ts";
import { fetchSingleUser } from "../../../hooks/fetchSingleUser.tsx";
import {
  FetchSingleUserDataProps,
  UserProps,
} from "../../../utils/types/types.ts";

interface UserInfoProps {
  ownId: string | undefined;
}

const UserInfo: React.FC<UserInfoProps> = ({ ownId }) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
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

  return (
    <>
      {user_isLoading ? null : (
        <div className={isDark ? classes.main_dark : classes.main_light}>
          {user_data?.image_url && (
            <img
              className={classes.img}
              src={user_data?.image_url}
              alt="user"
            />
          )}
          <div className={classes.container}>
            <div className={classes.user}>
              <h1>
                {user_data?.first_name} {user_data?.last_name}
              </h1>
              <h2>Twoje id: {user_data?.uuid}</h2>
            </div>
            <NavButton
              title="Edytuj swój profil"
              isAlt={true}
              path="/profile-edit"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
