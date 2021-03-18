import { Product } from './Types/Product';
import { useLocation } from "react-router";
import { cloneElement, ReactElement } from 'react';

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

/**
 * Repeats element a determinate number of times
 * @param times number of times to repeat the element
 * @param element react node to repeat
 * @returns elements repeated
 */
export const repeatElement = (times: number = 1, element: ReactElement) => {
  return [...Array(times)].map((_,index)=> cloneElement(element, { key: index}));
}