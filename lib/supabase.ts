import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://lmgrgcureobfcmzpeqpl.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtZ3JnY3VyZW9iZmNtenBlcXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NDgwMTksImV4cCI6MjA5NjQyNDAxOX0.r8pYwiHOuLZBYe61MPkPU5k6zz83iGymZrJ06kX9S34"; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (url, options) => {
      return fetch(url, { ...options, cache: 'no-store' });
    },
  },
});
