import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { searchItems } from '../Api/routes';
import { Breadcrumb } from '../Components/Breadcrumb/Breadcrumb';
import { ProductItem } from '../Components/ProductItem/ProductItem';
import { repeatElement, useQuery } from '../utils';
import { Product } from '../types/Product';
import { ProductItemLoader } from '../Components/ProductItem/ProductItemLoader';
import { AppContext } from '../Main/Main';
import { GlobalContext } from '../types/Toaster';

export const SearchList: FunctionComponent = () => {
  let query = useQuery();
  let search = query.get('search');

  /**
   * State
   */
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Context
   */
  const { showToaster, setIsFetchingData } = useContext<GlobalContext>(AppContext);

  /**
   * Api call
   */
  useEffect(() => {
    setIsLoading(true);
    setIsFetchingData(true);
    searchItems(search || '')
    .then(({data})=> {
      setProducts(data.items || []);
      setCategories(data.categories || []);
    })
    .catch(()=> {
      setProducts([]);
      setCategories([]);
      showToaster({
        message: 'Vaya!, lo lamentamos hubo un error',
        severity: 'error'
      })
    })
    .finally(()=> {
      setIsLoading(false);
      setIsFetchingData(false);
    });
    // eslint-disable-next-line 
  }, [search])



  return <div className="search-list">
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`${search} en Mercado libre`}</title>
    </Helmet>
    {
      isLoading
      ? <div className="mt-4">
        {repeatElement(4, <ProductItemLoader />)}
      </div>
      : <>
          <Breadcrumb categories={categories} />
          {
            products && !!products.length ? products.map((product: Product)=> {
              return <ProductItem product={product}  key={product.id}/>
            }) :
            <span className="center">No se encontraron resultados</span>
          }
        </>
    }
  </div>
}