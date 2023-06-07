import { useQuery } from "@tanstack/react-query";
import { getAllTickets } from "../supabase/api/events.ts";

export const fetchAllTickets = (id: number, enabled: boolean) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["tickets"],
    () => getAllTickets(id),
    { enabled: enabled }
  );
  const tickets = data?.data;

  return { tickets, isLoading, isFetching, refetch };
};
