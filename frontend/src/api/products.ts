// import { NextApiRequest, NextApiResponse } from 'next'
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

// // Load products from CSV file
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
//   if (req.method === 'GET') {
//     // Return a random selection of 20 products
//     const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 20)
//     res.status(200).json(randomProducts)
//   } else {
//     res.setHeader('Allow', ['GET'])
//     res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }

