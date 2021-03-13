import React, { FunctionComponent, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

import { searchItems } from '../api/routes';
import { Breadcrumb } from '../Components/Breadcrumb/Breadcrumb';
import { ProductItem } from '../Components/ProductItem/ProductItem';
import { useQuery } from '../utils';
import { Product } from '../types/Product';

export const SearchList: FunctionComponent = () => {
  let query = useQuery();
  let search = query.get('search');

  /**
   * State
   */
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  /**
   * Api call
   */
  useEffect(() => {
    setIsLoading(true);
    searchItems(search || '')
    .then(({data})=> {
      setProducts(data.items || []);
      setCategories(data.categories || []);
    })
    .catch(()=> {
      setProducts([]);
      setCategories([]);
      handleOpen();
    })
    .finally(()=> setIsLoading(false));
  }, [search])

  /**
   * Callbacks
   */
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <div className="search-list">
      {
        isLoading
        ? <div className="center padding-4"><CircularProgress /></div>
        : <>
            <Breadcrumb categories={categories} />
            {
              products && !!products.length ? products.map((product: Product)=> {
                return <ProductItem product={product}  key={product.id}/>
              }) :
              <span>No se encontraron resultados</span>
            }
          </>
      }
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
  </div>
}