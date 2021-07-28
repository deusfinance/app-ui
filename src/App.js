import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Web3ReactManager from './components/App/Web3ReactManager'
import Navbar from './components/common/Navbar/Navbar'
import { LoopCircleLoading } from 'react-loadingg'
import { ToastContainer } from 'react-toastify'
import { RefreshContextProvider } from './helper/RefreshContex'
import Announcements from './components/common/Announcements'
import useGoogleAnalytics from './helper/useGoogleAnalytics'

import 'react-toastify/dist/ReactToastify.css'
import './assets/styles/base.scss'

const Deus = React.lazy(() => import('./components/Deus'))
const StakeAndYield = React.lazy(() => import('./pages/StakeAndYield'))
const Swap2 = React.lazy(() => import('./pages/Swap2'))
const DeiMint = React.lazy(() => import('./pages/Dei/Mint'))
const DeiRedeem = React.lazy(() => import('./pages/Dei/Redeem'))
const DeiBuyBackRecollateralize = React.lazy(() => import('./pages/Dei/BuyBackRecollateralize'))

const Sealed = React.lazy(() => import('./pages/Sealed'))
const Muon = React.lazy(() => import('./pages/Muon'))
const SyncXdai = React.lazy(() => import('./pages/SyncXdai'))
const SyncHeco = React.lazy(() => import('./pages/SyncHeco'))
const SyncMatic = React.lazy(() => import('./pages/SyncMatic'))
const SyncMain = React.lazy(() => import('./pages/SyncMain'))
const SyncBSC = React.lazy(() => import('./pages/SyncBsc'))
const NotFound = React.lazy(() => import('./components/NotFound'))

// const SyncMatic = React.lazy(() => import('./pages/SyncMatic'))
// const Bridge = React.lazy(() => import('./components/Bridge'))
// const Under = React.lazy(() => import('./pages/Maintenance/Under'));
// const Sync = React.lazy(() => import('./pages/Sync'));
// const SyncBSCTest = React.lazy(() => import('./pages/SyncBscTest'));
// const dbETH = React.lazy(() => import('./pages/dbETH'))



function App() {

  useGoogleAnalytics()

  return (
    <>
      <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
        <Web3ReactManager>
          <RefreshContextProvider>
            <Navbar />
            <div id="blur-pop"></div>
            <Announcements />
            <div className="app-body">
              <ToastContainer style={{ maxWidth: '450px', width: "90%" }} />
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
                <Route
                  exact
                  path="/crosschain/polygon/synchronizer"
                  component={SyncMatic}
                />
                <Route exact path="/synchronizer" component={SyncMain} />
                <Route
                  exact
                  path="/stake-and-yield"
                  component={StakeAndYield}
                />
                {/* <Route exact path="/dbETH" component={dbETH} /> */}
                {/* <Route exact path="/bridge" component={Bridge} /> */}
                <Route exact path="/swap2" component={Swap2} />
                <Redirect exact from="/dei" to="/dei/mint" />
                <Route exact path="/dei/mint" component={DeiMint} />
                <Route exact path="/dei/redeem" component={DeiRedeem} />
                <Route exact path="/dei/buyback-recollat" component={DeiBuyBackRecollateralize} />
                <Route exact path="/sealed-swap" component={Sealed} />
                <Route exact path="/muon-presale" component={Muon} />
                <Redirect exact from="/" to="/swap" />
                <Route path="/" component={Deus} />
                <Redirect to="not-found" />
              </Switch>
            </div>
            {/* <MarketNavbar /> */}
          </RefreshContextProvider>
        </Web3ReactManager>
      </Suspense>
    </>
  )
}

export default App
