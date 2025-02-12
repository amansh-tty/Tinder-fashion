"use client"
import { ExternalLink, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { Product } from "../types"

const allProducts: Product[] = [
  {
    id: 1,
    name: "Summer Floral Dress",
    price: 2999,
    image: "/placeholder.svg?height=400&width=300",
    brand: "Zara",
    buyLinks: {
      myntra: "https://myntra.com/product-1",
      ajio: "https://ajio.com/product-1",
      amazon: "https://amazon.in/product-1",
    },
  },
  // Add more products...
]

export function WishlistItems() {
  const [wishlist, setWishlist] = useLocalStorage<number[]>("wishlist", [])
  const [favorites] = useLocalStorage<number[]>("favorites", [])

  const wishlistProducts = allProducts.filter((product) => wishlist.includes(product.id))

  const removeFromWishlist = (productId: number) => {
    setWishlist(wishlist.filter((id) => id !== productId))
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Your wishlist is empty.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlistProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative aspect-[4/3]">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
            {favorites.includes(product.id) && (
              <div className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded-full">Favorite</div>
            )}
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>
                <p className="text-sm text-gray-500">{product.brand}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeFromWishlist(product.id)}>
                <Trash2 className="text-red-500" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(product.buyLinks).map(([site, url]) => (
                <a
                  key={site}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  Buy on {site}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

