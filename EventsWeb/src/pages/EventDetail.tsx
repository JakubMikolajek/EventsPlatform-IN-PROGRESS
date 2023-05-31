import React from "react";
import { useParams } from "react-router-dom";
import EventDetails from "../components/details/EventDetails.tsx";
import classes from "./eventDetail.module.scss";

const EventDetail: React.FC = () => {
  const params = useParams();

  return (
    <div className={classes.main}>
      <EventDetails id={params.eventId} />
    </div>
  );
};

export default EventDetail;
