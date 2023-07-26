import {useQuery} from "@tanstack/react-query";
import {getEventsDetailsData} from "../supabase/requests/events";

export const useFetchEventDetails = (id: number, enabled: boolean) => {
    const {data, isLoading, isFetching, refetch} = useQuery(
        ["events", id],
        () => getEventsDetailsData(id),
        {
            enabled: enabled
        }
    )
    const event = data?.data

    return {event, isLoading, isFetching, refetch}
}
