import {supabaseClient} from "../supabase";

//Update User Profile
export const updateProfile = async (uuid: string, first_name: string, last_name: string, image_url: string) => await supabaseClient
    .from("users")
    .update({
        uuid: uuid,
        first_name: first_name,
        last_name: last_name,
        image_url: image_url
    })
    .eq("uuid", uuid)

//Get single User Profile Data
export const getSingleUserData = async (uuid: string) => await supabaseClient
    .from("users")
    .select("*")
    .eq("uuid", uuid)
    .single()
