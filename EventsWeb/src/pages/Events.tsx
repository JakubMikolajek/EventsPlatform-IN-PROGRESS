import React from "react";
import { fetchEvents } from "../hooks/fetchEvents.tsx";
import EventsList from "../components/lists/EventsList.tsx";
import CategoryList from "../components/lists/CategoryList.tsx";
import classes from "./events.module.scss";

const Events: React.FC = () => {
  const { events, isLoading }: any = fetchEvents(true);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const events_sort_by_date = events.sort((a: any, b: any) => {
    const date_a: any = new Date(a.event_date);
    const date_b: any = new Date(b.event_date);

    return date_a - date_b;
  });

  const open_events = events_sort_by_date.filter((event: any) => {
    const currentDate = new Date();
    const e_date: any = new Date(event.event_date);
    return e_date >= currentDate;
  });

  // const close_events = events_sort_by_date
  //     .filter((event: any) => {
  //         const currentDate = new Date();
  //         const e_date: any = new Date(event.event_date);
  //         return e_date <= currentDate;
  //     })
  //     .reverse();

  const categories = events.map((event: any) => {
    return event.event_category;
  });

  const uniqueCategories = [...new Set(categories)];

  return (
    <div className={classes.main}>
      <EventsList events={open_events} name="Najbliższe wydarzenia" />
      <CategoryList category={uniqueCategories} name="Kategorie" />
      {/*<EventsList events={close_events} name="Zakończone wydarzenia" />*/}
    </div>
  );
};

export default Events;
