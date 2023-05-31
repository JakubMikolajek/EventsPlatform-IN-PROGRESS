import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import EventListElement from "../lists/EventListElement.tsx";
import BackButton from "../buttons/BackButton.tsx";
import classes from "./eventsByCategory.module.scss";
import { EventProps } from "../../utils/types/types.ts";

interface EventsByCategoryProps {
  events: EventProps[] | null | undefined;
  category: string | undefined;
}

const EventsByCategory: React.FC<EventsByCategoryProps> = ({
  events,
  category,
}) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className={classes.main}>
      <div className={classes.categoryContainer}>
        <h1>Kategoria: {category}</h1>
        <BackButton onClick={() => navigate(-1)} />
      </div>
      <div className={classes.eventsContainer}>
        {events?.map((event: EventProps) => (
          <EventListElement event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsByCategory;
