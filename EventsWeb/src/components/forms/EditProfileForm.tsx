import React from "react";
import classes from "./editProfileForm.module.scss";
import BackButton from "../buttons/BackButton.tsx";
import { NavigateFunction, useNavigate } from "react-router-dom";
import EditForm from "./editProfile/EditForm.tsx";
import ChangePassword from "./editProfile/ChangePassword.tsx";

const EditProfileForm: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className={classes.main}>
      <div className={classes.backContainer}>
        <BackButton onClick={() => navigate(-1)} />
        <h1>Edytuj profil</h1>
      </div>
      <EditForm />
      <ChangePassword />
    </div>
  );
};

export default EditProfileForm;
