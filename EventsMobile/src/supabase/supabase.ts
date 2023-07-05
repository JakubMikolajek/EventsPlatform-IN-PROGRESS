import {createClient, SupabaseClient} from "@supabase/supabase-js";
import "react-native-url-polyfill/auto"
import AsyncStorage from "@react-native-async-storage/async-storage";

import {Database} from "./databaseTypes";

const supabase_url: string = ""
const supabase_key: string = ""

export const supabaseClient: SupabaseClient<Database> = createClient<Database>(supabase_url, supabase_key,
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    })
