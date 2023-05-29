import { useQuery } from "@tanstack/react-query";
import { getEventsWithTicketsData } from "../supabase/api/events.ts";

export const fetchEventsWithTickets = (id: string, enabled: boolean) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["events_tickets"],
    () => getEventsWithTicketsData(id),
    { enabled: enabled }
  );
  const events = data?.data?.map((event: any) => {
    return {
      title: event.events.title,
      image_url: event.events.image_url,
      event_location: event.events.event_location,
      event_date: event.events.event_date,
      id: event.events.id,
    };
  });

  return { events, isLoading, isFetching, refetch };
};
