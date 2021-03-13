import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router';
import { Icon } from '@material-ui/core';

import './Breadcrumb.scss';
import { SEARCH_ITEM_URL } from '../../constants';

interface BreadcrumbProps {
  categories:  string[]
}

export const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({
    categories
}) => {

  const history = useHistory()

  const handleCategoryClick = (category: string) => {
    history.push(`${SEARCH_ITEM_URL}${category}`)
  }

  return <div className="breadcrumb">
    {categories.map((category, index)=>{
      const isLastCategory = index === categories.length-1;

      return <div className={classnames("category", { 'last-category': isLastCategory })} key={index}>
        <span
          onClick={() => handleCategoryClick(category)} 
          className={classnames("padding-1", { 'last-category': isLastCategory })}
        >
          {category}
        </span>
        <Icon className="padding-1">keyboard_arrow_right</Icon>
      </div>
    })}
  </div>
}