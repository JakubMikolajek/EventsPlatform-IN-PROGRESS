import React from "react";
import { useParams } from "react-router-dom";

const EventDetail: React.FC = () => {
  const params = useParams();
  return (
    <div>
      <h1>{params.eventId}</h1>
    </div>
  );
};

export default EventDetail;
