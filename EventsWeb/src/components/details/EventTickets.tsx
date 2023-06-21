import React from "react";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";
import AddTicket from "./AddTicket.tsx";
import DeleteEvent from "./DeleteEvent.tsx";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { addToFavorite, removeToFavorite } from "../../supabase/api/events.ts";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as FullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as EmptyStar } from "@fortawesome/free-regular-svg-icons";
import classes from "./eventTickets.module.scss";

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
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
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
    <div className={classes.main_container}>
      <div
        className={
          isDark ? classes.inner_container_dark : classes.inner_container_light
        }
      >
        {addedToFavorite ? (
          <FontAwesomeIcon
            className={classes.full_icon}
            icon={FullStar}
            size="2xl"
            onClick={() => removeToFavoriteMutation.mutate()}
          />
        ) : (
          <FontAwesomeIcon
            className={classes.empty_icon}
            icon={EmptyStar}
            size="2xl"
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
