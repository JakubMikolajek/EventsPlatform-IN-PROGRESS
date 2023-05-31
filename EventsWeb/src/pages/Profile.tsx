import React from "react";
import UserInfo from "../components/profile/UserInfo.tsx";
import classes from "./profile.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../store/store.ts";
import { fetchEventsWithTickets } from "../hooks/fetchEventsWithTickets.tsx";
import EventsList from "../components/lists/EventsList.tsx";
import { fetchEvents } from "../hooks/fetchEvents.tsx";
import { getOpenEvents } from "../utils/functions/sortEvents.ts";
import { EventProps, FetchEventsProps } from "../utils/types/types.ts";

const Profile: React.FC = () => {
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );

  let events_with_tickets;

  const { events }: FetchEventsProps = fetchEvents(false);

  if (typeof ownId !== "undefined") {
    const { events }: FetchEventsProps = fetchEventsWithTickets(ownId, false);
    events_with_tickets = events;
  }

  const open_events = getOpenEvents(events);

  const events_created_by_logged_user = open_events?.filter(
    (event: EventProps): boolean => event.creator_uuid === ownId
  );

  return (
    <div className={classes.main}>
      <UserInfo ownId={ownId} />
      <EventsList
        events={events_with_tickets}
        name="Wydarzenia w których bierzesz udział"
      />
      <EventsList
        events={events_created_by_logged_user}
        name="Wydarzenia utworzone przez ciebie"
      />
    </div>
  );
};

export default Profile;
