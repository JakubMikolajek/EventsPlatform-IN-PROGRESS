import { useQuery } from "@tanstack/react-query";
import { getSingleEvent } from "../supabase/api/events.ts";

export const fetchEventDetail = (id: string, enabled: boolean) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["events", id],
    () => getSingleEvent(id),
    {
      enabled: enabled,
    }
  );

  const event = data?.data;

  return { event, isLoading, isFetching, refetch };
};
