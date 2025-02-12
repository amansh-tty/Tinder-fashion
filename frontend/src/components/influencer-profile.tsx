
import { useState, useEffect } from "react"
import { UserPlus, UserCheck } from "lucide-react"
import { useParams } from "react-router-dom";

const influencers = [
  {
    id: "1",
    name: "Emma Style",
    followers: "1.2M",
    image: "/profiles/mai.jpg",
    bio: "Fashion enthusiast and style icon. Sharing my passion for trendy outfits and accessories.",
    products: [
      { id: 1, name: "Summer Dress", price: 59.99, image: "/10005.jpg" },
      { id: 2, name: "Denim Jacket", price: 89.99, image: "/10005.jpg" },
    ],
  },
  {
    id: "2",
    name: "Emma Style",
    followers: "1.2M",
    image: "/profiles/kamo.jpg",
    bio: "Fashion enthusiast and style icon. Sharing my passion for trendy outfits and accessories.",
    products: [
      { id: 1, name: "Summer Dress", price: 59.99, image: "/10005.jpg" },
      { id: 2, name: "Denim Jacket", price: 89.99, image: "/10005.jpg" },
    ],
  },
  {
    id: "3",
    name: "Emma Style",
    followers: "1.2M",
    image: "/profiles/maki.jpg",
    bio: "Fashion enthusiast and style icon. Sharing my passion for trendy outfits and accessories.",
    products: [
      { id: 1, name: "Summer Dress", price: 59.99, image: "/10005.jpg" },
      { id: 2, name: "Denim Jacket", price: 89.99, image: "/10005.jpg" },
    ],
  },

  // Add more influencer data as needed
]

export function InfluencerProfile( ) {
  const { id } = useParams(); // Get ID from the URL
  const store = influencers.find((s) => s.id === id);

 
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    const storedFollowedInfluencers = localStorage.getItem("followedInfluencers")
    if (storedFollowedInfluencers) {
      const followedInfluencers = JSON.parse(storedFollowedInfluencers)
      setIsFollowing(followedInfluencers.includes(Number(id)))
    }
  }, [id])
  if (!store) {
    return <div>Store not found</div>;
  }
  const toggleFollow = () => {
    const storedFollowedInfluencers = localStorage.getItem("followedInfluencers")
    let followedInfluencers = storedFollowedInfluencers ? JSON.parse(storedFollowedInfluencers) : []

    if (isFollowing) {
      followedInfluencers = followedInfluencers.filter((influencerId: number) => influencerId !== Number(id))
    } else {
      followedInfluencers.push(Number(id))
    }

    localStorage.setItem("followedInfluencers", JSON.stringify(followedInfluencers))
    setIsFollowing(!isFollowing)
  }

  const influencer = influencers.find((i) => i.id === id)

  if (!influencer) {
    return <div>Influencer not found</div>
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <img src={influencer.image || "/placeholder.svg"} alt={influencer.name} className="w-full h-64 object-cover" />
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{influencer.name}</h1>
            <button
              onClick={toggleFollow}
              className={`flex items-center ${isFollowing ? "text-green-500" : "text-gray-500"}`}
            >
              {isFollowing ? (
                <>
                  <UserCheck size={20} className="mr-1" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus size={20} className="mr-1" />
                  Follow
                </>
              )}
            </button>
          </div>
          <p className="text-gray-600 mb-2">{influencer.followers} followers</p>
          <p className="text-gray-700">{influencer.bio}</p>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
      <div className="grid grid-cols-2 gap-4">
        {influencer.products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

