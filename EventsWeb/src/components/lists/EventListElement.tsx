import React from "react";
import classes from "./eventListElement.module.scss";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/functions/formatDate.ts";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";

interface EventListElementProps {
  event: any;
}

const EventListElement: React.FC<EventListElementProps> = ({ event }) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  const date: string = formatDate(event);
  return (
    <div className={classes.list_element} key={event.id}>
      <Link className={classes.text_decoration} to={`/events/${event.id}`}>
        <div className={classes.img_container}>
          <img src={event.image_url} alt={event.image_url} />
        </div>
        <h2 className={isDark ? classes.text_dark : classes.text_light}>
          {event.title}
        </h2>
        <p className={isDark ? classes.text_dark : classes.text_light}>
          {event.event_location}, {date}
        </p>
      </Link>
    </div>
  );
};

export default EventListElement;
