import React from "react";
import AddEventForm from "../components/forms/AddEventForm.tsx";
import classes from "./addEvent.module.scss";
import BackButton from "../components/buttons/BackButton.tsx";
import { NavigateFunction, useNavigate } from "react-router-dom";

const AddEvent: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div className={classes.mainContainer}>
      <div>
        <BackButton onClick={() => navigate(-1)} />
      </div>
      <div className={classes.innerContainer}>
        <div className={classes.formContainer}>
          <h1>Utwórz własne wydarzenie</h1>
          <AddEventForm />
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
