import { useWeb3React } from '@web3-react/core';
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import '../../styles/scss/navbar.scss';
import { navbarItems } from '../../config';
import SubNavbar from './SubNavbar';
import { getEtherBalance } from '../../services/SwapService';

import { injected } from '../../connectors';
import { formatAddress } from '../../utils/utils';



export function Balance() {
    const { account, library, chainId } = useWeb3React()

    const [balance, setBalance] = useState()
    useEffect(() => {
        getEtherBalance().then(balance => {
            setBalance(balance)
        });
    }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds


    return (
        <>
            <span>Balance</span>
            <span role="img" aria-label="gold">
                💰
      </span>
            <span>{balance === null ? 'Error' : balance ? `Ξ${(balance)}` : ''}</span>
        </>
    )
}

export function useEagerConnect() {
    const { activate, active } = useWeb3React()


    const [tried, setTried] = useState(false)

    useEffect(() => {
        injected.isAuthorized().then((isAuthorized) => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch(() => {
                    setTried(true)
                })
            } else {
                setTried(true)
            }
        })
    }, []) // intentionally only running on mount (make sure it's only mounted once :))

    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
        if (!tried && active) {
            setTried(true)
        }
    }, [tried, active])

    return tried
}


const Navbar = () => {

    const web3React = useWeb3React()
    // handle logic to recognize the connector currently being activated

    const [activatingConnector, setActivatingConnector] = useState()
    useEffect(() => {
        if (activatingConnector && activatingConnector === injected) {
            setActivatingConnector(undefined)
        }
    }, [activatingConnector, injected])
    const { account } = web3React
    console.log(account);

    const triedEager = useEagerConnect()

    const handleConnect = async () => {
        web3React.activate(injected)
    }

    const [menuMobileClass, setMenuMobileClass] = useState("close-menu");
    const toggleNav = () => {
        if (menuMobileClass === "close-menu") {
            setMenuMobileClass("open-menu")
            return
        }
        setMenuMobileClass("close-menu")
    }


    let Navs = navbarItems.reverse()

    //DEUS staking
    return (<><nav id="nav">
        {<div className="left-nav-wrap">
            <ul className="left-nav">
                <li><span className="deus">DEUS <span className="finance">finance</span></span></li>
                <li className="grad-wrap connect-wrap" onClick={handleConnect}>
                    <div className="grad connect">{formatAddress(account)}</div>
                </li>
            </ul>
        </div>}
        <div className="menu-mobile-icon" onClick={toggleNav}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
        </div>
        <div className="right-nav">
            <ul id="right-ul">
                {
                    Navs.map(nav => {
                        const classes = nav.linkDisabled ? "disabled-link" : ""
                        if (nav.out) return <li key={nav.id}><a className={classes} href={nav.path}><div className="nav-title">{nav.text}</div></a></li>

                        return <li key={nav.id} className="nav-item">
                            <NavLink className={classes} exact={nav.exact} to={nav.path}>
                                <div className="nav-title"> {nav.text} {nav.children && <img className="arrow-nav" src={process.env.PUBLIC_URL + "/img/arrow-nav.svg"} />}</div>
                            </NavLink>
                            {nav.children && <SubNavbar items={nav.children} />}</li>
                    })
                }
            </ul>
        </div>
    </nav >
        <div className={menuMobileClass} id="mobile-menu">
            <ul id="mobile-menu-ul">

                {
                    Navs.map(nav => {
                        if (nav.out) return <li key={nav.id}><a href={nav.path}> {nav.text} </a></li>
                        return <li key={nav.id}><NavLink onClick={toggleNav} exact={true} to={nav.path}> {nav.text} </NavLink></li>
                    })
                }
                <li className="icon-close" onClick={toggleNav}>
                    <div className="menu-title">Menu</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </li>
            </ul>
        </div>
    </>);
}



export default Navbar;