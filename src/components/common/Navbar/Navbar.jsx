import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next'
import Wallets from './Wallets';
import { NavbarWrap, NavButton, NavbarSideWrap, } from '../../App/Navbar';
import { ExternalLink } from '../../App/Link';
import useRefresh from '../../../hooks/useRefresh';
import routes from '../../../config/routes.json'
import NavDesktop from './NavDesktopContent';
import NavMobile from './NavMobileContent';
import NavSide from './NavSide';

const Navbar = () => {
    const { chainId, account } = useWeb3React()
    const [showWallets, setShowWallets] = useState(false)
    const [open, setOpen] = useState(false)
    const [tvl, setTvl] = useState(null)
    const { t } = useTranslation()

    useEffect(() => {
        if (account)
            setShowWallets(false)
    }, [account])

    const { slowRefresh } = useRefresh()

    useEffect(() => {
        const getTVL = async () => {
            const url = "https://app.deus.finance/tvl.json"
            try {
                const resp = await fetch(url)
                const result = await resp.json()
                const intResult = parseInt(result.stakingLockedValue + result.vaultLockedValue + result.uniswapLockedValue + result.balancerLockedValue + result.etherLockedInMarketMaker + result.stakingV2LockedValue)
                var formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0
                });
                setTvl(formatter.format(intResult))
            } catch (error) {
                console.log("fetch " + url + " had some error", error);
            }
        }
        getTVL()
    }, [slowRefresh])

    const handleConnect = async () => {
        setShowWallets(true)
    }

    useEffect(() => {
        const blurPop = "blured"
        if (typeof document === undefined) return
        if (!(open)) {
            document.getElementById("blur-pop").classList.remove(blurPop)
        } else {
            document.getElementById("blur-pop").classList.add(blurPop)
        }
    }, [open])

    return (<>
        <Wallets showWallets={showWallets} setShowWallets={setShowWallets} />
        <NavbarWrap>
            <NavbarSideWrap className="deus-logo" style={{ zIndex: 1 }}>
                <ExternalLink href="https://deus.finance" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                    <img style={{ width: "32px" }} src="/img/deus.svg" alt="deus" />
                    <img style={{ height: "22px", marginLeft: "10px" }} className="deus-text" src="/img/deus-text.svg" alt="deus" />
                </ExternalLink>
                {tvl && <NavButton className="tvl" active={false} >
                    {t("tvl")}: {tvl}
                </NavButton>}
            </NavbarSideWrap>

            <NavDesktop routes={routes} />
            <NavMobile routes={routes} open={open} setOpen={setOpen} />
            <NavSide account={account} chainId={chainId} open={open} setOpen={setOpen} handleConnect={handleConnect} />

        </NavbarWrap>
    </>);
}

export default Navbar;



