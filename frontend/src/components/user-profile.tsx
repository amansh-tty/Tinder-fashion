import { useState, useEffect } from "react";
import { supabase } from "./supabase/supabaseClient";
import { useUser } from "@clerk/clerk-react"; // Clerk auth

export function UserProfile() {
  const [likedItems, setLikedItems] = useState<number[]>([]);
  // const [followedInfluencers, setFollowedInfluencers] = useState<number[]>([]);
  const { user } = useUser(); // Get Clerk user

  useEffect(() => {
    if (!user) return;

    const fetchLikedProducts = async () => {
      // Fetch user ID from 'users' table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("clerk_id", user.id)
        .single();

      if (userError || !userData) {
        console.error("Error fetching user ID:", userError?.message);
        return;
      }

      const userId = userData.id;

      // Fetch liked product IDs from 'liked_products' table
      const { data: likedData, error: likedError } = await supabase
        .from("liked_products")
        .select("product_id")
        .eq("user_id", userId);

      if (likedError) {
        console.warn("Error fetching liked products:", likedError.message);
        return;
      }

      setLikedItems(likedData.map((item) => item.product_id));
    };

    fetchLikedProducts();
  }, [user]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">Your Stats</h2>
      <p>Liked Items: {likedItems.length}</p>

      {/* Render liked products horizontally */}
      <div className="mt-4 flex overflow-x-auto space-x-4 p-2">
        {likedItems.length > 0 ? (
          likedItems.map((productId) => (
            <div key={productId} className="p-2 bg-gray-100 rounded-lg min-w-[100px] text-center">
              🛍️ Product {productId}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No liked products yet.</p>
        )}
      </div>
    </div>
  );
}
