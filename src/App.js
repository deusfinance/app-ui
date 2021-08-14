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

const Deus = React.lazy(() => import('./components/Deus'))
const StakeAndYield = React.lazy(() => import('./pages/StakeAndYield'))
const Swap2 = React.lazy(() => import('./pages/Swap2'))
const Sealed = React.lazy(() => import('./pages/Sealed'))
const NotFound = React.lazy(() => import('./components/NotFound'))


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
                  <Route
                    exact
                    path="/stake-and-yield"
                    component={StakeAndYield}
                  />
                  <Route exact path="/swap2" component={Swap2} />
                  <Route exact path="/sealed-swap" component={Sealed} />
                  <Redirect exact from="/" to="/swap" />
                  <Route path="/" component={Deus} />
                  <Redirect to="not-found" />
                </Switch>
              </div>
              {/* <MarketNavbar /> */}
            </RecoilRoot>
          </RefreshContextProvider>
        </Web3ReactManager>
      </Suspense>
    </>
  )
}

export default App
