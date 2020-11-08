import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../../styles/scss/navbar.scss';
import { navbarItems } from '../../config';
import SubNavbar from './SubNavbar';

const Navbar = () => {


    const [menuMobileClass, setMenuMobileClass] = useState("close-menu");
    const toggleNav = () => {
        if (menuMobileClass === "close-menu") {
            setMenuMobileClass("open-menu")
            return
        }
        setMenuMobileClass("close-menu")
    }


    let Navs = [
        { id: "litepaper", text: "Litepaper", path: "https://deus.finance/litepaper.pdf", out: true },
        {
            id: "wiki", text: <><div className="nav-item-top">explain DEUS</div><div className="nav-item-bottom">wiki</div></>, path: "https://deus.finance/wiki.html", out: true
        },
        {
            id: "pools", text: <><div className="nav-item-top">earn DEA</div><div className="nav-item-bottom">staking</div></>, path: "/staking"
        },
        {
            id: "exchange", text: <><div className="nav-item-top">buy DEUS</div><div className="nav-item-bottom">swap</div></>, path: "/newswap"
        },
        {
            id: "conductr", text: <><div className="nav-item-top">Conductr</div><div className="nav-item-bottom">rigristrar</div></>, path: "/conductr"
        },
        { id: "home", text: "Home", path: "https://deus.finance", out: true },]

    Navs = navbarItems.reverse()

    //DEUS staking
    return (<><nav id="nav">
        {<div className="left-nav-wrap">
            <ul className="left-nav">
                <li><span className="deus">DEUS <span className="finance">finance</span></span></li>
                <li className="grad-wrap connect-wrap">
                    <div className="grad connect">connect wallet</div>
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