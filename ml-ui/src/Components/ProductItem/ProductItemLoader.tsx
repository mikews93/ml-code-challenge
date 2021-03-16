import { Skeleton } from '@material-ui/lab';
import React, { FunctionComponent } from 'react';

import './ProductItem.scss';

export const ProductItemLoader: FunctionComponent = () => {
  return <div className="product-item">
    <div className="image-layout">
      <Skeleton variant="rect" className="product-image"/>
    </div>
    <div className="product-info">
      <div>
        <Skeleton width={100}/>
        <Skeleton width={500}/>
      </div>
    </div>  
    <div>
      <Skeleton width={300}/>
    </div>
  </div>
}