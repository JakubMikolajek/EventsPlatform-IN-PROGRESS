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
  id_Num: number | undefined;
  ownId: string | undefined;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ id_Num, ownId }) => {
  const client: QueryClient = useQueryClient();
  const navigate: NavigateFunction = useNavigate();
  let deleteEventMutation: UseMutationResult<
    PostgrestSingleResponse<null>,
    unknown,
    void
  >;

  const { refetch }: FetchEventsProps = fetchEvents(true);

  if (typeof ownId !== "undefined" && typeof id_Num !== "undefined") {
    deleteEventMutation = useMutation({
      mutationFn: () => deleteEvent(id_Num),
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
  return (
    <Button
      title="Usuń event"
      isAlt={true}
      onClick={() => deleteEventMutation.mutate()}
    />
  );
};

export default DeleteEvent;
