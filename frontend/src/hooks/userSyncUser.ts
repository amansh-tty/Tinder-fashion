import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";

// 🔹 Setup Supabase Client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export function useSyncUser() {
  const { user } = useUser(); // Get current Clerk user

  useEffect(() => {
    if (!user) return;

    // 🔹 Store user in Supabase
    const syncUser = async () => {
      const { id, fullName, emailAddresses } = user;

      const { data, error } = await supabase
        .from("users")
        .upsert([
          {
            id,
            name: fullName,
            email: emailAddresses[0]?.emailAddress,
          },
        ]);

      if (error) console.error("Supabase Error:", error);
      else console.log("User synced:", data);
    };

    syncUser();
  }, [user]); // Run when user changes
}
