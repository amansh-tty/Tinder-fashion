import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight,  Image as ImageIcon } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { client } from "../api/client";

interface Product {
  product_id: number;
  name: string;
  price: number;
  discounted_price: number;
  image?: string;
  influencer?: string;
  brand: string;
}

export function ProductSwiper() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);
  const { isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await client.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const handleLikeAndNextProduct = async (liked: boolean) => {
    if (!isSignedIn) {
      console.warn("⚠️ User is not signed in!");
      return;
    }

    const currentProductId = products[currentIndex]?.product_id;
    if (liked) {
      try {
        await client.post("/liked-products", {
          user_id: user?.id,
          product_id: currentProductId,
        });
        console.log("✅ Product Liked:", currentProductId);
      } catch (error) {
        console.error("❌ Error liking product:", error);
      }
    }

    if (currentIndex >= products.length - 1) {
      console.warn("⚠️ No more products left.");
      return;
    }

    setExitX(liked ? 250 : -250);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setExitX(0);
    }, 300);
  };

  if (loading) return <p className="text-center">Loading products...</p>;
  if (currentIndex >= products.length) return <p className="text-center">All products viewed. No more items.</p>;

  const currentProduct = products[currentIndex];

  return (
    <div className="relative w-full max-w-md mx-auto mt-6">
      <motion.div
        key={currentIndex}
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: exitX, opacity: 1 }}
        exit={{ x: exitX > 0 ? 300 : -300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {currentProduct.image ? (
          <img src={currentProduct.image} alt={currentProduct.name} className="w-full h-64 object-cover" />
        ) : (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
            <ImageIcon size={48} className="text-gray-400" />
          </div>
        )}

        <div className="p-4">
          <h2 className="text-xl font-semibold">{currentProduct.name}</h2>
          <p className="text-sm text-gray-500">Brand: {currentProduct.brand}</p>

          <div className="flex items-center gap-2 mt-2">
            {currentProduct.discounted_price && currentProduct.discounted_price < currentProduct.price ? (
              <>
                <p className="text-lg font-bold text-red-500">{formatPrice(currentProduct.discounted_price)}</p>
                <p className="text-sm line-through text-gray-500">{formatPrice(currentProduct.price)}</p>
              </>
            ) : (
              <p className="text-lg font-bold">{formatPrice(currentProduct.price)}</p>
            )}
          </div>

          {/* {currentProduct.influencer && (
            <p className="text-sm text-gray-500 mt-1">Curated by {currentProduct.influencer}</p>
          )}

          <div className="flex justify-between items-center mt-3">
            <a href="/stores" className="flex items-center text-blue-500 hover:underline">
              <MapPin size={16} className="mr-1" />
              Find in stores
            </a>
          </div> */}
        </div>
      </motion.div>

      <button
        onClick={() => handleLikeAndNextProduct(false)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => handleLikeAndNextProduct(true)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
