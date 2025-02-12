import { useState, useEffect } from "react"

export function UserProfile() {
  const [likedItems, setLikedItems] = useState<number[]>([])
  const [followedInfluencers, setFollowedInfluencers] = useState<number[]>([])

  useEffect(() => {
    const storedLikedItems = localStorage.getItem("likedItems")
    const storedFollowedInfluencers = localStorage.getItem("followedInfluencers")

    if (storedLikedItems) {
      setLikedItems(JSON.parse(storedLikedItems))
    }
    if (storedFollowedInfluencers) {
      setFollowedInfluencers(JSON.parse(storedFollowedInfluencers))
    }
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Stats</h2>
        <p>Liked Items: {likedItems.length}</p>
        <p>Followed Influencers: {followedInfluencers.length}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
        <ul className="space-y-2">
          <li>
            <a href="/liked" className="text-blue-500 hover:underline">
              View Liked Items
            </a>
          </li>
          <li>
            <a href="/influencers" className="text-blue-500 hover:underline">
              Explore Influencers
            </a>
          </li>
          <li>
            <a href="/stores" className="text-blue-500 hover:underline">
              Find Nearby Stores
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
        <p className="text-gray-600">(Account settings functionality would be implemented here in a real app)</p>
      </div>
    </div>
  )
}

