import { useState, useEffect } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Heart, Image as ImageIcon } from "lucide-react";
import { useLikedItems } from "../context/LikedItemsContext";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  influencer: string;
}

export function ProductSwiper() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);
  const { likedItems, toggleLike } = useLikedItems();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -100) {
      setExitX(-250);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        setExitX(0);
      }, 300);
    } else if (info.offset.x > 100) {
      setExitX(250);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
        setExitX(0);
      }, 300);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (!products.length) return <p>No products available.</p>;

  const currentProduct = products[currentIndex];

  return (
    <div className="relative w-full max-w-md mx-auto mt-6">
      <motion.div
        key={currentIndex}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: exitX, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
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
            <button onClick={() => toggleLike(currentProduct.id)} className={`hover:text-red-600 ${likedItems.includes(currentProduct.id) ? "text-red-500" : "text-gray-400"}`}>
              <Heart size={24} />
            </button>
          </div>
        </div>
      </motion.div>

      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
