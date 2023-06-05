import React from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { fetchEventsByCategory } from "../hooks/fetchEventsByCategory.tsx";
import Loading from "../components/others/Loading.tsx";
import { EventProps, FetchEventsProps } from "../utils/types/types.ts";
import classes from "./category.module.scss";
import BackButton from "../components/buttons/BackButton.tsx";
import EventListElement from "../components/lists/EventListElement.tsx";

const Category: React.FC = () => {
  const params = useParams();
  const navigate: NavigateFunction = useNavigate();
  let eventsByCategory: EventProps[] | null | undefined;
  let eventsByCategoryIsLoading: boolean | undefined;

  if (typeof params.categoryName !== "undefined") {
    const { events, isLoading }: FetchEventsProps = fetchEventsByCategory(
      params.categoryName,
      true
    );
    eventsByCategory = events;
    eventsByCategoryIsLoading = isLoading;
  }

  if (eventsByCategoryIsLoading) {
    return <Loading />;
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.categoryContainer}>
        <h1>Kategoria: {params.categoryName}</h1>
        <BackButton onClick={() => navigate(-1)} />
      </div>
      <div className={classes.eventsContainer}>
        {eventsByCategory?.map((event: EventProps) => (
          <EventListElement event={event} />
        ))}
      </div>
    </div>
  );
};

export default Category;
