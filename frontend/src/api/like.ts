// import fs from 'fs'
// import path from 'path'
// import csv from 'csv-parser'

// interface Product {
//   id: number
//   name: string
//   brand: string
//   gender: string
//   price: number
//   description: string
// }

// let products: Product[] = []
// let likedProducts: number[] = []

// // Load products from CSV file (same as in products.ts)
// const loadProducts = () => {
//   const filePath = path.join(process.cwd(), 'data', 'products.csv')
//   fs.createReadStream(filePath)
//     .pipe(csv())
//     .on('data', (row) => {
//       products.push({
//         id: parseInt(row.id),
//         name: row.name,
//         brand: row.brand,
//         gender: row.gender,
//         price: parseFloat(row.price),
//         description: row.description,
//       })
//     })
//     .on('end', () => {
//       console.log('Products loaded successfully')
//     })
// }

// loadProducts()

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { productId } = req.body
//     likedProducts.push(productId)

//     // Simple recommendation system based on liked products
//     const recommendations = getRecommendations(productId)
    
//     res.status(200).json({ message: 'Product liked successfully', recommendations })
//   } else {
//     res.setHeader('Allow', ['POST'])
//     res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }

// function getRecommendations(likedProductId: number): Product[] {
//   const likedProduct = products.find(p => p.id === likedProductId)
//   if (!likedProduct) return []

//   // Recommend products with the same brand or gender
//   const recommendations = products.filter(p => 
//     (p.brand === likedProduct.brand || p.gender === likedProduct.gender) && p.id !== likedProductId
//   )

//   // Sort recommendations by price similarity
//   recommendations.sort((a, b) => 
//     Math.abs(a.price - likedProduct.price) - Math.abs(b.price - likedProduct.price)
//   )

//   // Return top 5 recommendations
//   return recommendations.slice(0, 5)
// }

