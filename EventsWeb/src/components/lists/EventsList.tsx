import React, { useState } from "react";
import classes from "./eventsList.module.scss";
import { formatDate } from "../../utils/functions/formatDate.ts";
import EventListElement from "./EventListElement.tsx";

interface EventsListProps {
  events: any;
  name: string;
}

const EventsList: React.FC<EventsListProps> = ({ events, name }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const elementPerPage: number = 5;
  const shiftAmount: number = 1;

  const handlePreviousPage = () => {
    setCurrentPage((prevPage: number) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage: number) => prevPage + 1);
  };

  const startIndex: number = (currentPage - 1) * shiftAmount;
  const endIndex: number = startIndex + elementPerPage;
  const displayedEvents = events.slice(startIndex, endIndex);

  return (
    <div className={classes.mainEvents}>
      <h1 className={classes.title}>{name}:</h1>
      <div className={classes.innerMainEvents}>
        {startIndex >= 1 && (
          <button className={classes.arrow_left} onClick={handlePreviousPage}>
            &larr;
          </button>
        )}
        <div className={classes.list}>
          {displayedEvents.map((event: any) => {
            const date: string = formatDate(event);

            return <EventListElement event={event} date={date} />;
          })}
        </div>
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
