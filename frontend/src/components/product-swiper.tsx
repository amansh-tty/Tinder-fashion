import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Heart, Image as ImageIcon } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { client } from "../api/client";

interface Product {
  product_id: number;
  name: string;
  price: number;
  image?: string;
  influencer: string;
}

export function ProductSwiper() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);
  const [swipedProducts, setSwipedProducts] = useState(new Set<number>());
  const { isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(true);
  // const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

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

  const handleLikeProduct = async (productId: number) => {
    if (!isSignedIn) {
      console.warn("⚠️ User is not signed in!");
      return;
    }

    // if (swipedProducts.has(productId)) {
    //   console.warn("⚠️ Already swiped this product.");
    //   return;
    // }

    try {
      console.log({productId})
      const response = await client.post("/liked-products", {
        user_id: user?.id, // Send Clerk user ID
        product_id: productId,
      });

      console.log("✅ Liked Product Response:", response.data);
      setSwipedProducts((prev) => new Set(prev).add(productId));
    } catch (error) {
      console.error("❌ Error liking product:", error);
    }
  };

  const handleNextProduct = (liked: boolean) => {
    if (currentIndex >= products.length - 1) {
      console.warn("⚠️ No more products left.");
      return;
    }

    const currentProductId = products[currentIndex]?.product_id;

    if (!swipedProducts.has(currentProductId)) {
      setSwipedProducts((prev) => new Set(prev).add(currentProductId));
    }

    // if (liked) {
    //   handleLikeProduct(currentProductId);
    // }

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
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: exitX, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
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
          <p className="text-gray-600">${currentProduct.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">Curated by {currentProduct.influencer}</p>

          <div className="flex justify-between items-center mt-3">
            <a href="/stores" className="flex items-center text-blue-500 hover:underline">
              <MapPin size={16} className="mr-1" />
              Find in stores
            </a>
            <button onClick={() => handleLikeProduct(currentProduct.product_id)} className="text-gray-400 hover:text-red-600">
              <Heart size={24} />
            </button>
          </div>
        </div>
      </motion.div>

      <button
        onClick={() => handleNextProduct(false)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => handleNextProduct(true)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
