import {useQuery} from "@tanstack/react-query";
import {getSingleUserData} from "../supabase/requests/users";

export const useFetchSingleUser = (uuid: string, enabled: boolean) => {
    const {data, isLoading, isFetching, refetch} = useQuery(
        ["user", uuid],
        () => getSingleUserData(uuid),
        {enabled: enabled}
    );
    const user = data?.data;

    return {user, isLoading, isFetching, refetch};
};
