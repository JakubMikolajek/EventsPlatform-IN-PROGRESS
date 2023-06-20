import { supabaseClient } from "../supabase.ts";

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

//Delete Event
export const deleteEvent = async (id: number) =>
  await supabaseClient
    .from("events")
    .update({
      archived_at: new Date().toISOString(),
    })
    .eq("id", id);

//Get All Events Data
export const getEventsData = async () =>
  await supabaseClient.from("events").select("*").is("archived_at", null);

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

//Create Ticket
export const createTicket = async (id: number) =>
  await supabaseClient
    .from("event_tickets")
    .insert({ event_id: id })
    .limit(1)
    .single();

//Get list of events with User Tickets
export const getEventsWithTicketsData = async (ownId: string) =>
  await supabaseClient
    .from("events")
    .select("*, event_tickets(*)")
    .neq("creator_uuid", ownId);

//Get all tickets
export const getAllTickets = async (id: number) =>
  await supabaseClient.from("event_tickets").select("*").eq("event_id", id);

//Create Comment
export const createComment = async (id: number, body: string) =>
  await supabaseClient
    .from("comments")
    .insert({
      body: body,
      event_id: id,
    })
    .limit(1)
    .single();

//Delete Comment
export const deleteComment = async (id: number) =>
  await supabaseClient.from("comments").delete().eq("id", id);

//Get all favorite Events
export const getFavoriteEvents = async () =>
  await supabaseClient.from("events").select("*, favorite_events(*)");

//Get all favorite data
export const getAllFavoriteData = async (id: string) =>
  await supabaseClient.from("favorite_events").select("*").eq("event_id", id);

export const addToFavorite = async (id: number) =>
  await supabaseClient
    .from("favorite_events")
    .insert({
      event_id: id,
    })
    .limit(1)
    .single();

export const removeToFavorite = async (ownId: string) =>
  await supabaseClient
    .from("favorite_events")
    .delete()
    .eq("creator_uuid", ownId);
