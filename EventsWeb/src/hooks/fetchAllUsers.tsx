import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../supabase/api/user.ts";

export const fetchAllUsers = (enabled: boolean) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["users"],
    () => getAllUsers(),
    { enabled: enabled }
  );
  const users = data?.data;

  return { users, isLoading, isFetching, refetch };
};
