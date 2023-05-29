import { useQuery } from "@tanstack/react-query";
import { getEventsDataByCategory } from "../supabase/api/events.ts";

export const fetchEventsByCategory = (category: string, enabled: boolean) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["events", category],
    () => getEventsDataByCategory(category),
    { enabled: enabled }
  );
  const events = data?.data;

  return { events, isLoading, isFetching, refetch };
};
