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

//Get Events Details
export const getEventsDetailsData = async (id: number) =>
    await supabaseClient
        .from("events")
        .select("*, event_tickets(*), comments(*)")
        .eq("id", id)
        .single()

//Get Events by Category
export const getEventsByCategoryData = async (category: string) =>
    await supabaseClient
        .from("events")
        .select("*")
        .is("archived_at", null)
        .eq("event_category", category);
