import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import EventListElement from "../EventListElement/EventListElement.tsx";
import ArrowsWrapper from "../../Others/ArrowsWrapper/ArrowsWrapper.tsx";

import classes from "./eventsList.module.scss";

import { StateProps } from "../../../store/store.ts";
import { EventProps } from "../../../utils/types/types.ts";

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
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const isDark = useSelector((state: StateProps) => state.theme.isDark);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  console.log(windowWidth);

  let elementPerPage: number;

  if (windowWidth < 600) {
    elementPerPage = 1;
  } else if (windowWidth >= 600 && windowWidth < 992) {
    elementPerPage = 2;
  } else if (windowWidth >= 992 && windowWidth < 1200) {
    elementPerPage = 3;
  } else {
    elementPerPage = 5;
  }

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
