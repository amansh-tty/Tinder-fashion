import { useState } from "react";
import { useLikedItems } from "../context/LikedItemsContext";
import { products } from "../data/products";
import { MapPin, X } from "lucide-react";

export function LikedItems() {
  const { likedItems, toggleLike } = useLikedItems();
  const likedProducts = products.filter((product) => likedItems.includes(product.id));

  const [selectedProduct, setSelectedProduct] = useState<null | typeof products[0]>(null);
  
  const openModal = (product: typeof products[0]) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  if (likedProducts.length === 0) {
    return <p className="text-center text-gray-500">You haven't liked any items yet.</p>;
  }

  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{product.influencer}</p>
              <div className="flex justify-between items-center mt-3">
                {/* Open Modal on Click */}
                <button onClick={() => openModal(product)} className="text-blue-500 hover:underline flex items-center">
                  <MapPin size={16} className="mr-1" />
                  Buy Now
                </button>
                <button onClick={() => toggleLike(product.id)} className="text-red-500 hover:text-gray-400">
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              <X size={24} />
            </button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-xl font-semibold mt-4">{selectedProduct.name}</h2>
            <p className="text-gray-600">${selectedProduct.price.toFixed(2)}</p>
            <a
              href={selectedProduct.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600"
            >
              Visit Product Page
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
