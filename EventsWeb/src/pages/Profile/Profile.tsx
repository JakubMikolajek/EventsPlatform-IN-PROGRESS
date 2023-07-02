import React from "react";
import { useSelector } from "react-redux";

import UserInfo from "../../components/Profile/UserInfo/UserInfo.tsx";
import EventsList from "../../components/Lists/EventsList/EventsList.tsx";

import classes from "./profile.module.scss";

import { StateProps } from "../../store/store.ts";
import { fetchEventsWithTickets } from "../../hooks/fetchEventsWithTickets.tsx";
import { fetchEvents } from "../../hooks/fetchEvents.tsx";
import { fetchFavoriteEvents } from "../../hooks/fetchFavoriteEvents.tsx";
import { getOpenEvents } from "../../utils/functions/sortEvents.ts";
import { EventProps, FetchEventsProps } from "../../utils/types/types.ts";

const Profile: React.FC = () => {
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );

  let events_with_tickets;
  let favorite_events;

  const { events }: FetchEventsProps = fetchEvents(false);

  if (typeof ownId !== "undefined") {
    const { events }: FetchEventsProps = fetchEventsWithTickets(ownId, false);
    events_with_tickets = events;
  }

  if (typeof ownId !== "undefined") {
    const { events }: FetchEventsProps = fetchFavoriteEvents(ownId, false);
    favorite_events = events;
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
        description="Nie bierzesz jeszcze udziału w żadnym wydarzeniu"
      />
      <EventsList
        events={favorite_events}
        name="Polubione wydarzenia"
        description="Nie polubiłeś jeszcze żadnego wydarzenia"
      />
      <EventsList
        events={events_created_by_logged_user}
        name="Wydarzenia utworzone przez ciebie"
        description="Nie utworzyłeś jeszcze żadnego wydarzenia"
      />
    </div>
  );
};

export default Profile;
