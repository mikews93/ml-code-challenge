import axios from "axios";

export const searchItems = (q:string ) => axios.get(`${process.env.REACT_APP_API_URL}/items?q=${q}`);

export const getItemById = (id:string ) => axios.get(`${process.env.REACT_APP_API_URL}/items/${id}`);