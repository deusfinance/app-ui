import React, { useMemo } from 'react';
import { ExternalLink } from '../../App/Link';
import { NavbarContentWrap, SubNavbarContentWrap } from '../../App/Navbar';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

const NavDesktop = ({ routes }) => {
    const { t } = useTranslation()

    return useMemo(() => {
        return <NavbarContentWrap>
            {routes.reverse().map((nav, index) => {
                let res = null
                if (nav.path) {
                    if (nav.path.charAt(0) === "/") {
                        res = <NavLink key={"desk" + index} to={nav.path} > {t(nav.id)} </NavLink>
                    } else {
                        if (nav.image) {
                            res = <ExternalLink href={nav.path} >
                                {/* height="20%" width="20%" */}
                                <img width="20px" src={`/img/navbar/${nav.id}.svg`} alt="" />
                            </ExternalLink>
                        } else {
                            res = <ExternalLink href={nav.path} textDecoration="none">
                                <span> {t(nav.id)} </span>
                            </ExternalLink>
                        }
                    }
                } else {
                    res = <p>{t(nav.id)}</p>
                }

                if (nav.children) {
                    res = <>
                        {res}
                        <img className="polygon" src="/img/navbar/polygon.png" height="13px" width="13px" alt="polygon" />
                        <SubNavbarContentWrap>
                            {nav.children.map(subnav => {
                                if (subnav.path.charAt(0) === "/")
                                    return <li key={subnav.id + "_desktop"}><NavLink to={subnav.path} > {t(subnav.id)} </NavLink></li>
                                if (subnav.image) {
                                    return <li key={subnav.id + "_desktop"}><ExternalLink href={subnav.path} textDecoration="none">
                                        <img src={`/img/navbar/${subnav.id}.svg`} alt="" height="20%" width="20%" />
                                    </ExternalLink></li>
                                }
                                return <li key={subnav.id + "_desktop"}><ExternalLink href={subnav.path} textDecoration="none">
                                    <span>{t(subnav.id)}</span>
                                </ExternalLink></li>
                            })}
                        </SubNavbarContentWrap>
                    </>
                }
                return <li key={nav.id + "_desktop"}>{res}</li>
            })}
            {/* <li>
                <LanguageSelector />
            </li> */}
        </NavbarContentWrap>
    }, [routes, t])
}

export default NavDesktop;