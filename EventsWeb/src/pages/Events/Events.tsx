import React from "react";
import { useSelector } from "react-redux";

import EventsList from "../../components/Lists/EventsList/EventsList.tsx";
import CategoryList from "../../components/Lists/CategoryList/CategoryList.tsx";
import Loading from "../../components/Navigation/Loading/Loading.tsx";

import classes from "./events.module.scss";

import { StateProps } from "../../store/store.ts";
import { fetchEvents } from "../../hooks/fetchEvents.tsx";
import { fetchEventsWithTickets } from "../../hooks/fetchEventsWithTickets.tsx";
import { fetchFavoriteEvents } from "../../hooks/fetchFavoriteEvents.tsx";
import {
  getCategoriesOfEvents,
  getOpenEvents,
} from "../../utils/functions/sortEvents.ts";
import { FetchEventsProps } from "../../utils/types/types.ts";

const Events: React.FC = () => {
  const isAuth: boolean = useSelector((state: StateProps) => state.auth.isAuth);
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );

  let events_with_tickets;
  let tickets_isLoading;
  let favorite_isLoading;

  const { events, isLoading: events_isLoading }: FetchEventsProps =
    fetchEvents(true);

  if (typeof ownId !== "undefined") {
    const { events, isLoading }: FetchEventsProps = fetchEventsWithTickets(
      ownId,
      true
    );
    events_with_tickets = events;
    tickets_isLoading = isLoading;
  }

  if (typeof ownId !== "undefined") {
    const { isLoading }: FetchEventsProps = fetchFavoriteEvents(ownId, true);
    favorite_isLoading = isLoading;
  }

  const isLoading = events_isLoading || tickets_isLoading || favorite_isLoading;

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
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={classes.main}>
          <EventsList events={open_events} name="Najbliższe wydarzenia" />
          {isAuth && (
            <EventsList
              events={events_with_tickets}
              name="Wydarzenia w których bierzesz udział"
              description="Nie bierzesz jeszcze udziału w żadnym wydarzeniu"
            />
          )}
          <CategoryList category={uniqueCategories} name="Kategorie" />
          {/*<EventsList events={close_events} name="Zakończone wydarzenia" />*/}
        </div>
      )}
    </>
  );
};

export default Events;
