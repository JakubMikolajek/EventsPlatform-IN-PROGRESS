import React, { useState } from "react";
import * as moment from "moment/moment";
import classes from "./lists.module.scss";
import { Link } from "react-router-dom";

interface EventsListProps {
  events: any;
  name: string;
}

const EventsList: React.FC<EventsListProps> = ({ events, name }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const elementPerPage: number = 5;
  const totalPages: number = Math.ceil(events.length / elementPerPage);
  const mapedEvents = events.map((event: any) => {
    const e_date = moment(event.event_date);
    const date_format = e_date.format("YYYY-MM-DD");
    const time = e_date.format("HH:mm");

    return {
      event_date: [date_format, time].join(" "),
      id: event.id,
      image_url: event.image_url,
      title: event.title,
      event_location: event.event_location,
    };
  });

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * elementPerPage;
  const endIndex = startIndex + elementPerPage;
  const displayedEvents = mapedEvents.slice(startIndex, endIndex);

  return (
    <div className={classes.mainEvents}>
      <h1 className={classes.title}>{name}:</h1>
      <div className={classes.list}>
        {currentPage > 1 && (
          <button className={classes.arrow_left} onClick={handlePreviousPage}>
            &larr;
          </button>
        )}
        {displayedEvents.map((event: any) => (
          // <Link to={`${event.id}`}>
          <Link
            to={`${event.id}`}
            className={classes.list_element}
            key={event.id}
          >
            <div className={classes.imgContainer}>
              <img src={event.image_url} alt={event.image_url} />
            </div>
            <h2>{event.title}</h2>
            <h3>
              {event.event_location}, {event.event_date}
            </h3>
          </Link>
          // </Link>
        ))}
        {currentPage < totalPages && (
          <button className={classes.arrow_right} onClick={handleNextPage}>
            &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

export default EventsList;
