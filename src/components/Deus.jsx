import React, { Suspense, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { isDesktop } from '../utils/utils';
import { AllTokens, OldStakes, AllStakings } from '../config';
import { LoopCircleLoading } from 'react-loadingg';


const MainSwap = React.lazy(() => import('./Swap/MainSwap'));
const SandTokens = React.lazy(() => import('./Pools/SandTokens'));
const BalancerPool = React.lazy(() => import('./Pools/Liquidity'));
const Vault = React.lazy(() => import('./Vault/Vault'));
const NewOldPools = React.lazy(() => import('./Pools/NewOldPools'));
const SecurityMobile = React.lazy(() => import('./SecurityMobile'));
const StakingManager = React.lazy(() => import('./Pools/Stakings'));

const Deus = () => {

    const Web3React = useWeb3React()
    const { account, chainId } = Web3React


    const [allTokens, setAllTokens] = useState(AllTokens)
    const [oldStakes, setOldStakes] = useState()


    useEffect(() => {
        setAllTokens(AllTokens)
        setOldStakes(OldStakes)
    }, [chainId, account])

    return (
        <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
            <Switch>

                <Route render={() => <SandTokens allTokens={allTokens} account={account} chainId={chainId} />} exact path="/staking/sand" />
                {/* <Route render={() => <StakingManager allTokens={allTokens} pools={["bpt_native", "bpt_legacy"]} navId={1} stakings={AllStakings.balancer} account={account} chainId={chainId} />} exact path="/staking/balancer" /> */}
                {/* <Route render={() => <StakingManager allTokens={allTokens} pools={["deus", "uni", "snx"]} navId={2} stakings={OldStakes} account={account} chainId={chainId} />} exact path="/staking/pools" /> */}
                {/* <Route render={() => <StakingManager allTokens={allTokens} pools={["sand_dea", "sand_deus", "sand_dai", "sand_eth", "sand_wbtc", "timetoken"]} navId={0} stakings={AllStakings.sand} account={account} chainId={chainId} />} exact path="/staking/sand" /> */}
                {/* <Route component={withRouter(StakingManager)} allTokens={allTokens} pools={["sand_dea", "sand_deus", "sand_dai", "sand_eth", "sand_wbtc", "timetoken"]} navId={0} stakings={AllStakings.sand} account={account} chainId={chainId} exact path="/staking" /> */}
                <Route render={() => <BalancerPool allTokens={allTokens} account={account} chainId={chainId} />} exact path="/staking/balancer" />
                <Route render={() => <NewOldPools account={account} chainId={chainId} stakedTokens={oldStakes} setStakedTokens={setOldStakes} />} exact path="/staking/pools" />
                <Redirect from="/staking" to="/staking/sand" />

                <Route exact path="/vaults" render={() => <Vault account={account} chainId={chainId} allTokens={allTokens} />} />
                <Route render={() => <MainSwap account={account} chainId={chainId} setAllTokens={setAllTokens} allTokens={allTokens} />} exact path="/swap" />
                <Redirect from="/" to="/swap" />
            </Switch>
        </Suspense>
    );
}

export default Deus;