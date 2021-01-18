import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AllTokens, AllStakings, TokenType } from '../config';
import { LoopCircleLoading } from 'react-loadingg';
import { deployedStocks, useAllStocks } from '../utils/stocks';
import _ from "lodash"

const CoinBase = React.lazy(() => import('./Swap/CoinBase'));
const Bakkt = React.lazy(() => import('./Swap/Bakkt'));
const MainSwap = React.lazy(() => import('./Swap/MainSwap'));
const StockSwap = React.lazy(() => import('./Swap/StockSwap'));
const StakingManager = React.lazy(() => import('./Pools/Stakings'));
const Vault = React.lazy(() => import('./Vault/Vault'));
const Dashboard = React.lazy(() => import('./Dashboard/Dashboard'));

const Deus = () => {
    const { account, chainId } = useWeb3React()
    const version = 1
    const [allTokens, setAllTokens] = useState(AllTokens)
    const [allStakings, setAllStakings] = useState(AllStakings)
    const [allStocks, setStocks] = useState(useAllStocks())

    const deployed = useMemo(() => {
        let arr = []
        arr.push({ symbol: "DAI", name: "DAI", isDeployed: true, chainId: 4, address: "0xc00a00000000000000", logo: "/tokens/dai.png" })
        const deploydStocks = allStocks.filter(stock => stock.isDeployed && stock.type === TokenType.Wrapped)
        deploydStocks.map(stock => {
            arr.push({ symbol: "LONG-" + stock.symbol, type: stock.type, chainId: stock.chainId, logo: stock.logo, isDeployed: true, ...stock.long })
            arr.push({ symbol: "SHORT-" + stock.symbol, type: stock.type, chainId: stock.chainId, logo: stock.logo, isDeployed: true, ...stock.short })
        })
        return arr
    }, [version, chainId, account])

    const index = _.findIndex(allStocks, { symbol: "AAPL" });
    const item = allStocks[index]
    console.log(item);
    // const [deployed, setDeployed] = useState(deployedStocks())

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
                <Route exact path="/staking/single" render={() => <StakingManager pools={["sand_dea", "sand_deus", "timetoken"]} navId={0} {...props} />} />
                <Route exact path="/staking/liquidity" render={() => <StakingManager pools={["bpt_native"]} navId={1} {...props} />} />
                <Route exact path="/staking/old" render={() => <StakingManager pools={["coinbase_usdc", "deus_dea", "dea_usdc", "deus_eth", "deus", "dea", "ampl_eth", "snx", "uni"]} navId={2} {...props} />} />
                <Route exact path="/swap" render={() => <MainSwap {...props} />} />
                <Route exact path="/stock-swap" render={() => <StockSwap {...props} allStocks={allStocks} deployed={deployed} />} />
                <Route exact path="/coinbase" render={() => <CoinBase {...props} />} />
                <Route exact path="/Bakkt" render={() => <Bakkt {...props} />} />
                <Route exact path="/vaults" render={() => <Vault {...props} />} />
                <Route exact path="/dashboard" render={() => <Dashboard {...props} />} />

                <Redirect from="/staking" to="/staking/single" />
                <Redirect from="/coinbase-staking" to="/staking/old" />
                <Redirect from="/" to="/swap" />
            </Switch>
        </Suspense>
    );
}

export default Deus;