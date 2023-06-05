import React from "react";
import Button from "../buttons/Button.tsx";
import { fetchEventDetail } from "../../hooks/fetchEventDetail.tsx";
import Loading from "../others/Loading.tsx";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createTicket } from "../../supabase/api/events.ts";

interface AddTicketProps {
  id_Str: string | undefined;
  id_Num: number | undefined;
}

const AddTicket: React.FC<AddTicketProps> = ({ id_Str, id_Num }) => {
  const client: QueryClient = useQueryClient();
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );
  let event_detail;
  let refetch_event: any;
  let createTicketMutation: UseMutationResult<
    PostgrestSingleResponse<never>,
    unknown,
    void
  >;

  if (typeof id_Str !== "undefined") {
    const { event, isLoading, refetch } = fetchEventDetail(id_Str, true);
    if (isLoading) {
      return <Loading />;
    }
    event_detail = event;
    refetch_event = refetch;
  }

  if (typeof id_Num !== "undefined") {
    createTicketMutation = useMutation({
      mutationFn: () => createTicket(id_Num),
      onError: () => {
        console.log("Error");
      },
      onSuccess: async () => {
        await client.invalidateQueries(["events", id_Num]);
        await refetch_event();
      },
    });
  }

  const event_tickets: any = event_detail?.event_tickets;
  const ownTicket = event_tickets.find(
    (ticket: any): boolean => ticket.ticket_owner === ownId
  );

  return (
    <>
      <h3>
        Ilość zajętych miejsc: {event_tickets.length}/
        {event_detail?.tickets_number}
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

export default AddTicket;
