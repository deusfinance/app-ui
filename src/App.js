import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Web3ReactManager from './components/App/Web3ReactManager'
import MarketNavbar from './components/common/MarketNav/MarketNavbar'
import Navbar from './components/common/Navbar/Navbar'
import { LoopCircleLoading } from 'react-loadingg'
import { ToastContainer } from 'react-toastify'
import { RefreshContextProvider } from './helper/RefreshContex'
import Announcements from './components/common/Announcements'
import 'react-toastify/dist/ReactToastify.css'
import './assets/styles/base.scss'

const Deus = React.lazy(() => import('./components/Deus'))
const Sync2 = React.lazy(() => import('./pages/Sync2'));
const dbETH = React.lazy(() => import('./pages/dbETH'))
const SyncBSC = React.lazy(() => import('./pages/SyncBsc'))
const SyncHeco = React.lazy(() => import('./pages/SyncHeco'))
const StakeAndYield = React.lazy(() => import('./pages/StakeAndYield'))
const Swap2 = React.lazy(() => import('./pages/Swap2'))
const SyncXdai = React.lazy(() => import('./pages/SyncXdai'))
const SyncMain = React.lazy(() => import('./pages/SyncMain'))
const NotFound = React.lazy(() => import('./components/NotFound'))
const Bridge = React.lazy(() => import('./components/Bridge'))
// const Test = React.lazy(() => import('./pages/Test'));
// const Under = React.lazy(() => import('./pages/Maintenance/Under'));

function App() {
  return (
    <>
      <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
        <Web3ReactManager>
          <RefreshContextProvider>
            <Navbar />
            <div id="blur-pop"></div>
            <Announcements />
            <div className="app-body">
              <ToastContainer style={{ width: '450px' }} />
              <Switch>
                <Route exact path="/not-found" component={NotFound} />
                <Route
                  exact
                  path="/crosschain/xdai/synchronizer"
                  component={SyncXdai}
                />
                <Route
                  exact
                  path="/crosschain/bsc/synchronizer"
                  component={SyncBSC}
                />
                <Route
                  exact
                  path="/crosschain/heco/synchronizer"
                  component={SyncHeco}
                />
                <Route exact path="/synchronizer" component={SyncMain} />
                <Route
                  exact
                  path="/stake-and-yield"
                  component={StakeAndYield}
                />
                <Route exact path="/dbETH" component={dbETH} />
                <Route exact path="/bridge" component={Bridge} />
                <Route exact path="/sync2" component={Sync2} />
                <Route exact path="/swap2" component={Swap2} />
                <Redirect exact from="/" to="/swap" />
                <Route path="/" component={Deus} />
                {/* <Route exact path="/test-style" component={Test} /> */}
                <Redirect to="not-found" />
              </Switch>
            </div>
            <MarketNavbar />
          </RefreshContextProvider>
        </Web3ReactManager>
      </Suspense>
    </>
  )
}

export default App
