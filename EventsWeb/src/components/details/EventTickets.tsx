import React from "react";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";
import AddTicket from "./AddTicket.tsx";
import DeleteEvent from "./DeleteEvent.tsx";
import Button from "../buttons/Button.tsx";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { addToFavorite, removeToFavorite } from "../../supabase/api/events.ts";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface EventTicketsProps {
  creator_uuid: string | null | undefined;
  event_detail: any;
  refetch_event: any;
  favorite_data: any;
  refetch_favorite: any;
}

const EventTickets: React.FC<EventTicketsProps> = ({
  creator_uuid,
  event_detail,
  refetch_event,
  favorite_data,
  refetch_favorite,
}) => {
  const client: QueryClient = useQueryClient();
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );
  const addedToFavorite = favorite_data.find(
    (data: any) => data.creator_uuid === ownId
  );

  let removeToFavoriteMutation: UseMutationResult<
    PostgrestSingleResponse<null>,
    unknown,
    void
  >;

  const addToFavoriteMutation = useMutation({
    mutationFn: () => addToFavorite(event_detail.id),
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["favorite_events"]);
      await client.invalidateQueries(["favorite_events", event_detail.id]);
      await refetch_favorite();
    },
  });

  if (typeof ownId !== "undefined") {
    removeToFavoriteMutation = useMutation({
      mutationFn: () => removeToFavorite(ownId),
      onError: () => {
        console.log("Error");
      },
      onSuccess: async () => {
        await client.invalidateQueries(["favorite_events"]);
        await client.invalidateQueries(["favorite_events", event_detail.id]);
        await refetch_favorite();
      },
    });
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "16px" }}>
        {addedToFavorite ? (
          <Button
            title="Usuń z ulubionych"
            isAlt={true}
            onClick={() => removeToFavoriteMutation.mutate()}
          />
        ) : (
          <Button
            title="Dodaj do ulubionych"
            isAlt={true}
            onClick={() => addToFavoriteMutation.mutate()}
          />
        )}
      </div>
      {creator_uuid === ownId ? (
        <DeleteEvent ownId={ownId} event_detail={event_detail} />
      ) : (
        <AddTicket
          ownId={ownId}
          event_detail={event_detail}
          refetch={refetch_event}
        />
      )}
    </div>
  );
};

export default EventTickets;
