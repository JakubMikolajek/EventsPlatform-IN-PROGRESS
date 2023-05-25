import React from "react";
import Button from "../buttons/Button.tsx";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { createTicket } from "../../supabase/api/events.ts";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface EventTicketsProps {
  event_tickets: any;
  tickets_number: number | null | undefined;
  id: number | undefined;
  refetch: any;
}

const EventTickets: React.FC<EventTicketsProps> = ({
  event_tickets,
  tickets_number,
  id,
  refetch,
}) => {
  const client: QueryClient = useQueryClient();
  const ownId = useSelector((state: StateProps) => state.auth.loggedUserId);
  const ownTicket = event_tickets.find(
    (ticket: any) => ticket.ticket_owner === ownId
  );

  let createTicketMutation: UseMutationResult<
    PostgrestSingleResponse<never>,
    unknown,
    void
  >;

  if (typeof id !== "undefined") {
    createTicketMutation = useMutation({
      mutationFn: () => createTicket(id),
      onError: () => {
        console.log("Error");
      },
      onSuccess: async () => {
        await client.invalidateQueries(["events", id]);
        refetch();
      },
    });
  }

  return (
    <>
      <h3>
        Ilość zajętych miejsc: {event_tickets.length}/{tickets_number}
      </h3>
      {ownTicket ? (
        <p>Bierzesz udział</p>
      ) : (
        <Button
          title="Weź udział"
          isAlt={true}
          onClick={() => createTicketMutation.mutate()}
        />
      )}
    </>
  );
};

export default EventTickets;
