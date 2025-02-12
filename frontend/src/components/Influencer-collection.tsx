"use client"

// import { useState } from "react"
import { Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { Product } from "../types"

interface Collection {
  id: number
  influencer: string
  followers: string
  image: string
  products: Product[]
}

const collections: Collection[] = [
  {
    id: 1,
    influencer: "StyleByAisha",
    followers: "1.2M",
    image: "/placeholder.svg?height=300&width=300",
    products: [
      {
        id: 101,
        name: "Boho Summer Dress",
        price: 2499,
        image: "/placeholder.svg?height=400&width=300",
        brand: "Zara",
        buyLinks: {
          myntra: "https://myntra.com/product-101",
          ajio: "https://ajio.com/product-101",
        },
      },
      {
        id: 102,
        name: "Leather Crossbody Bag",
        price: 1999,
        image: "/placeholder.svg?height=400&width=300",
        brand: "H&M",
        buyLinks: {
          myntra: "https://myntra.com/product-102",
          amazon: "https://amazon.in/product-102",
        },
      },
    ],
  },
  {
    id: 2,
    influencer: "TrendWithRaj",
    followers: "800K",
    image: "/placeholder.svg?height=300&width=300",
    products: [
      {
        id: 201,
        name: "Striped Linen Shirt",
        price: 1799,
        image: "/placeholder.svg?height=400&width=300",
        brand: "UNIQLO",
        buyLinks: {
          myntra: "https://myntra.com/product-201",
          ajio: "https://ajio.com/product-201",
        },
      },
      {
        id: 202,
        name: "Classic Denim Jeans",
        price: 2999,
        image: "/placeholder.svg?height=400&width=300",
        brand: "Levis",
        buyLinks: {
          myntra: "https://myntra.com/product-202",
          amazon: "https://amazon.in/product-202",
        },
      },
    ],
  },
]

export function InfluencerCollections() {
  const [wishlist, setWishlist] = useLocalStorage<number[]>("wishlist", [])
//   const [expandedCollection, setExpandedCollection] = useState<number | null>(null)

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId))
    } else {
      setWishlist([...wishlist, productId])
    }
  }

  return (
    <div className="space-y-8">
      {collections.map((collection) => (
        <div key={collection.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={collection.image || "/placeholder.svg"}
                alt={collection.influencer}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">{collection.influencer}</h2>
                <p className="text-gray-600 flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {collection.followers} followers
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {collection.products.map((product) => (
                <div key={product.id} className="relative group">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart className={wishlist.includes(product.id) ? "fill-red-500 stroke-red-500" : ""} />
                  </Button>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <p className="font-semibold">{product.name}</p>
                      <p>₹{product.price}</p>
                      <p className="text-sm opacity-75">{product.brand}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

