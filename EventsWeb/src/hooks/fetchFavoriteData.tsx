import { useQuery } from "@tanstack/react-query";
import { getAllFavoriteData } from "../supabase/api/events.ts";

export const fetchFavoriteData = (id: string, enabled: boolean) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["favorite_events", id],
    () => getAllFavoriteData(id),
    { enabled: enabled }
  );

  const postFavoriteData = data?.data;

  return { postFavoriteData, isLoading, isFetching, refetch };
};
