import React, { Suspense, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AllTokens, AllStakings } from '../config';
import { LoopCircleLoading } from 'react-loadingg';


const CoinBase = React.lazy(() => import('./Swap/CoinBase'));
const MainSwap = React.lazy(() => import('./Swap/MainSwap'));
const StakingManager = React.lazy(() => import('./Pools/Stakings'));



const Deus = () => {

    const Web3React = useWeb3React()
    const { account, chainId } = Web3React
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
        chainId: chainId
    }

    return (
        <Suspense fallback={<LoopCircleLoading></LoopCircleLoading>}>
            <Switch>
                <Route exact path="/staking/liquidity" render={() => <StakingManager pools={["coinbase_usdc", "deus_dea", "dea_usdc", "deus_eth"]} navId={1} {...props} />} />
                <Route exact path="/staking/single" render={() => <StakingManager pools={["deus", "dea"]} navId={0} {...props} />} />
                <Route exact path="/staking/old" render={() => <StakingManager pools={["ampl_eth", "snx", "uni"]} navId={2} {...props} />} />
                <Route exact path="/swap" render={() => <MainSwap {...props} />} />
                <Route exact path="/coinbase" render={() => <CoinBase {...props} />} />
                <Redirect from="/staking" to="/staking/liquidity" />
                <Redirect from="/coinbase-staking" to="/staking/liquidity" />
                <Redirect from="/" to="/swap" />
            </Switch>
        </Suspense>
    );
}

export default Deus;