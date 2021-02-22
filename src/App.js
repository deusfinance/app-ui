import { useWeb3React } from '@web3-react/core';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { injected } from './connectors';
import { useEagerConnect } from './hooks';
import Navbar from './components/common/Navbar';
import { LoopCircleLoading } from 'react-loadingg';
import 'react-toastify/dist/ReactToastify.css';
// import Footer from './components/common/Footer';
import './styles/scss/base.scss';

const Deus = React.lazy(() => import('./components/Deus'));
const Sync = React.lazy(() => import('./pages/Sync'));
// const Stonks = React.lazy(() => import('./pages/Stonks/index'));
const Bridge = React.lazy(() => import('./pages/Bridge/BridgeWrap'));

const NotFound = React.lazy(() => import('./components/NotFound'));

function App() {

  const context = useWeb3React()
  // const { connector, library, chainId, account, activate, deactivate, active, error } = context
  const { connector, chainId } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector, chainId])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  useEagerConnect(injected)

  return (<>

    <div id="blur-pop"></div>
    <Navbar cweb={context} />
    <div className="app-body">
      <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
        <Switch>
          <Route exact path="/not-found" component={NotFound} />
          <Route exact path="/bridge" component={Bridge} />
          {/* <Route exact path="/synchronizer/swaggy" component={Stonks} /> */}
          <Route exact path="/synchronizer" component={Sync} />
          <Redirect exact from="/" to="/swap" />
          <Route path="/" component={Deus} />
          <Redirect to="not-found" />
        </Switch>
      </Suspense>
    </div>
    {/* <Footer /> */}
  </>);
}

export default App;
