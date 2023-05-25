import React from "react";
import UserInfo from "../components/profile/UserInfo.tsx";
import classes from "./profile.module.scss";

const Profile: React.FC = () => {
  return (
    <div className={classes.main}>
      <UserInfo />
    </div>
  );
};

export default Profile;
