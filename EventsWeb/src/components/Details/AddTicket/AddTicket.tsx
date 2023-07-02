import React from "react";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useSelector } from "react-redux";

import Button from "../../Buttons/Button/Button.tsx";

import classes from "./addTicket.module.scss";

import { StateProps } from "../../../store/store.ts";
import { createTicket } from "../../../supabase/requests/events.ts";

interface AddTicketProps {
  ownId: string | undefined;
  event_detail: any;
  refetch: any;
}

const AddTicket: React.FC<AddTicketProps> = ({
  ownId,
  event_detail,
  refetch,
}) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  const client: QueryClient = useQueryClient();
  let createTicketMutation: UseMutationResult<
    PostgrestSingleResponse<never>,
    unknown,
    void
  >;

  if (typeof event_detail?.id !== "undefined") {
    createTicketMutation = useMutation({
      mutationFn: () => createTicket(event_detail.id),
      onError: () => {
        console.log("Error");
      },
      onSuccess: async () => {
        await client.invalidateQueries(["events", event_detail.id]);
        await client.invalidateQueries(["users"]);
        await client.invalidateQueries(["tickets"]);
        await refetch();
      },
    });
  }

  const event_tickets: any = event_detail?.event_tickets;
  const ownTicket = event_tickets.find(
    (ticket: any): boolean => ticket.ticket_owner === ownId
  );

  return (
    <div
      className={
        isDark ? classes.main_container_dark : classes.main_container_light
      }
    >
      {ownTicket ? (
        <h3>Bierzesz udział w wydarzeniu!!!</h3>
      ) : (
        <Button
          title="Weź udział"
          isAlt={true}
          onClick={() => createTicketMutation.mutate()}
        />
      )}
      <h3>
        W wydarzeniu bierze udział: {event_tickets.length}/
        {event_detail?.tickets_number}
      </h3>
    </div>
  );
};

export default AddTicket;
