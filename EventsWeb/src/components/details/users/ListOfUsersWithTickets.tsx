import React from "react";
import { fetchAllUsers } from "../../../hooks/fetchAllUsers.tsx";
import { fetchAllTickets } from "../../../hooks/fetchAllTickets.tsx";
import UserListElement from "./UserListElement.tsx";
import classes from "./listOfUserWithTickets.module.scss";
import { sortByName } from "../../../utils/functions/sortUsers.ts";

interface ListOfUsersWithTicketsProps {
  id: number | undefined;
  creator_uuid: string | null | undefined;
}

const ListOfUsersWithTickets: React.FC<ListOfUsersWithTicketsProps> = ({
  id,
  creator_uuid,
}) => {
  let ticketsData;
  let isLoadingTickets;
  let usersWithTickets: any = [];
  const { users, isLoading: isLoadingUsers } = fetchAllUsers(true);
  if (typeof id === "number") {
    const { tickets, isLoading } = fetchAllTickets(id, true);
    ticketsData = tickets;
    isLoadingTickets = isLoading;
  }

  if (isLoadingUsers || isLoadingTickets) {
    return null;
  }
  ticketsData?.forEach((ticket: any) => {
    const matchUser = users?.find(
      (user: any) => user.uuid === ticket.ticket_owner
    );
    usersWithTickets.push(matchUser);
  });

  usersWithTickets.sort(sortByName);

  return (
    <div className={classes.mainContainer}>
      {usersWithTickets.map((user: any) => {
        return <UserListElement creator_uuid={creator_uuid} user={user} />;
      })}
    </div>
  );
};

export default ListOfUsersWithTickets;
