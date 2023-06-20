import React, { useState } from "react";
import classes from "./eventsList.module.scss";
import EventListElement from "./EventListElement.tsx";
import { EventProps } from "../../utils/types/types.ts";
import ArrowsWrapper from "../others/ArrowsWrapper.tsx";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";

interface EventsListProps {
  events: EventProps[] | undefined;
  name: string;
  description?: string;
}

const EventsList: React.FC<EventsListProps> = ({
  events,
  name,
  description,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const isDark = useSelector((state: StateProps) => state.theme.isDark);

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
  const displayedEvents = events?.slice(startIndex, endIndex);

  if (events?.length === 0) {
    return (
      <div className={classes.mainEvents}>
        <h1 className={isDark ? classes.title_dark : classes.title_light}>
          {name}:
        </h1>
        <p
          className={
            isDark ? classes.description_dark : classes.description_light
          }
        >
          {description}
        </p>
      </div>
    );
  }

  return (
    <div className={classes.mainEvents}>
      <h1 className={isDark ? classes.title_dark : classes.title_light}>
        {name}:
      </h1>
      {events && (
        <ArrowsWrapper
          elementLength={events.length}
          startIndex={startIndex}
          endIndex={endIndex}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        >
          <div className={classes.list}>
            {displayedEvents?.map((event: EventProps) => {
              return <EventListElement event={event} />;
            })}
          </div>
        </ArrowsWrapper>
      )}
    </div>
  );
};

export default EventsList;
