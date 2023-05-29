import React from "react";
import AddEventForm from "../components/forms/AddEventForm.tsx";
import classes from "./addEvent.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../store/store.ts";

const AddEvent: React.FC = () => {
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );
  return (
    <div className={classes.main}>
      <AddEventForm ownId={ownId} />
    </div>
  );
};

export default AddEvent;
