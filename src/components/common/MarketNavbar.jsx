import React from 'react';
import './market-nav.scss';
import { useState, useEffect } from 'react';

const MarketNavbar = () => {
    const [tvl, setTvl] = useState(null)
    const [vaultsAmount, setVaultsAmount] = useState(null)

    useEffect(() => {
        const getTVL = async () => {
            const url = "https://app.deus.finance/tvl.json"
            try {
                const resp = await fetch(url)
                const result = await resp.json()
                const intResult = parseInt(result.stakingLockedValue + result.vaultLockedValue + result.uniswapLockedValue + result.balancerLockedValue + result.etherLockedInMarketMaker)
                const vaults = parseInt(result.vaultLockedValue)

                var formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0
                });
                setTvl(formatter.format(intResult))
                setVaultsAmount(formatter.format(vaults))
            } catch (error) {
                console.log("fetch " + url + " had some error", error);
            }
        }
        getTVL()
    }, [])

    return (<div className="market-nav-wrap">
        <ul className="market-nav">
            {tvl && <li className="grad-wrap connect-wrap tvl-wrap" >
                <div className={`grad connected`} >
                    <div>TVL:</div>
                    <div>{tvl}</div>
                </div>

            </li>}

            {vaultsAmount && <li className="grad-wrap connect-wrap tvl-wrap">
                <div className={`grad connected`} >
                    <div>Vaults:</div>
                    <div>{vaultsAmount}</div>
                </div>
            </li>}

        </ul>
    </div>);
}

export default MarketNavbar;