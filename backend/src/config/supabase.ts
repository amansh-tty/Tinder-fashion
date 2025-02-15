// @ts-ignore
import { createClient } from "@supabase/supabase-js";
// @ts-ignore
import dotenv from "dotenv";

// ✅ Load environment variables BEFORE using process.env
dotenv.config();

// ✅ Fix process.env undefined issue in ES Modules
if (typeof process === "undefined") {
  throw new Error("❌ process is not defined! Make sure you're running this in Node.js.");
}

// ✅ Explicitly define the environment variables
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Supabase URL or Key is missing from environment variables.");
}

// ✅ Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
