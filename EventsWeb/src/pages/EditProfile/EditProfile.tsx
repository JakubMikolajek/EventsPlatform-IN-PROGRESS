import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import BackButton from "../../components/Buttons/BackButton/BackButton.tsx";
import EditForm from "../../components/Forms/EditProfileForm/EditForm.tsx";
import ChangePassword from "../../components/Forms/ChangePassword/ChangePassword.tsx";

import classes from "./editProfile.module.scss";

const EditProfile: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div className={classes.main_container}>
      <div>
        <BackButton onClick={() => navigate(-1)} />
      </div>
      <div className={classes.inner_container}>
        <EditForm />
        <ChangePassword />
      </div>
    </div>
  );
};

export default EditProfile;
