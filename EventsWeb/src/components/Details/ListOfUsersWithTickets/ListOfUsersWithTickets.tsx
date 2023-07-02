import React from "react";
import { useSelector } from "react-redux";

import UserListElement from "../UserListElement/UserListElement.tsx";

import classes from "./listOfUsersWithTickets.module.scss";

import { StateProps } from "../../../store/store.ts";
import { fetchAllUsers } from "../../../hooks/fetchAllUsers.tsx";
import { fetchAllTickets } from "../../../hooks/fetchAllTickets.tsx";
import { sortByName } from "../../../utils/functions/sortUsers.ts";

interface ListOfUsersWithTicketsProps {
  id: number | undefined;
  creator_uuid: string | null | undefined;
}

const ListOfUsersWithTickets: React.FC<ListOfUsersWithTicketsProps> = ({
  id,
  creator_uuid,
}) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  let ticketsData;
  let isLoadingTickets;
  let usersWithTickets: any = [];
  const { users, isLoading: isLoadingUsers } = fetchAllUsers(true);
  if (typeof id === "number") {
    const { tickets, isLoading } = fetchAllTickets(id, true);
    ticketsData = tickets;
    isLoadingTickets = isLoading;
  }

  const isLoading = isLoadingUsers || isLoadingTickets;

  ticketsData?.forEach((ticket: any) => {
    const matchUser = users?.find(
      (user: any) => user.uuid === ticket.ticket_owner
    );
    usersWithTickets.push(matchUser);
  });

  usersWithTickets.sort(sortByName);

  return (
    <>
      {isLoading ? null : (
        <div
          className={
            isDark ? classes.main_container_dark : classes.main_container_light
          }
        >
          <h1>Lista uczestników:</h1>
          {usersWithTickets.map((user: any) => (
            <UserListElement creator_uuid={creator_uuid} user={user} />
          ))}
        </div>
      )}
    </>
  );
};

export default ListOfUsersWithTickets;
