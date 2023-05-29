import React from "react";
import classes from "./eventListElement.module.scss";
import { Link } from "react-router-dom";

interface EventListElementProps {
  event: any;
  date: string;
}

const EventListElement: React.FC<EventListElementProps> = ({ event, date }) => {
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
