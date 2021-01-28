import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AllTokens, AllStakings } from '../config';
import { LoopCircleLoading } from 'react-loadingg';
import Test from './Test/Test';

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
    // const [allStocks, setStocks] = useState(useAllStocks())
    const [nAllStocks, setnAllStocks] = useState(null)
    const deployed = useMemo(() => {
        let arr = []
        arr.push({ symbol: "DAI", name: "DAI", title: "DAI", "conducted": true, chainId: 4, address: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735", logo: "/tokens/dai.png" })
        return arr
    }, [version, chainId, account])


    document.title = "DEUS app"
    useEffect(() => {
        async function getStocks() {
            try {
                const resp = await fetch("https://test.deus.finance/oracle-files/registrar.json")
                const respj = await resp.json()
                setnAllStocks(respj)
            } catch (error) {
                console.log(" get Market Amounts had some error", error);
            }
        }
        getStocks()
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
                <Route exact path="/synchronizer" render={() => <StockSwap {...props} deployed={deployed} nAllStocks={nAllStocks} setnAllStocks={setnAllStocks} />} />
                <Route exact path="/coinbase" render={() => <CoinBase {...props} />} />
                <Route exact path="/Bakkt" render={() => <Bakkt {...props} />} />
                <Route exact path="/vaults" render={() => <Vault {...props} />} />
                <Route exact path="/dashboard" render={() => <Dashboard {...props} />} />

                <Route exact path="/test" render={() => <Test />} />

                <Redirect from="/staking" to="/staking/single" />
                <Redirect from="/coinbase-staking" to="/staking/old" />
                <Redirect from="/" to="/synchronizer" />
            </Switch>
        </Suspense>
    );
}

export default Deus;