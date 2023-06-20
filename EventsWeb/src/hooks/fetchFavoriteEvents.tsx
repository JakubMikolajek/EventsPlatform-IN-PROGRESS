import { useQuery } from "@tanstack/react-query";
import { getFavoriteEvents } from "../supabase/api/events.ts";

export const fetchFavoriteEvents = (ownId: string, enabled: boolean) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["favorite_events"],
    () => getFavoriteEvents(),
    { enabled: enabled }
  );

  const userEvents = data?.data?.filter((event: any) =>
    event.favorite_events.some(
      (fav_event: any) => fav_event.creator_uuid === ownId
    )
  );

  const events = userEvents?.map((event: any) => {
    return {
      title: event.title,
      image_url: event.image_url,
      event_location: event.event_location,
      event_date: event.event_date,
      id: event.id,
      tickets_number: event.tickets_number,
      event_category: event.event_category,
      description: event.description,
      creator_uuid: event.creator_uuid,
      created_at: event.created_at,
      archived_at: event.archived_at,
    };
  });

  return { events, isLoading, isFetching, refetch };
};
