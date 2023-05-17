import { useQuery } from "@tanstack/react-query";
import { getEventsData } from "../supabase/api/events.ts";

export const fetchEvents = (enabled: boolean) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["events"],
    () => getEventsData(),
    { enabled: enabled }
  );
  const events = data?.data;

  return { events, isLoading, isFetching, refetch };
};
