import React, { FunctionComponent, useEffect, useState } from 'react';
import { CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useParams } from 'react-router';

import { getItemById } from '../api/routes';
import { Breadcrumb } from '../Components/Breadcrumb/Breadcrumb';
import { Product } from '../Components/Product/Product';
import { Product as ProductType } from '../types/Product';

export const ProductDetails: FunctionComponent = () => {
  const { id }: { id:string } = useParams()

  /**
   * State
   */
  const [productDetails, setProductDetails] = useState<ProductType| null>();
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [open, setOpen] = useState(false);

  /**
   * Api call
   */
  useEffect(() => {
    setIsLoading(true);
    getItemById(id)
    .then(({data})=> {
      setProductDetails(data.item || {});
      setCategories(data.categories || []);
    })
    .catch(()=> {
      setProductDetails(null);
      setCategories([]);
      handleOpen();
    })
    .finally(()=> setIsLoading(false));
  }, [id])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <>
    {
      isLoading
      ? <div className="center padding-4"><CircularProgress /></div>
      : productDetails && <>
        <Breadcrumb categories={categories}/>
        <Product product={productDetails} />
      </>
    }
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        This is a success message!
      </Alert>
    </Snackbar>
  </>
}