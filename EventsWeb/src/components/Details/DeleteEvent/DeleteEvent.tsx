import React from "react";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../../Buttons/Button/Button.tsx";

import classes from "./deleteEvent.module.scss";

import { StateProps } from "../../../store/store.ts";
import { fetchEvents } from "../../../hooks/fetchEvents.tsx";
import { FetchEventsProps } from "../../../utils/types/types.ts";
import { deleteEvent } from "../../../supabase/requests/events.ts";

interface DeleteEventProps {
  event_detail: any;
  ownId: string | undefined;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ event_detail, ownId }) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
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
    <div
      className={
        isDark ? classes.main_container_dark : classes.main_container_light
      }
    >
      <Button
        title="Usuń event"
        isAlt={true}
        onClick={() => deleteEventMutation.mutate()}
      />
      <h3>
        W wydarzeniu bierze udział: {event_tickets.length}/
        {event_detail?.tickets_number}
      </h3>
    </div>
  );
};

export default DeleteEvent;
