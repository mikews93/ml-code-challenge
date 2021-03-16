import React, { FunctionComponent, useState, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { LinearProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { NavSearchBar } from '../Components/NavSearchBar/NavSearchBar';
import { SearchList } from '../Pages/SearchList';
import { ProductDetails } from '../Pages/ProductDetails'
import { GlobalContext, Toaster } from '../types/Toaster';
import { HOME_URL, ITEM_BY_ID_URL, ITEM_URL } from '../constants';

import './Main.scss';

export const AppContext = createContext<GlobalContext>({ showToaster: () =>{}, setIsFetchingData: () => {}});

export const Main: FunctionComponent = () => {
  const [toaster, setToaster] = useState<Toaster>({
    visible: false,
    message: '',
    severity: 'info'
  });
  const [isFetchingData, setIsFetchingData] =useState(false);

  const handleClose = () => {
    setToaster({ ...toaster, visible: false})
  }

  const showToaster = ({message='', severity = 'info'}: Partial<Toaster>) => {
    setToaster({
      visible: true,
      message,
      severity
    })
  }
  return <>
    <Router>
      <AppContext.Provider value={{
        showToaster,
        setIsFetchingData
      }}>
        {isFetchingData && <LinearProgress color="primary" />}
        <NavSearchBar />
        <div className="container">
          <Switch>
            <Route exact path={ITEM_URL}>
              <SearchList />
            </Route>
            <Route path={ITEM_BY_ID_URL}>
              <ProductDetails />
            </Route>

            <Redirect to={HOME_URL} />
          </Switch>
        </div>
        <Snackbar open={toaster.visible} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={toaster.severity}>
            {toaster.message}
          </Alert>
        </Snackbar>
      </AppContext.Provider>
    </Router>
  </>
}