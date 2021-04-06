import React, { Suspense, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AllTokens, AllStakings } from '../config';
import { LoopCircleLoading } from 'react-loadingg';

const CoinBase = React.lazy(() => import('../pages/Coinbase/Index'));
const Bakkt = React.lazy(() => import('../pages/Bakkt/Bakkt'));
const Musk = React.lazy(() => import('../pages/Musk/Musk'));
const DeaStatic = React.lazy(() => import('../pages/DeaStatic//index'));
const MainSwap = React.lazy(() => import('../pages/Swap/MainSwap'));
const StakingManager = React.lazy(() => import('./Pools/Stakings'));
const Vault = React.lazy(() => import('./Vault/Vault'));
const Dashboard = React.lazy(() => import('./Dashboard/Dashboard'));
// const Under = React.lazy(() => import('../pages/Maintenance/Under'));

const Deus = () => {
    const { account, chainId } = useWeb3React()
    const [allTokens, setAllTokens] = useState(AllTokens)
    const [allStakings, setAllStakings] = useState(AllStakings)


    document.title = "DEUS app"
    useEffect(() => {
        setAllTokens(AllTokens)
        setAllStakings(AllStakings)
    }, [chainId, account])

    const props = {
        allTokens: allTokens,
        setAllTokens: setAllTokens,
        allStakings: allStakings,
        account: account,
        chainId: chainId,
    }

    return (
        <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
            <Switch>
                <Route exact path="/staking/single" render={() => <StakingManager pools={["sand_dea", "sand_deus", "timetoken"]} navId={0} {...props} />} />
                <Route exact path="/staking/liquidity" render={() => <StakingManager pools={["bpt_native"]} navId={1} {...props} />} />
                <Route exact path="/staking/old" render={() => <StakingManager pools={["coinbase_usdc", "deus_dea", "dea_usdc", "deus_eth", "deus", "dea", "ampl_eth", "snx", "uni"]} navId={2} {...props} />} />
                <Route exact path="/swap" render={() => <MainSwap {...props} />} />
                <Route exact path="/coinbase" render={() => <CoinBase {...props} />} />
                {/* <Route exact path="/swap" render={() => <Under />} /> */}
                {/* <Route exact path="/coinbase" render={() => <Under />} /> */}
                <Route exact path="/Bakkt" render={() => <Bakkt {...props} />} />
                <Route exact path="/Musk" render={() => <Musk {...props} />} />
                <Route exact path="/otc-buy" render={() => <DeaStatic {...props} />} />
                <Route exact path="/vaults" render={() => <Vault {...props} />} />
                <Route exact path="/dashboard" render={() => <Dashboard {...props} />} />
                <Redirect from="/staking" to="/staking/single" />
                <Redirect from="/coinbase-staking" to="/staking/old" />
                <Redirect from="/" to="/synchronizer" />
            </Switch>
        </Suspense>
    );
}

export default Deus;