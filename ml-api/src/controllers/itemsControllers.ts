import axios from 'axios';
import dotenv from 'dotenv';
import { author } from '../../constants';

/**
 * initialize dot env
 */
 dotenv.config({
  path: '.env'
});  


class itemsController {
  private MLA_URL = process.env.MERCADO_LIBRE_API

  mapProduct (product: any) {
    const price = `${product.price}`.split('.') || [];

    return {
      id: product.id,
      title: product.title,
      price: {
        currency: product.currency_id,
        price: parseInt(price.shift() || ''),
        decimals: parseInt(price.shift() || '')
      },
      state: product.address?.state_name,
      picture: product.pictures?.length ? product.pictures.shift().url : '',
      thumbnail: product.thumbnail,
      condition: product.condition,
      free_shipping: !!product.shipping?.free_shipping,
      sold_quantity: product.sold_quantity
    }
  }

  async listAllItems(query: string = ':query') {
    try {
      const response = await axios.get(`${this.MLA_URL}/sites/MLA/search?q=${query}`);
      
      const categoryFilter = [...response.data.filters].find(({ id })=> id === 'category');
      let categories: string[] = [];
      if(categoryFilter){
        const value = categoryFilter.values.shift();
        categories = value.path_from_root ? [...value.path_from_root].map(({name})=> name) : []
      }

      return {
        author,
        categories,
        items: response.data.results 
          ? response.data.results.map((item: any)=>this.mapProduct(item)) 
          : []
      }
    } catch (error) {
      console.log({error})
      return {
        error
      }
    }
  }
  
  async findById(id: string) {
    try {
      const [item, details] = await Promise.all([
        axios.get(`${this.MLA_URL}/items/${id}`),
        axios.get(`${this.MLA_URL}/items/${id}/description`)
      ])
      
      if(item.data && details.data) {
        const itemData = item.data;
        const itemDetails = details.data;
        let categoryData: string [] = []

        const categoryResponse = await axios.get(`${this.MLA_URL}/categories/${itemData.category_id}`);
        if(categoryResponse.data){
          categoryData = [...categoryResponse.data.path_from_root].map(({name})=> name)
        }
        
        
        return {
          author,
          categories: categoryData,
          item: {
            ...this.mapProduct(itemData),
            description: itemDetails.plain_text
           },
        }
      }

      return {
        error: 'could not get all information'
      }
    } catch (error) {
      return { error }
    }
  }
}

export = new itemsController();