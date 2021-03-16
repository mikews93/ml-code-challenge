import React, { FunctionComponent } from 'react';
import { Skeleton } from '@material-ui/lab';

import './Product.scss';

export const ProductLoader: FunctionComponent = () => {
  return <div className="product flex">
    <div className="column">
      <Skeleton variant="rect" className="image" height={700}/>
      <span className="description-title">
        Descripcion del producto
      </span>
      <span className="description-content">
        <Skeleton width={500}/>
        <Skeleton width={500}/>
        <Skeleton width={500}/>
        <Skeleton width={500}/>
      </span>
    </div>
    <div className="column padding-4">
      <Skeleton width={100}/>
      <span className="condition"><Skeleton width={100}/></span>
      <span className="title"><Skeleton width={300}/></span>
      <span className="price"><Skeleton width={100}/></span>

      <Skeleton width={300} height={50}/>
    </div>
  </div>
}