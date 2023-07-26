import {useQuery} from "@tanstack/react-query";
import {getEventsByCategoryData} from "../supabase/requests/events";

export const useFetchEventsByCategory = (category: string, enabled: boolean) => {
    const {data, isLoading, isFetching, refetch} = useQuery(
        ["events", category],
        () => getEventsByCategoryData(category),
        {enabled: enabled}
    );
    const events = data?.data;

    return {events, isLoading, isFetching, refetch};
}
