import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from './components/common/Navbar';
import Home from './components/Home';
import NotFound from './components/NotFound';
import PoolsContainer from './components/Pools/PoolsContainer';
import SwapContainer from './components/Swap/SwapContainer';
import SecurityMobile from './components/SecurityMobile';

import { isDesktop } from './utils/utils';

import './styles/scss/style.css';

function App() {

  return (<>
    <Navbar />
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/pools" component={isDesktop() ? PoolsContainer : SecurityMobile} />
      <Route exact path="/swap" component={SwapContainer} />
      <Route path="/not-found" component={NotFound} />
      <Redirect exact from="/" to="/home" />
      <Redirect to="not-found" />
    </Switch>
  </>);
}

export default App;
