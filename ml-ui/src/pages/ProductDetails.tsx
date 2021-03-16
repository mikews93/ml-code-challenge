import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getItemById } from '../Api/routes';
import { Breadcrumb } from '../Components/Breadcrumb/Breadcrumb';
import { Product } from '../Components/Product/Product';
import { Product as ProductType } from '../types/Product';
import { ProductLoader } from '../Components/Product/ProductLoader';
import { GlobalContext } from '../types/Toaster';
import { AppContext } from '../Main/Main';

export const ProductDetails: FunctionComponent = () => {
  const { id }: { id:string } = useParams()

  /**
   * State
   */
  const [productDetails, setProductDetails] = useState<ProductType| null>();
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
    getItemById(id)
    .then(({data})=> {
      setProductDetails(data.item || {});
      setCategories(data.categories || []);
    })
    .catch(()=> {
      setProductDetails(null);
      setCategories([]);
      showToaster({
        message: 'Vaya!, lo lamentamos hubo un error',
        severity: 'error'
      });
    })
    .finally(()=> {
      setIsLoading(false);
      setIsFetchingData(false);
    });
    // eslint-disable-next-line 
  }, [id])
  return <>
    {
      isLoading
      ? <div className="mt-4">
        <ProductLoader />
      </div>
      : productDetails && <>
        <Breadcrumb categories={categories}/>
        <Product product={productDetails} />
      </>
    }
  </>
}