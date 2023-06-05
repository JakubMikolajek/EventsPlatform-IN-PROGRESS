import React from "react";
import Button from "../buttons/Button.tsx";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { deleteEvent } from "../../supabase/api/events.ts";
import { FetchEventsProps } from "../../utils/types/types.ts";
import { fetchEvents } from "../../hooks/fetchEvents.tsx";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface DeleteEventProps {
  event_detail: any;
  ownId: string | undefined;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ event_detail, ownId }) => {
  const client: QueryClient = useQueryClient();
  const navigate: NavigateFunction = useNavigate();
  let deleteEventMutation: UseMutationResult<
    PostgrestSingleResponse<null>,
    unknown,
    void
  >;

  const { refetch }: FetchEventsProps = fetchEvents(false);

  if (typeof ownId !== "undefined" && typeof event_detail?.id !== "undefined") {
    deleteEventMutation = useMutation({
      mutationFn: () => deleteEvent(event_detail.id),
      onError: () => {
        console.log("Error");
      },
      onSuccess: async () => {
        await client.invalidateQueries(["events"]);
        await navigate(-1);
        await refetch();
      },
    });
  }

  const event_tickets: any = event_detail?.event_tickets;

  return (
    <>
      <h3>
        W wydarzeniu bierze udział: {event_tickets.length}/
        {event_detail?.tickets_number}
      </h3>
      <Button
        title="Usuń event"
        isAlt={true}
        onClick={() => deleteEventMutation.mutate()}
      />
    </>
  );
};

export default DeleteEvent;
