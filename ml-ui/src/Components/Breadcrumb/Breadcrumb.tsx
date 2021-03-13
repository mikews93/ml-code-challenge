import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

import './Breadcrumb.scss';

interface BreadcrumbProps {
    categories:  string[]
}

export const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({
    categories
}) => {
  return <div className="breadcrumb">
    {categories.map((category, index)=>{
      const isLastCategory = index === categories.length-1;

      return <div key={index}>
        <span className={classnames("padding-1", { 'last-category': isLastCategory })}>{category}</span>
        {!isLastCategory && <span className="padding-1">{`>`}</span>}
      </div>
    })}
  </div>
}