import React from 'react'
import { NavLink } from 'react-router-dom';
import { isDesktop } from '../../utils/utils'
import '../../styles/scss/navbar.css';

const Navbar = () => {




    const navClass = isDesktop() ? "right" : "nav-mobile"

    // let Navs = [{ id: "pools", text: "LP-Pools", path: "/pools" }, { id: "exchange", text: <span className="deus-sw" >DEUS <span className="swap">Swap</span></span>, path: "/swap" }, { id: "home", text: "Home", path: "/home" },]
    let Navs = [{ id: "pools", text: "LP-Pools", path: "/pools" }, { id: "home", text: "Home", path: "/home" },]

    return (<nav>
        {isDesktop() && <div className="left">
            <ul className="left-ul">
                <li>
                    <div className="logo">
                        <img className="vertical-center" src="img/favicon/60x60.png" alt="deusfinance" />
                    </div>
                </li>
                <li><span className="deus" >DEUS <span className="finance">finance</span></span></li>
                {/* <li className="deus " ><div style={{ padding: "10px 2px" }}>DEUS</div></li>
                <li className="finance">finance</li> */}
            </ul>

        </div>}
        <div className={navClass}>
            <ul>
                {
                    Navs.map(nav => {
                        const classes = nav.linkDisabled ? "disabled-link" : ""
                        return <li key={nav.id}><NavLink className={classes} exact={true} to={nav.path}> {nav.text} </NavLink></li>
                    })
                }
            </ul>
        </div>
    </nav >);
}

export default Navbar;