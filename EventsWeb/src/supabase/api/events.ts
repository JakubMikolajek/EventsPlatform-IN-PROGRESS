import { supabaseClient } from "../supabase.ts";

//Get All Events Data
export const getEventsData = async () =>
  await supabaseClient.from("events").select("*").is("archived_at", null);

//Get list of events with User Tickets
export const getEventsWithTicketsData = async () =>
  await supabaseClient.from("events").select("*, event_tickets(*)");

//Get All Events of Category
export const getEventsDataByCategory = async (category: string) =>
  await supabaseClient
    .from("events")
    .select("*")
    .is("archived_at", null)
    .eq("event_category", category);

//Get Event Details
export const getSingleEvent = async (id: string) =>
  await supabaseClient
    .from("events")
    .select("*, event_tickets(*), comments(*)")
    .eq("id", id)
    .single();

//Create Event
export const createEvent = async (
  title: string,
  description: string,
  event_date: string,
  event_location: string,
  event_category: string,
  tickets_number: number,
  image_url: string | undefined
) =>
  await supabaseClient
    .from("events")
    .insert({
      title: title,
      description: description,
      event_date: event_date,
      event_location: event_location,
      event_category: event_category,
      tickets_number: tickets_number,
      image_url: image_url,
    })
    .limit(1)
    .single();

//Create Ticket
export const createTicket = async (id: number) =>
  await supabaseClient
    .from("event_tickets")
    .insert({ event_id: id })
    .limit(1)
    .single();

//Delete Event
export const deleteEvent = async (id: number) =>
  await supabaseClient
    .from("events")
    .update({
      archived_at: new Date().toISOString(),
    })
    .eq("id", id);
