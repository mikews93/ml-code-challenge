import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import { NavSearchBar } from '../Components/NavSearchBar/NavSearchBar';
import { SearchList } from '../Pages/SearchList';
import { ProductDetails } from '../Pages/ProductDetails'
import './Main.scss';

export const Main: FunctionComponent = () => {
  return <>
    <Router>
      <NavSearchBar />
      <div className="container">
          <Switch>
            <Route exact path="/items">
              <SearchList />
            </Route>
            <Route path="/items/:id">
              <ProductDetails />
            </Route>

            <Redirect to="/" />
          </Switch>
      </div>
    </Router>
  </>
}