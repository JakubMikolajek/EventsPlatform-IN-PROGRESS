import React from "react";
import EditProfileForm from "../components/forms/EditProfileForm.tsx";
import classes from "./editProfile.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../store/store.ts";

const EditProfile: React.FC = () => {
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );
  return (
    <div className={classes.main}>
      <EditProfileForm ownId={ownId} />
    </div>
  );
};

export default EditProfile;
