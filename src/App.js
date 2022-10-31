import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Web3ReactManager from "./components/App/Web3ReactManager";
import Navbar from "./components/common/Navbar/Navbar";
import { LoopCircleLoading } from "react-loadingg";
import { ToastContainer } from "react-toastify";
import { RefreshContextProvider } from "./context/RefreshContext";
import Announcements from "./components/common/Announcements";
import useGoogleAnalytics from "./hooks/useGoogleAnalytics";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/base.scss";

const Presale = React.lazy(() => import("./pages/Muon"));
const Migrator = React.lazy(() => import("./pages/Migrator"));
const MigratorOther = React.lazy(() => import("./pages/Migrator/Other"));
const Burn = React.lazy(() => import("./pages/burn"));

// const DeiMint = React.lazy(() => import("./pages/Dei/Mint"));
// const DeiZap = React.lazy(() => import('./pages/Dei/Zap'))
// const DeiStaking = React.lazy(() => import("./pages/Dei/Staking"));
// const DeiRedeem = React.lazy(() => import("./pages/Dei/Redeem"));

const Bridge = React.lazy(() => import("./pages/Bridge"));
const NotFound = React.lazy(() => import("./pages/Errors"));
// const Under = React.lazy(() => import('./pages/Maintenance/Under'));

function App() {
  useGoogleAnalytics();

  return (
    <>
      <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
        <Web3ReactManager>
          <RefreshContextProvider>
            <RecoilRoot>
              <Navbar />
              <div id="blur-pop"></div>
              <Announcements />
              <div className="app-body">
                <ToastContainer style={{ maxWidth: "450px", width: "90%" }} />
                <Switch>
                  <Route exact path="/not-found" component={NotFound} />
                  <Route exact path="/muon-presale" component={Presale} />
                  <Route exact path="/migrator" component={Migrator} />
                  <Route
                    exact
                    path="/migrator/other"
                    component={MigratorOther}
                  />
                  <Route exact path="/burn-for-admin" component={Burn} />
                  {/* <Redirect exact from="/stable" to="/stable/mint" /> */}
                  <Route
                    path="/stable/redeem"
                    component={() => {
                      window.location.href =
                        "https://app.dei.finance/redemption";
                      return null;
                    }}
                  />
                  <Route
                    path="/stable"
                    component={() => {
                      window.location.href =
                        "https://app.dei.finance/dashboard";
                      return null;
                    }}
                  />
                  {/* <Route exact path="/stable/zap" component={DeiZap} /> */}
                  {/* <Route exact path="/stable/farms" component={DeiStaking} /> */}
                  {/* <Route
                    path="/bridge"
                    component={() => {
                      window.location.href =
                        "https://app.multichain.org/#/router";
                      return null;
                    }}
                  /> */}

                  <Route exact path="/bridge-old" component={Bridge} />
                  <Redirect exact from="/" to="/migrator" />
                  <Redirect to="not-found" />
                </Switch>
              </div>
            </RecoilRoot>
          </RefreshContextProvider>
        </Web3ReactManager>
      </Suspense>
    </>
  );
}

export default App;
