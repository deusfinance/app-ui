import React, { useMemo } from 'react';
import { ExternalLink } from '../../App/Link';
import { NavbarMobileContent } from '../../App/Navbar';
import { NavLink } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next'
import OutsideClickHandler from 'react-outside-click-handler';

const NavMobile = ({ routes, open, setOpen }) => {
    const { t } = useTranslation()

    return useMemo(() => {
        return <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
            <NavbarMobileContent open={open}>
                <ul onClick={() => setOpen(false)}>
                    <li className="icon-close">
                        <div className="menu-title">{t("menu")}</div><svg onClick={() => setOpen(!open)} viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="white" strokeWidth={1} fill="white" fillRule="evenodd"><g id="icon-shape"><polygon id="Combined-Shape" points="10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644" /></g></g></svg>
                    </li>

                    <li className="nav-item-lg" >
                        <LanguageSelector />
                    </li>

                    {<div className="nav-item-wrap-img" >
                        {routes.filter(nav => nav.image).map((nav, index) => {
                            console.log(nav);
                            let res = null
                            res = <ExternalLink href={nav.path}  >
                                <img width='20px' height="20px" src={`/img/navbar/${nav.id}.svg`} alt="" />
                            </ExternalLink>
                            return <li key={nav.id + index} className="nav-item-img">{res}</li>
                        })}
                    </div>}

                    {routes.map((nav, index) => {
                        let res = null
                        if (nav.path) {
                            if (nav.path.charAt(0) === "/") {
                                res = <li key={index} className="nav-item-box">
                                    <NavLink className="nav-item-text nav-item-ln" to={nav.path} >
                                        {t(nav.id)}
                                    </NavLink> </li>
                            } else if (!nav.image) {
                                res = <div key={index} className="nav-item-box" style={{ marginTop: "10px" }}>
                                    <li> <ExternalLink href={nav.path} className="nav-item-text" >{t(nav.id)}</ExternalLink> </li>
                                </div>
                            }
                        } else {
                            res = <div key={index} className="nav-item-wrap-img"  >
                                <li> <p className="nav-title">{t(nav.id)}</p> </li>
                            </div>
                        }

                        if (nav.children && !nav.image) {
                            res = <div key={index} > {res}
                                {nav.children.map((subnav, index) => {
                                    if (subnav.path.charAt(0) === "/")
                                        return <li key={subnav.id + "_mobile" + index} className="nav-item-box"><NavLink className="nav-item-text" to={subnav.path} > {t(subnav.id)} </NavLink></li>
                                    return <li key={subnav.id + "_mobile" + index} className="nav-item-box"><ExternalLink className="nav-item-text" href={subnav.path} textDecoration="none">
                                        <span>{t(subnav.id)}</span>
                                    </ExternalLink></li>
                                })}
                            </div>
                        }
                        return res
                    })}
                </ul>
            </NavbarMobileContent>
        </OutsideClickHandler>

    }, [routes, open, setOpen, t])
}

export default NavMobile;