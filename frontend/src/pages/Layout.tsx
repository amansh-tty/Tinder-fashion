// import './globals.css'
// import { Inter } from 'next/font/google'
import { Navbar } from '../components/navbar'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'FashionSwipe',
//   description: 'Discover fashion products, influencers, and stores',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Navbar />
//         <main className="container mx-auto px-4 py-8">
//           {children}
//         </main>
//       </body>
//     </html>
//   )
// }

import React from 'react'

const Layout = () => {
  return (
    <>
        <Navbar />
         
         
        </>
  )
}

export default Layout
