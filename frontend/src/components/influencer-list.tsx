import { useState, useEffect } from "react";
import { UserPlus, UserCheck } from "lucide-react";

const influencers = [
  { id: 1, name: "Emma Style", followers: "1.2M", image: "/profiles/mai.jpg" },
  { id: 2, name: "Liam Fashion", followers: "890K", image: "/profiles/kamo.jpg" },
  { id: 3, name: "Sophia Chic", followers: "2.5M", image: "/profiles/maki.jpg" },
];

export function InfluencerList() {
  const [followedInfluencers, setFollowedInfluencers] = useState<number[]>([]);

  useEffect(() => {
    const storedFollowedInfluencers = localStorage.getItem("followedInfluencers");
    if (storedFollowedInfluencers) {
      setFollowedInfluencers(JSON.parse(storedFollowedInfluencers));
    }
  }, []);

  const toggleFollow = (id: number) => {
    const newFollowedInfluencers = followedInfluencers.includes(id)
      ? followedInfluencers.filter((influencerId) => influencerId !== id)
      : [...followedInfluencers, id];
    setFollowedInfluencers(newFollowedInfluencers);
    localStorage.setItem("followedInfluencers", JSON.stringify(newFollowedInfluencers));
  };

  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {influencers.map((influencer) => (
          <div
            key={influencer.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
          >
            <img
              src={influencer.image || "/placeholder.svg"}
              alt={influencer.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-center">{influencer.name}</h2>
              <p className="text-gray-600 text-sm">{influencer.followers} followers</p>
              <div className="mt-4 flex items-center gap-4">
                <a href={`/influencers/${influencer.id}`} className="text-blue-500 hover:underline">
                  View Profile
                </a>
                <button
                  onClick={() => toggleFollow(influencer.id)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all text-sm ${
                      followedInfluencers.includes(influencer.id)
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {followedInfluencers.includes(influencer.id) ? (
                    <>
                      <UserCheck size={18} /> Following
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} /> Follow
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}