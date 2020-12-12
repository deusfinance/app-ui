import { useWeb3React } from '@web3-react/core';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { injected } from './connectors';
import { useEagerConnect } from './hooks';
import Navbar from './components/common/Navbar';
import Deus from './components/Deus';

import { LoopCircleLoading } from 'react-loadingg';
import 'react-toastify/dist/ReactToastify.css';

import './styles/scss/base.scss';

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
  const triedEager = useEagerConnect(injected)

  return (<>

    <div id="blur-pop"></div>
    <Navbar cweb={context} />
    <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
      <Switch>
        <Route exact path="/not-found" component={NotFound} />
        <Redirect exact from="/" to="/swap" />
        <Route path="/" component={Deus} />
        <Redirect to="not-found" />
      </Switch>
    </Suspense>
  </>);
}

export default App;
