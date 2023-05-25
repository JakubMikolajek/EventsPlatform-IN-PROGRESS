import React from "react";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";
import { fetchSingleUser } from "../../hooks/fetchSingleUser.tsx";
import classes from "./userInfo.module.scss";
import Button from "../buttons/Button.tsx";

const UserInfo: React.FC = () => {
  const ownId = useSelector((state: StateProps) => state.auth.loggedUserId);
  let user_data;

  if (typeof ownId !== "undefined") {
    const { user, isLoading } = fetchSingleUser(ownId, true);
    if (isLoading) {
      return null;
    }
    user_data = user;
  }

  return (
    <div className={classes.main}>
      {user_data?.image_url && <img src={user_data?.image_url} alt="user" />}
      <div className={classes.container}>
        <div className={classes.user}>
          <h1>
            {user_data?.first_name} {user_data?.last_name}
          </h1>
          <h2>Twoje id: {user_data?.uuid}</h2>
        </div>
        <Button
          title="Edytuj swój profil"
          isAlt={true}
          onClick={() => console.log("Działa")}
        />
      </div>
    </div>
  );
};

export default UserInfo;
