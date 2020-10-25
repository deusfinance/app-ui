import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
// import Home from './components/Home';
// import NotFound from './components/NotFound';
// import PoolsContainer from './components/Pools/PoolsContainer';
// import SwapContainer from './components/Swap/SwapContainer';
// import SecurityMobile from './components/SecurityMobile';
import Navbar from './components/common/Navbar';
import { isDesktop } from './utils/utils';
import './styles/scss/style.css';
import { LoopCircleLoading } from 'react-loadingg';


const PoolsContainer = React.lazy(() => import('./components/Pools/PoolsContainer'));
const NewPoolsContainer = React.lazy(() => import('./components/Pools/NewPoolsContainer'));
const SecurityMobile = React.lazy(() => import('./components/SecurityMobile'));
const SwapContainer = React.lazy(() => import('./components/Swap/SwapContainer'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const ConductrContainer = React.lazy(() => import('./components/Conductr/ConductrContainer'));
const BuildRegistrar = React.lazy(() => import('./components/Conductr/BuildRegistrar'));



function App() {

  return (<>
    <Navbar />
    <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
      <Switch>
        <Route exact path="/pools" component={isDesktop() ? PoolsContainer : SecurityMobile} />
        <Route exact path="/staking" component={isDesktop() ? NewPoolsContainer : SecurityMobile} />
        <Route exact path="/swap" component={SwapContainer} />
        <Route path="/conductr/build" component={BuildRegistrar} />
        <Route path="/conductr" component={ConductrContainer} />
        <Route path="/not-found" component={NotFound} />
        <Redirect exact from="/" to="/staking" />
        <Redirect to="not-found" />
      </Switch>
    </Suspense>

  </>);
}

export default App;
