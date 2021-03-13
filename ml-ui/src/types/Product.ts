export interface Product {
  id: string,
  title: string,
  price: {
    currency: string,
    price: number,
    decimals: number
  },
  state: string,
  picture: string,
  thumbnail: string,
  condition: string,
  free_shipping: boolean,
  sold_quantity: number,
  description?: string
}