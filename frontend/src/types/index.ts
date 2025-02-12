export interface Product {
    id: number
    name: string
    price: number
    image: string
    brand: string
    buyLinks: {
      myntra?: string
      ajio?: string
      amazon?: string
    }
    inStock?: boolean
  }
  
  export interface Store {
    id: number
    name: string
    address: string
    phone: string
    hours: string
    distance: string
    products: Product[]
  }
  
  