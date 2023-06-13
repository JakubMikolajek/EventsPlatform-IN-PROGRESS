import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {Database} from "./databaseTypes.ts";

const supabase_url: string = "";
const supabase_key: string =
    "";

export const supabaseClient: SupabaseClient<Database> = createClient<Database>(
    supabase_url,
    supabase_key
);
