import React from "react";
import { useParams } from "react-router-dom";
import EventDetails from "../components/details/EventDetails.tsx";

const EventDetail: React.FC = () => {
  const params = useParams();

  return (
    <div>
      <EventDetails id={params.eventId} />
    </div>
  );
};

export default EventDetail;
