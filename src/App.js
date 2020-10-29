import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from './components/common/Navbar';
import { isDesktop } from './utils/utils';
import { LoopCircleLoading } from 'react-loadingg';
import './styles/scss/base.css';


const PoolsContainer = React.lazy(() => import('./components/Pools/PoolsContainer'));
const NewPoolsContainer = React.lazy(() => import('./components/Pools/NewPoolsContainer'));
const SecurityMobile = React.lazy(() => import('./components/SecurityMobile'));
const SwapContainer = React.lazy(() => import('./components/Swap/SwapContainer'));
const NotFound = React.lazy(() => import('./components/NotFound'));


function App() {

  return (<>
    <Navbar />
    <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
      <Switch>
        <Route exact path="/pools" component={isDesktop() ? PoolsContainer : SecurityMobile} />
        <Route exact path="/staking" component={isDesktop() ? NewPoolsContainer : SecurityMobile} />
        <Route exact path="/swap" component={SwapContainer} />
        <Route path="/not-found" component={NotFound} />
        <Redirect exact from="/" to="/staking" />
        <Redirect to="not-found" />
      </Switch>
    </Suspense>

  </>);
}

export default App;
