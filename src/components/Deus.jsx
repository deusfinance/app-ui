import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isDesktop } from '../utils/utils';

const MainSwap = React.lazy(() => import('./Swap/MainSwap'));
const SandTokens = React.lazy(() => import('./Pools/SandTokens'));
const BalancerPool = React.lazy(() => import('./Pools/Liquidity'));
const Vault = React.lazy(() => import('./Vault/Vault'));
const NewOldPools = React.lazy(() => import('./Pools/NewOldPools'));
const SecurityMobile = React.lazy(() => import('./SecurityMobile'));


const Deus = () => {
    const Web3React = useWeb3React()
    const { account, chainId } = Web3React
    return (
        <Switch>
            <Route exact path="/staking" component={isDesktop() ? SandTokens : SecurityMobile} />
            <Route exact path="/staking/balancer" component={BalancerPool} />
            <Route render={() => <NewOldPools account={account} chainId={chainId} />} exact path="/staking/pools" />
            <Route exact path="/vaults" component={Vault} />
            <Route render={() => <MainSwap account={account} chainId={chainId} />} exact path="/swap" />
            <Redirect from="/" to="/swap" />
        </Switch>
    );
}

export default Deus;