import React from "react";
import classes from "./eventListElement.module.scss";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/functions/formatDate.ts";

interface EventListElementProps {
  event: any;
}

const EventListElement: React.FC<EventListElementProps> = ({ event }) => {
  const date: string = formatDate(event);
  return (
    <div className={classes.list_element} key={event.id}>
      <Link className={classes.textDecoration} to={`/events/${event.id}`}>
        <div className={classes.imgContainer}>
          <img src={event.image_url} alt={event.image_url} />
        </div>
        <h2>{event.title}</h2>
        <h3>
          {event.event_location}, {date}
        </h3>
      </Link>
    </div>
  );
};

export default EventListElement;
