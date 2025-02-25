import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { X } from "lucide-react";
import { client } from "../api/client";

export function LikedItems() {
  const { user } = useUser();
  const [likedProducts, setLikedProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchLikedProducts = async () => {
      try {
        const userId = user.id;

        // Check if Clerk's userId has 'user_' prefix
        // if (userId.startsWith("user_")) {
        //   userId = userId.replace("user_", "");
        // }

        // console.log("Fetching liked products for userId:", userId);

        const { data } = await client.get(`/liked-products`, {
          params: { userId },
          // body: {userId}
        });

        // console.log("Fetched Liked Products:", data);

        if (!Array.isArray(data)) {
          setError("Invalid response from server.");
          return;
        }

        setLikedProducts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching liked products:",error );
        } else {
          console.error("Error fetching liked products:", error);
        }
        setError("Failed to load liked products.");
      }
    };

    fetchLikedProducts();
  }, []);

  const toggleLike = async (productId: number) => {
    if (!user) return;


    try {
      const userId = user.id;
      // if (userId.startsWith("user_")) {
      //   userId = userId.replace("user_", "");
      // }
      console.log('userid, prodid', userId, productId)
      const deletePayloadParams = new URLSearchParams()
      deletePayloadParams.append('userId', userId)
      if (productId) {

        console.log(typeof productId)
        deletePayloadParams.append('productId', productId.toString())

      }
      const deletePayload = {
        params: deletePayloadParams
      }
      await client.delete(`/unlike-product`,
        deletePayload
      );

      setLikedProducts((prev) => prev.filter((p) => p.product_id !== productId));
    } catch (error) {
      console.error("Error unliking product:", error);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liked Products</h1>
      {likedProducts.length === 0 ? (
        <p className="text-gray-500">No liked products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {likedProducts.map(({ products }, index) => (
            <div
              key={products.id || index} // Use `products.id` if available, otherwise use `index`
              className="bg-white rounded-xl shadow-lg p-4 border flex flex-col items-center"
            >
              <img
                src={products.image}
                alt={products.name}
                className="w-40 h-40 object-cover mb-2 rounded-md"
              />
              <h2 className="text-lg font-semibold">{products.name}</h2>
              <p className="text-gray-600">Rs. {products.price.toFixed(2)}</p>
              <a
                href={products.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-1"
              >
                View Product
              </a>
              <button
                onClick={() => toggleLike(products.product_id)}
                className="mt-2 text-red-500 flex items-center"
              >
                <X size={20} /> Remove
              </button>
            </div>
          ))}


        </div>
      )}
    </div>
  );
}
