export interface ResponseItem {
  id: number
  email: string
  password: string
  name: string
  role: string
  avatar: string
}
export interface Category {
  id: number
  name: string
  image: string
}

export interface Product {
  id?: number
  title: string
  price: number
  description: string
  category: Category
  categoryId?: number
  images: string[]
}
