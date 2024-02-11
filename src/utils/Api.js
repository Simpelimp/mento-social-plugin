import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gyrstiqzamltthbjartl.supabase.co";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cnN0aXF6YW1sdHRoYmphcnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1Njc5MDIsImV4cCI6MTk4MzE0MzkwMn0.NHkxpXicNrZ_s2r4S5v1mMOys_q_t6is1ARZiM68hQM";

export const supabase = createClient(supabaseUrl, anonKey);
