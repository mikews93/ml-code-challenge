import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';

import { ITEM_URL } from '../../constants';
import { Product } from '../../types/Product';
import {formatPrice } from '../../utils';

import './ProductItem.scss';
interface ProductItemProps {
  product: Product
}

export const ProductItem: FunctionComponent<ProductItemProps> = ({product}) => {
  
  const history = useHistory()

  const goToDetails = () => {
    history.push(`${ITEM_URL}/${product.id}`);
  }

  return <div className="product-item" >
    <div className="image-layout">
      <img src={product.thumbnail} alt={product.title} className="product-image"onClick={goToDetails} />
    </div>
    <div className="product-info">
      <div>
        <div className="price" onClick={goToDetails}>{formatPrice(product.price)}</div>
        <div className="title">{product.title}</div>
      </div>
    </div>  
    <div>
      <div className="state">{product.state}</div>
    </div>  
  </div>
}