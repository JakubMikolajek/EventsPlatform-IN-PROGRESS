import React from "react";
import { useParams } from "react-router-dom";
import { fetchEventsByCategory } from "../hooks/fetchEventsByCategory.tsx";
import Loading from "../components/others/Loading.tsx";
import { EventProps, FetchEventsProps } from "../utils/types/types.ts";
import EventsByCategory from "../components/category/EventsByCategory.tsx";
import classes from "./category.module.scss";

const Category: React.FC = () => {
  const params = useParams();
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

  console.log(eventsByCategory);
  return (
    <div className={classes.main}>
      <EventsByCategory
        events={eventsByCategory}
        category={params.categoryName}
      />
    </div>
  );
};

export default Category;
