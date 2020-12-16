import React, { Suspense, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isDesktop } from '../utils/utils';
import { AllTokens, AllStakings } from '../config';
import { LoopCircleLoading } from 'react-loadingg';


const MainSwap = React.lazy(() => import('./Swap/MainSwap'));
const Vault = React.lazy(() => import('./Vault/Vault'));
const StakingManager = React.lazy(() => import('./Pools/Stakings'));



const Deus = () => {

    const Web3React = useWeb3React()
    const { account, chainId } = Web3React
    const [allTokens, setAllTokens] = useState(AllTokens)
    const [allStakings, setAllStakings] = useState(AllStakings)

    useEffect(() => {
        setAllTokens(AllTokens)
        setAllStakings(AllStakings)
    }, [chainId, account])

    const props = {
        allTokens: allTokens,
        allStakings: allStakings,
        account: account,
        chainId: chainId
    }

    return (
        <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
            <Switch>
                <Route exact path="/staking/balancer" render={() => <StakingManager pools={["bpt_native", "bpt_legacy"]} navId={1} {...props} />} />
                <Route exact path="/staking/pools" render={() => <StakingManager pools={["dea_usdc", "deus_dea", "deus", "deus_eth", "ampl_eth", "snx", "uni"]} navId={2} {...props} />} />
                <Route exact path="/staking/sand" render={() => <StakingManager pools={["sand_dea", "sand_deus", "sand_dai", "sand_eth", "sand_wbtc", "timetoken"]} navId={0} {...props} />} />
                <Route exact path="/vaults" render={() => <Vault account={account} chainId={chainId} allTokens={allTokens} />} />
                <Route exact path="/swap" render={() => <MainSwap account={account} chainId={chainId} setAllTokens={setAllTokens} allTokens={allTokens} />} />
                <Redirect from="/staking" to="/staking/sand" />
                <Redirect from="/" to="/swap" />
            </Switch>
        </Suspense>
    );
}

export default Deus;