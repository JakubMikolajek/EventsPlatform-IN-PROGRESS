import React from "react";
import AddEventForm from "../components/forms/AddEventForm.tsx";
import classes from "./addEvent.module.scss";

const AddEvent: React.FC = () => {
  return (
    <div className={classes.main}>
      <AddEventForm />
    </div>
  );
};

export default AddEvent;
