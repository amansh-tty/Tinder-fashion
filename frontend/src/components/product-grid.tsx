// import { useState, useEffect } from "react"
// import { motion, type PanInfo } from "framer-motion"
// import { ChevronLeft, ChevronRight, MapPin, Heart } from "lucide-react"

// const products = [
//   {
//     id: 1,
//     name: "Summer Dress",
//     price: 59.99,
//     image: "https://i.pinimg.com/736x/b3/8f/c6/b38fc63ba586ac8b38cb406ed612aa98.jpg",
//     influencer: "Emma Style",
//   },
//   {
//     id: 2,
//     name: "Denim Jacket",
//     price: 89.99,
//     image: "/placeholder.svg?height=400&width=300",
//     // influencer: "Liam Fashion",
//   },
//   { id: 3, name: "Sneakers", price: 79.99, image: "/placeholder.svg?height=400&width=300", influencer: "Sophia Chic" },
// ]

// export function ProductSwiper() {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [exitX, setExitX] = useState(0)
//   const [likedItems, setLikedItems] = useState<number[]>([])

//   useEffect(() => {
//     const storedLikedItems = localStorage.getItem("likedItems")
//     if (storedLikedItems) {
//       setLikedItems(JSON.parse(storedLikedItems))
//     }
//   }, [])

//   const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
//     if (info.offset.x < -100) {
//       setExitX(-250)
//       setTimeout(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
//         setExitX(0)
//       }, 300)
//     } else if (info.offset.x > 100) {
//       setExitX(250)
//       setTimeout(() => {
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
//         setExitX(0)
//       }, 300)
//     }
//   }

//   const handleLike = () => {
//     const newLikedItems = [...likedItems, products[currentIndex].id]
//     setLikedItems(newLikedItems)
//     localStorage.setItem("likedItems", JSON.stringify(newLikedItems))
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
//   }

//   const currentProduct = products[currentIndex]

//   return (
//     <div className="relative">
//       <motion.div
//         key={currentIndex}
//         initial={{ x: 300, opacity: 0 }}
//         animate={{ x: exitX, opacity: 1 }}
//         exit={{ x: -300, opacity: 0 }}
//         transition={{ type: "spring", stiffness: 300, damping: 20 }}
//         drag="x"
//         dragConstraints={{ left: 0, right: 0 }}
//         onDragEnd={handleDragEnd}
//         className="bg-white rounded-lg shadow-lg overflow-hidden"
//       >
//         <img
//           src={currentProduct.image || "/placeholder.svg"}
//           alt={currentProduct.name}
//           className="w-full h-64 object-cover"
//         />
//         <div className="p-4">
//           <h2 className="text-xl font-semibold">{currentProduct.name}</h2>
//           <p className="text-gray-600">${currentProduct.price.toFixed(2)}</p>
//           <p className="text-sm text-gray-500 mt-1">Curated by {currentProduct.influencer}</p>
//           <div className="flex justify-between items-center mt-2">
//             <a href="/stores" className="flex items-center text-blue-500 hover:underline">
//               <MapPin size={16} className="mr-1" />
//               Find in stores
//             </a>
//             <button onClick={handleLike} className="text-red-500 hover:text-red-600">
//               <Heart size={24} />
//             </button>
//           </div>
//         </div>
//       </motion.div>
//       <button
//         onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)}
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
//       >
//         <ChevronLeft size={24} />
//       </button>
//       <button
//         onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)}
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
//       >
//         <ChevronRight size={24} />
//       </button>
//     </div>
//   )
// }

