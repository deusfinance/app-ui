import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Web3ReactManager from './components/App/Web3ReactManager';
import MarketNavbar from './components/common/MarketNav/MarketNavbar';
// import Navbar from 'deus-navbar';
import Navbar from './components/common/Navbar/Navbar';
import { LoopCircleLoading } from 'react-loadingg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/base.scss';

const Deus = React.lazy(() => import('./components/Deus'));
const Sync = React.lazy(() => import('./pages/Sync'));
const SyncXdai = React.lazy(() => import('./pages/SyncXdai'));
const NotFound = React.lazy(() => import('./components/NotFound'));
// const Test = React.lazy(() => import('./pages/Test'));
// const Under = React.lazy(() => import('./pages/Maintenance/Under'));


function App() {
  return (<>
    <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
      <Web3ReactManager>
        <Navbar />
        <div id="blur-pop"></div>
        <div className="app-body">
          <ToastContainer style={{ width: "450px" }} />
          <Switch>
            <Route exact path="/not-found" component={NotFound} />
            <Route exact path="/crosschain/xdai/synchronizer" component={SyncXdai} />
            <Route exact path="/synchronizer" component={Sync} />
            {/* <Route exact path="/test-style" component={Test} /> */}
            <Redirect exact from="/" to="/swap" />
            <Route path="/" component={Deus} />
            <Redirect to="not-found" />
          </Switch>
        </div>
        <MarketNavbar />
      </Web3ReactManager>
    </Suspense>
  </>);
}

export default App;
