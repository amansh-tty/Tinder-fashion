import { MapPin, Clock, Phone } from "lucide-react"
import { useParams } from "react-router-dom";


const stores = [
  {
    id: "1",
    name: "Fashion Boutique",
    address: "123 Main St",
    phone: "(555) 123-4567",
    hours: "Mon-Sat: 10:00 AM - 9:00 PM, Sun: 11:00 AM - 6:00 PM",
    products: [
      { id: 1, name: "Summer Dress", price: 59.99, image: "/10000.jpg" },
      { id: 2, name: "Denim Jacket", price: 89.99, image: "/10002.jpg" },
    ],
  },
  {
    id: "2",
    name: "Fashion Boutique",
    address: "123 Main St",
    phone: "(555) 123-4567",
    hours: "Mon-Sat: 10:00 AM - 9:00 PM, Sun: 11:00 AM - 6:00 PM",
    products: [
      { id: 1, name: "Summer Dress", price: 59.99, image: "/10002.jpg" },
      { id: 2, name: "Denim Jacket", price: 89.99, image: "/10002.jpg" },
    ],
  },
  {
    id: "3",
    name: "Fashion Boutique",
    address: "123 Main St",
    phone: "(555) 123-4567",
    hours: "Mon-Sat: 10:00 AM - 9:00 PM, Sun: 11:00 AM - 6:00 PM",
    products: [
      { id: 1, name: "Summer Dress", price: 59.99, image: "/10002.jpg" },
      { id: 2, name: "Denim Jacket", price: 89.99, image: "/10002.jpg" },
    ],
  },
]
export function StoreDetails() {
  const { id } = useParams(); // Get ID from the URL
  const store = stores.find((s) => s.id === id);

  if (!store) {
    return <div>Store not found</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{store.name}</h1>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <p className="flex items-center mt-2">
          <MapPin size={16} className="mr-2" />
          {store.address}
        </p>
        <p className="flex items-center mt-2">
          <Clock size={16} className="mr-2" />
          {store.hours}
        </p>
        <p className="flex items-center mt-2">
          <Phone size={16} className="mr-2" />
          {store.phone}
        </p>
      </div>
      <h2 className="text-xl font-semibold mb-4">Available Products</h2>
      <div className="grid grid-cols-2 gap-4">
        {store.products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-40 object-cover" />
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

