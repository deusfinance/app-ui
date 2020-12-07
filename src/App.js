import { Web3ReactProvider } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

import Web3 from 'web3'

import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from './components/common/Navbar';
import { isDesktop } from './utils/utils';
import { LoopCircleLoading } from 'react-loadingg';

import './styles/scss/base.scss';

// const PoolsContainer = React.lazy(() => import('./components/Pools/PoolsContainer'));
// const NewPoolsContainer = React.lazy(() => import('./components/Pools/NewPoolsContainer'));
const SecurityMobile = React.lazy(() => import('./components/SecurityMobile'));
// const SwapContainer = React.lazy(() => import('./components/Swap/SwapContainer'));
const MainSwap = React.lazy(() => import('./components/Swap/MainSwap'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const ConductrContainer = React.lazy(() => import('./components/Conductr/ConductrContainer'));
const BuildRegistrar = React.lazy(() => import('./components/Conductr/BuildRegistrar'));
const NewStaking = React.lazy(() => import('./components/Pools/NewStaking'));
const BalancerPool = React.lazy(() => import('./components/Pools/Balancer/BalancerPool'));
const TimeToken = React.lazy(() => import('./components/Pools/TimeToken'));
const Vault = React.lazy(() => import('./components/Vault/Vault'));

function getLibrary(provider, connector) {
  const library = new Web3(provider) // this will vary according to whether you use e.g. ethers or web3.js
  library.pollingInterval = 12000
  return library
}

function App() {
  return (<>
    <Web3ReactProvider getLibrary={getLibrary}>
      <div id="blur-pop"></div>
      <Navbar />
      <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
        <Switch>
          {/* <Route exact path="/pools" component={isDesktop() ? PoolsContainer : SecurityMobile} /> */}
          {/* <Route exact path="/staking" component={isDesktop() ? NewPoolsContainer : SecurityMobile} /> */}
          <Route exact path="/new-staking" component={isDesktop() ? NewStaking : SecurityMobile} />
          <Route exact path="/balancer" component={BalancerPool} />
          <Route exact path="/timetoken" component={TimeToken} />
          {/* <Route exact path="/swap" component={SwapContainer} /> */}
          <Route exact path="/vaults" component={Vault} />
          <Route exact path="/swap" component={MainSwap} />
          <Route exact path="/conductr/*" component={BuildRegistrar} />
          <Route path="/conductr" component={ConductrContainer} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/swap" />
          <Redirect to="not-found" />
        </Switch>
      </Suspense>
    </Web3ReactProvider>
  </>);
}

export default App;
