import { useWeb3React } from '@web3-react/core';
import { injected, } from '../../../connectors';
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import navbarItems from "./navs"
import SubNavbar from './SubNavbar';
import { formatAddress, getStayledNumber, notify, isDesktop } from '../../../utils/utils';
import { SwapService } from '../../../services/SwapService';
import Wallets from './Wallets';
import { addRPC } from '../../../services/addRPC';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next'
import { getCorrectChains } from '../../../constant/correctChain';
import { NameChainMap } from '../../../constant/web3';

import './navbar.scss';
const Navs = navbarItems

const Navbar = () => {

    const web3React = useWeb3React()
    const { chainId, account, activate } = web3React
    const [menuMobileClass, setMenuMobileClass] = useState("close-menu");
    const [claimAmount, setClaim] = useState(0)
    const [web3, setWeb3] = useState(null)
    const [showWallets, setShowWallets] = useState(false)
    const location = useLocation()
    const { t } = useTranslation()

    useEffect(() => {
        if (!isDesktop()) {
            try {
                activate(injected)
            } catch (error) {
                console.log(error);
            }
        }
    }, [chainId, activate])

    useEffect(() => {
        setShowWallets(false)
    }, [account])

    const methods = {
        onStart: () => {
            console.log("onStart")
        },
        onSuccess: () => {
            console.log("onSuccess")
            setClaim(0)
        },
        onError: () => console.log("onError"),
    }

    const handleClaim = async () => {
        try {
            await web3.withdrawPayment(notify(methods))
        } catch (error) {
            console.log("claim eth error");
        }
    }

    const claimButton = parseFloat(claimAmount) > 0.000001 ? <li className="grad-wrap claimable-btn" onClick={handleClaim}>
        <div className={`grad `}>
            <div> {getStayledNumber(claimAmount)} ETH</div>
            <div>{t("claim")}</div>
        </div>
    </li> : null

    useEffect(() => {
        const getClaimable = async (swapServie) => {
            try {
                const amount = await swapServie.getWithdrawableAmount()
                setClaim(amount)
                return amount
            } catch (error) {
                return 0
            }
        }

        if (account && chainId) {
            const swapServie = new SwapService(account, 1)
            setWeb3(swapServie)
            getClaimable(swapServie)

        }
    }, [account, chainId])

    const handleConnect = async () => {
        setShowWallets(true)
        return
    }

    const toggleNav = () => {
        if (menuMobileClass === "close-menu") {
            setMenuMobileClass("open-menu")
            return
        }
        setMenuMobileClass("close-menu")
    }

    const connectCalass = account ? "connected" : "connect"
    const validChains = getCorrectChains(location.pathname)

    return (<>
        {showWallets && <Wallets setShow={setShowWallets} />}
        <nav id="nav">
            <div className="left-nav-wrap">
                <ul className="left-nav">
                    <li>
                        <a className="logo-wrap" href="https://deus.finance/">
                            <img src={process.env.PUBLIC_URL + "/img/logo.svg"} alt="logo" />
                        </a>
                    </li>

                    {<li className="grad-wrap connect-wrap" onClick={handleConnect}>
                        <div className={`grad ${connectCalass}`} style={{ cursor: connectCalass === "connect" ? "pointer" : "default" }}>{t(formatAddress(account))}</div>
                    </li>}

                    {chainId && <li className="grad-wrap connect-wrap network-name" >
                        <div className={`grad connected`} style={{ cursor: "default" }}>{NameChainMap[chainId]}</div>
                    </li>}

                    {chainId && validChains.indexOf(chainId) === -1 && <>
                        <li className="grad-wrap  wrong-network" >
                            <div className={`grad connected`} style={{ cursor: "default" }}>{t("WrongNetwork")}</div>
                        </li>
                        <li className="grad-wrap  connect-wrap change-network">
                            <div className={`grad connect`} onClick={() => addRPC(account, activate, validChains[0])}>
                                {t("changeTo")} {NameChainMap[validChains[0]] || "ETH"}
                            </div>
                        </li>
                    </>}
                    {claimButton}
                </ul>
            </div>

            <div className="menu-mobile-icon" onClick={toggleNav}>
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15H1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M21 8H1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M21 1H1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
            <div className="right-nav">
                <ul id="right-ul">
                    {
                        Navs.reverse().map(nav => {
                            const classes = nav.linkDisabled ? "disabled-link" : ""
                            if (nav.out) return <li key={nav.id}><a className={classes} href={nav.path}><div className="nav-title">{t(nav.id)}</div></a></li>

                            return <li key={nav.id} className="nav-item">
                                <NavLink className={classes} exact={nav.exact} to={nav.path}>
                                    <div className="nav-title"> {t(nav.id)} {nav.children && <img className="arrow-nav" src={process.env.PUBLIC_URL + "/img/arrow-nav-2.svg"} alt="arrow" />}</div>
                                </NavLink>
                                {nav.children && <SubNavbar key={nav.id} items={nav.children} />}</li>
                        })
                    }
                    <li key="language" className="language">
                        {
                            <LanguageSelector />
                        }
                    </li>
                </ul>
            </div>
        </nav>

        <div className={menuMobileClass} id="mobile-menu">
            <ul id="mobile-menu-ul">
                <li className="icon-close" onClick={toggleNav}>
                    <div className="menu-title">{t("menu")}</div>
                    <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                        <g id="Page-1" stroke="white" strokeWidth="1" fill="white" fillRule="evenodd">
                            <g id="icon-shape">
                                <polygon id="Combined-Shape" points="10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644"></polygon>
                            </g>
                        </g>
                    </svg>
                </li>
                <li key="language" className="language">
                    {
                        <LanguageSelector name="mob-language" />
                    }
                </li>
                {
                    Navs.reverse().map(nav => {
                        const classes = nav.linkDisabled ? "disabled-link" : ""
                        if (nav.out) return <li key={nav.id}><a className={classes} href={nav.path}><div className="nav-title">{nav.text}</div></a></li>

                        return <li key={nav.id} className="nav-item ">
                            <NavLink className={classes} exact={nav.exact} to={nav.path}>
                                <div className="nav-title"> {nav.text} {nav.children && <img className="arrow-nav" src={process.env.PUBLIC_URL + "/img/arrow-nav.svg"} alt="arrow" />}</div>
                            </NavLink>
                            {nav.children && <SubNavbar key={nav.id} items={nav.children} handleClick={toggleNav} />}</li>
                    })
                }

            </ul>

        </div >
    </>)

}

export default Navbar;