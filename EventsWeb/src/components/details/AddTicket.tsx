import React from "react";
import Button from "../buttons/Button.tsx";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createTicket } from "../../supabase/api/events.ts";
import classes from "./addTicket.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";

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
        <h2>Bierzesz udział w wydarzeniu!!!</h2>
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
