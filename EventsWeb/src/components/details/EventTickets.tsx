import React from "react";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";
import AddTicket from "./AddTicket.tsx";
import DeleteEvent from "./DeleteEvent.tsx";

interface EventTicketsProps {
  creator_uuid: string | null | undefined;
  event_detail: any;
  refetch: any;
}

const EventTickets: React.FC<EventTicketsProps> = ({
  creator_uuid,
  event_detail,
  refetch,
}) => {
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );

  return (
    <>
      {creator_uuid === ownId ? (
        <DeleteEvent ownId={ownId} event_detail={event_detail} />
      ) : (
        <AddTicket
          ownId={ownId}
          event_detail={event_detail}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default EventTickets;
