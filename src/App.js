import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Web3ReactManager from './components/App/Web3ReactManager'
import Navbar from './components/common/Navbar/Navbar'
import Updater from './components/common/Updater'
import { LoopCircleLoading } from 'react-loadingg'
import { ToastContainer } from 'react-toastify'
import { RefreshContextProvider } from './context/RefreshContext'
import Announcements from './components/common/Announcements'
import useGoogleAnalytics from './hooks/useGoogleAnalytics'
import { RecoilRoot } from 'recoil';
import 'react-toastify/dist/ReactToastify.css'
import './assets/styles/base.scss'

const Migrator = React.lazy(() => import('./pages/Migrator'))
const burn = React.lazy(() => import('./pages/burn'))

const DeiMint = React.lazy(() => import('./pages/Dei/Mint'))
const DeiZap = React.lazy(() => import('./pages/Dei/Zap'))
const DeiStaking = React.lazy(() => import('./pages/Dei/Staking'))
const DeiRedeem = React.lazy(() => import('./pages/Dei/Redeem'))
const DeiBuyBackRecollateralize = React.lazy(() => import('./pages/Dei/BuyBackRecollateralize'))

const Muon = React.lazy(() => import('./pages/Muon'))
const NotFound = React.lazy(() => import('./pages/Errors'))
// const Under = React.lazy(() => import('./pages/Maintenance/Under'));

function App() {
  useGoogleAnalytics()

  return (
    <>
      <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
        <Web3ReactManager>
          <RefreshContextProvider>
            <RecoilRoot>
              <Updater />
              <Navbar />
              <div id="blur-pop"></div>
              <Announcements />
              <div className="app-body">
                <ToastContainer style={{ maxWidth: '450px', width: "90%" }} />
                <Switch>
                  <Route exact path="/not-found" component={NotFound} />
                  <Route exact path="/migrator" component={Migrator} />
                  <Route exact path="/burn-for-admin" component={burn} />
                  <Redirect exact from="/stable" to="/stable/mint" />
                  <Route exact path="/stable/mint" component={DeiMint} />
                  <Route exact path="/stable/zap" component={DeiZap} />
                  <Route exact path="/stable/farms" component={DeiStaking} />
                  <Route exact path="/stable/redeem" component={DeiRedeem} />
                  <Route exact path="/stable/buyback-recollat" component={DeiBuyBackRecollateralize} />
                  <Route exact path="/muon-presale" component={Muon} />
                  <Route path="/crosschain/:id/muon-presale" component={Muon} />
                  <Redirect exact from="/" to="/migrator" />
                  <Redirect to="not-found" />
                </Switch>
              </div>
            </RecoilRoot>
          </RefreshContextProvider>
        </Web3ReactManager>
      </Suspense>
    </>
  )
}

export default App
