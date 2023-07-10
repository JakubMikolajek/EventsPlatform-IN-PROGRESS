import {supabaseClient} from "../supabase";

//Get all Events
export const getAllEventsData = async () => await supabaseClient
    .from("events")
    .select("*")
    .is("archived_at", null)

//Get list of events with User Tickets
export const getEventsWithTicketsData = async (ownId: string) =>
    await supabaseClient
        .from("events")
        .select("*, event_tickets(*)")
        .neq("creator_uuid", ownId);
