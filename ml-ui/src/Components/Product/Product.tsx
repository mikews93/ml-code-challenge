import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';
import Helmet from 'react-helmet';

import { Product as ProductType } from '../../Types/Product';
import { formatPrice } from '../../utils';

import './Product.scss';

interface ProductProps {
  product: ProductType;
}

export const Product: FunctionComponent<ProductProps> = ({product}) => {
  return <div className="product">
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`${product.title} | ${formatPrice(product.price)} | ${product.condition}`}</title>
    </Helmet>
    <div>
      <img src={product.picture} alt={product.title} className="image"/>
      <span className="description-title">
        Descripcion del producto
      </span>
      <span className="description-content">
        {product.description}
      </span>
    </div>
    <div>
      <span className="condition">{`${product.condition} - ${product.sold_quantity} vendidos`}</span>
      <span className="title">{product.title}</span>
      <span className="price">{formatPrice(product.price)}</span>

      <Button className="buy-btn">Comprar</Button>
    </div>
  </div>
}