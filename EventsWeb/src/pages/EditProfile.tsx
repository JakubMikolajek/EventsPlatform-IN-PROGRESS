import React from "react";
import classes from "./editProfile.module.scss";
import BackButton from "../components/buttons/BackButton.tsx";
import { NavigateFunction, useNavigate } from "react-router-dom";
import EditForm from "../components/forms/editProfileForm/EditForm.tsx";
import ChangePassword from "../components/forms/editProfileForm/ChangePassword.tsx";

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
