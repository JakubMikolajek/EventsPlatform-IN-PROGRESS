import {useQuery} from "@tanstack/react-query";
import {getAllEventsData} from "../supabase/requests/events";

export const useFetchEvent = (enabled: boolean) => {
    const {data, isLoading, isFetching, refetch} = useQuery(
        ["events"],
        () => getAllEventsData(),
        {enabled: enabled}
    )
    const events = data?.data

    return {events, isLoading, isFetching, refetch}
}
