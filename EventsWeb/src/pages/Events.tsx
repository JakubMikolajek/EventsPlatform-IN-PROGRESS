import React from "react";
import { fetchEvents } from "../hooks/fetchEvents.tsx";
import EventsList from "../components/lists/EventsList.tsx";
import CategoryList from "../components/lists/CategoryList.tsx";
import classes from "./events.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../store/store.ts";
import { fetchEventsWithTickets } from "../hooks/fetchEventsWithTickets.tsx";
import {
  getCategoriesOfEvents,
  getOpenEvents,
} from "../utils/functions/sortEvents.ts";
import Loading from "../components/others/Loading.tsx";
import { FetchEventsProps } from "../utils/types/types.ts";

const Events: React.FC = () => {
  const isAuth: boolean = useSelector((state: StateProps) => state.auth.isAuth);
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );

  let events_with_tickets;
  let tickets_isLoading;

  const { events, isLoading: events_isLoading }: FetchEventsProps =
    fetchEvents(true);

  if (typeof ownId !== "undefined") {
    const { events, isLoading } = fetchEventsWithTickets(ownId, true);
    events_with_tickets = events;
    tickets_isLoading = isLoading;
  }

  if (events_isLoading || tickets_isLoading) {
    return <Loading />;
  }

  const open_events = getOpenEvents(events);
  const uniqueCategories = getCategoriesOfEvents(events);

  // const close_events = events_sort_by_date
  //     .filter((event: any) => {
  //         const currentDate = new Date();
  //         const e_date: any = new Date(event.event_date);
  //         return e_date <= currentDate;
  //     })
  //     .reverse();

  return (
    <div className={classes.main}>
      {isAuth && (
        <EventsList
          events={events_with_tickets}
          name="Wydarzenia w których bierzesz udział"
        />
      )}
      <EventsList events={open_events} name="Najbliższe wydarzenia" />
      <CategoryList category={uniqueCategories} name="Kategorie" />
      {/*<EventsList events={close_events} name="Zakończone wydarzenia" />*/}
    </div>
  );
};

export default Events;
