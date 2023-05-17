import { supabaseClient } from "../supabase.ts";

//Get single User Profile Data
export const getSingleUserData = async (uuid: string) =>
  await supabaseClient.from("users").select("*").eq("uuid", uuid).single();
