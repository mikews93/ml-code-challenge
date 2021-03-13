import { Product } from './types/Product';
import { useLocation } from "react-router";

/**
 * custom hook to get query params
 * @returns 
 */
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * takes a number and returns is in the correct format
 * @param price 
 * @returns string whit formatted number
 */
export const formatPrice = ({currency, price, decimals}: Product['price'])=> {
  const formatter = new Intl.NumberFormat(undefined,{
    style:'currency',
    currency
  })

  return formatter.format(parseFloat(`${price}.${decimals}`))
}