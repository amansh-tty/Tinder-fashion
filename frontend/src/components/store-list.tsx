import { MapPin, Clock } from "lucide-react"

const stores = [
  { id: 1, name: "Fashion Boutique", address: "123 Main St", distance: "0.5 miles", openUntil: "9:00 PM" },
  { id: 2, name: "Trendy Threads", address: "456 Elm St", distance: "1.2 miles", openUntil: "8:00 PM" },
  { id: 3, name: "Style Haven", address: "789 Oak St", distance: "1.8 miles", openUntil: "10:00 PM" },
]

export function StoreList() {
  return (
    <div className="space-y-4">
      {stores.map((store) => (
        <a key={store.id} href={`/stores/${store.id}`} className="block">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold">{store.name}</h2>
            <p className="text-gray-600 flex items-center mt-2">
              <MapPin size={16} className="mr-1" />
              {store.address} ({store.distance})
            </p>
            <p className="text-gray-600 flex items-center mt-1">
              <Clock size={16} className="mr-1" />
              Open until {store.openUntil}
            </p>
          </div>
        </a>
      ))}
    </div>
  )
}

