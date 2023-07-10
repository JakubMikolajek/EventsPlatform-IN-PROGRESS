import {supabaseClient} from "../supabase";

//Get all Events
export const getAllEventsData = async () => await supabaseClient
    .from("events")
    .select("*")
    .is("archived_at", null)
