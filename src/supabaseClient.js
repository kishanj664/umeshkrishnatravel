import { createClient } from "@supabase/supabase-js";

// ──────────────────────────────────────────────
// 🔑  Replace these with your own Supabase credentials
//     (found in: Supabase Dashboard → Settings → API)
// ──────────────────────────────────────────────
const SUPABASE_URL = "https://lvgipqnmrtogbrwmobkg.supabase.co";
const SUPABASE_PUBLIC_KEY = "sb_publishable_eS0gBrQbEzkqyxHnDUMEEA_yVhGtrRY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
