import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://lmgrgcureobfcmzpeqpl.supabase.co";
const supabaseAnonKey = "sb_publishable_Ud27HkI_CLthHaCLzURH9A_O0UlHku_"; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
