import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import orderBy from 'lodash/orderBy';

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
        price: parseInt(price.shift() || '')  || 0,
        decimals: parseInt(price.shift() || '') || 0
      },
      state: product.address?.state_name,
      picture: product.pictures?.length ? product.pictures.shift().url : '',
      thumbnail: product.thumbnail,
      condition: product.condition,
      free_shipping: !!product.shipping?.free_shipping,
      sold_quantity: product.sold_quantity
    }
  }

  getCategory(categoryId: string) {
    return axios.get(`${this.MLA_URL}/categories/${categoryId}`);
  }

  extractCategoryPath(categoryData: AxiosResponse<any>) {
    if (!categoryData.data) {
      return [];
    }

    return [...categoryData.data.path_from_root].map(({name})=> name)
  }

  async getCategoryMostResults(available_filters: any) {
    const categoryFilter = [...available_filters].find(({ id }) => id === 'category');
    let categories: string[] = [];
    
    if (categoryFilter && categoryFilter.values) {
      const categoryMoreResults = orderBy(categoryFilter.values, 'results', 'desc').shift();
      categories = this.extractCategoryPath(await this.getCategory(categoryMoreResults.id));
    }

    return categories
  }

  async listAllItems(query: string = ':query') {
    try {
      const response = await axios.get(`${this.MLA_URL}/sites/MLA/search?q=${query}`);
      const categories = await this.getCategoryMostResults(response.data.available_filters)
      const items = response.data.results?.map(this.mapProduct) || [];

      return { author, categories, items }
    } catch (error) {
      return { error }
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
        const categories = this.extractCategoryPath(await this.getCategory(itemData.category_id))
        
        return {
          author,
          categories,
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