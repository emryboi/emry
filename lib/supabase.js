import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Hata ayıklama satırı
console.log("DEBUG - URL:", url);
console.log("DEBUG - KEY:", anonKey);

if (!url || !anonKey) {
  throw new Error("Supabase environment variables are not set.");
}

export const supabase = createClient(url, anonKey);