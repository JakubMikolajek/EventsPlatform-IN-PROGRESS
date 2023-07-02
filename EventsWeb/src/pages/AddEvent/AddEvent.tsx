import React from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";

import AddEventForm from "../../components/Forms/AddEventForm/AddEventForm.tsx";
import BackButton from "../../components/Buttons/BackButton/BackButton.tsx";

import classes from "./addEvent.module.scss";

import { StateProps } from "../../store/store.ts";

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
