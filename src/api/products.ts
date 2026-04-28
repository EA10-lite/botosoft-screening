import { useQuery } from '@tanstack/react-query'
import { type Product } from '../types/product'

const API_URL = 'https://fakestoreapi.com/products'

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}

