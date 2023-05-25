import React, { useState } from "react";
import * as moment from "moment/moment";
import classes from "./eventsList.module.scss";
import { Link } from "react-router-dom";

interface EventsListProps {
  events: any;
  name: string;
}

const EventsList: React.FC<EventsListProps> = ({ events, name }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const elementPerPage: number = 5;
  const shiftAmount: number = 1;

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * shiftAmount;
  const endIndex = startIndex + elementPerPage;
  const displayedEvents = events.slice(startIndex, endIndex);

  return (
    <div className={classes.mainEvents}>
      <h1 className={classes.title}>{name}:</h1>
      <div className={classes.list}>
        {startIndex >= 1 && (
          <button className={classes.arrow_left} onClick={handlePreviousPage}>
            &larr;
          </button>
        )}
        {displayedEvents.map((event: any) => {
          const e_date: moment.Moment = moment(event.event_date);
          const date_format: string = e_date.format("DD-MM-YYYY");
          const time: string = e_date.format("HH:mm");
          const date: string = [date_format, time].join(" ");

          return (
            <div className={classes.list_element} key={event.id}>
              <Link className={classes.textDecoration} to={`event/${event.id}`}>
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
        })}
        {endIndex < events.length && (
          <button className={classes.arrow_right} onClick={handleNextPage}>
            &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

export default EventsList;
