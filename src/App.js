import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from './components/common/Navbar';
import Home from './components/Home';
// import Exchange from './components/Exchange';
// import ExchangeMobile from './components/ExchangeMobile';
import NotFound from './components/NotFound';
import Container from './components/Swap/Container';
import Pools from './components/Pools/Pools';


import './styles/scss/style.css';

function App() {

  return (<>
    <Navbar />
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/swap" component={Container} />
      <Route exact path="/pools" component={Pools} />
      {/* <Route exact path="/exchange" component={Container} /> */}
      {/* <Route exact path="/swap" component={isDesktop() ? Migration : MigrationMobile} /> */}
      {/* <Route exact path="/swap" component={Migration} /> */}
      <Route path="/not-found" component={NotFound} />
      <Redirect exact from="/" to="/home" />
      <Redirect to="not-found" />
    </Switch>
  </>);
}

export default App;
