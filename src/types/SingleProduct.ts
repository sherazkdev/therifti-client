export interface Product {
  id: string
  title: string
  brand: string
  price: number
  oldPrice?: number
  condition: string
  size: string
  color: string
  images: string[]
  seller: Seller
}

export interface Seller {
  id: string
  username: string
  location: string
  lastSeen: string
}