import React from "react";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";
import AddTicket from "./AddTicket.tsx";
import DeleteEvent from "./DeleteEvent.tsx";

interface EventTicketsProps {
  id_Str: string | undefined;
  id_Num: number | undefined;
  creator_uuid: string | null | undefined;
}

const EventTickets: React.FC<EventTicketsProps> = ({
  id_Str,
  id_Num,
  creator_uuid,
}) => {
  const ownId: string | undefined = useSelector(
    (state: StateProps) => state.auth.loggedUserId
  );

  return (
    <>
      {creator_uuid === ownId ? (
        <DeleteEvent id_Num={id_Num} ownId={ownId} />
      ) : (
        <AddTicket id_Str={id_Str} id_Num={id_Num} />
      )}
    </>
  );
};

export default EventTickets;
