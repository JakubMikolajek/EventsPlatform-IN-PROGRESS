import React from "react";
import AddEventForm from "../components/forms/AddEventForm.tsx";
import classes from "./addEvent.module.scss";
import BackButton from "../components/buttons/BackButton.tsx";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateProps } from "../store/store.ts";

const AddEvent: React.FC = () => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  const navigate: NavigateFunction = useNavigate();
  return (
    <div className={classes.main_container}>
      <div>
        <BackButton onClick={() => navigate(-1)} />
      </div>
      <div className={classes.inner_container}>
        <div
          className={
            isDark ? classes.form_container_dark : classes.form_container_light
          }
        >
          <h1>Utwórz własne wydarzenie</h1>
          <AddEventForm />
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
