import React, { Suspense, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isDesktop } from '../utils/utils';
import { AllTokens, OldStakes } from '../config';
import { LoopCircleLoading } from 'react-loadingg';


const MainSwap = React.lazy(() => import('./Swap/MainSwap'));
const SandTokens = React.lazy(() => import('./Pools/SandTokens'));
const BalancerPool = React.lazy(() => import('./Pools/Liquidity'));
const Vault = React.lazy(() => import('./Vault/Vault'));
const NewOldPools = React.lazy(() => import('./Pools/NewOldPools'));
const SecurityMobile = React.lazy(() => import('./SecurityMobile'));

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
                <Route render={() => <SandTokens allTokens={allTokens} account={account} chainId={chainId} />} exact path="/staking" />
                <Route exact path="/staking/balancer" component={BalancerPool} />
                <Route render={() => <NewOldPools account={account} chainId={chainId} stakedTokens={oldStakes} setStakedTokens={setOldStakes} />} exact path="/staking/pools" />
                <Route exact path="/vaults" render={() => <Vault account={account} chainId={chainId} allTokens={allTokens} />} />
                <Route render={() => <MainSwap account={account} chainId={chainId} setAllTokens={setAllTokens} allTokens={allTokens} />} exact path="/swap" />
                <Redirect from="/" to="/swap" />
            </Switch>
        </Suspense>
    );
}

export default Deus;