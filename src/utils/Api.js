import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ckpzvsojbtghkcowikmq.supabase.co";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrcHp2c29qYnRnaGtjb3dpa21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE3OTU1MDYsImV4cCI6MTk5NzM3MTUwNn0.3Vh9i_Mkz9CbKG8FKmORrAxptHquXxE4WqHe8lL77tI";

export const supabase = createClient(supabaseUrl, anonKey);
