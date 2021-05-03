import React from 'react';
import './market-nav.scss';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'

const MarketNavbar = () => {
    const [tvl, setTvl] = useState(null)
    const [vaultsAmount, setVaultsAmount] = useState(null)
    const {t} = useTranslation()
    useEffect(() => {
        const getTVL = async () => {
            const url = "https://app.deus.finance/tvl.json"
            try {
                const resp = await fetch(url)
                const result = await resp.json()
                console.log(result);
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
                    <div>{t("tvl")}:</div>
                    <div>{tvl}</div>
                </div>

            </li>}

            {vaultsAmount && <li className="grad-wrap connect-wrap tvl-wrap">
                <div className={`grad connected`} >
                    <div>{t("vaults")}:</div>
                    <div>{vaultsAmount}</div>
                </div>
            </li>}

        </ul>
    </div>);
}

export default MarketNavbar;