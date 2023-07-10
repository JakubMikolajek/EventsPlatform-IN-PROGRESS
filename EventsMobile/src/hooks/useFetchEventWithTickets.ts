import {useQuery} from "@tanstack/react-query";
import {getEventsWithTicketsData} from "../supabase/requests/events";

export const useFetchEventWithTickets = (ownId: string, enabled: boolean) => {
    const {data, isLoading, isFetching, refetch} = useQuery(
        ["events_tickets"],
        () => getEventsWithTicketsData(ownId),
        {enabled: enabled}
    );
    const userEvents = data?.data?.filter((event: any) =>
        event.event_tickets.some((ticket: any) => ticket.ticket_owner === ownId)
    );

    const events = userEvents?.map((event: any) => {
        return {
            title: event.title,
            image_url: event.image_url,
            event_location: event.event_location,
            event_date: event.event_date,
            id: event.id,
            tickets_number: event.tickets_number,
            event_category: event.event_category,
            description: event.description,
            creator_uuid: event.creator_uuid,
            created_at: event.created_at,
            archived_at: event.archived_at,
        };
    });
    return {events, isLoading, isFetching, refetch};
};
