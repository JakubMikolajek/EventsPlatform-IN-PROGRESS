import React from "react";
import AddEventForm from "../components/forms/AddEventForm.tsx";
import classes from "./addEvent.module.scss";

const AddEvent: React.FC = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.formContainer}>
        <h1>Utwórz własne wydarzenie</h1>
        <AddEventForm />
      </div>
    </div>
  );
};

export default AddEvent;
