import React from "react";
import EditProfileForm from "../components/forms/EditProfileForm.tsx";
import classes from "./editProfile.module.scss";

const EditProfile: React.FC = () => {
  return (
    <div className={classes.main}>
      <EditProfileForm />
    </div>
  );
};

export default EditProfile;
