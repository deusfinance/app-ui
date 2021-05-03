import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

const SubNavbar = ({ items, handleClick }) => {
    const { t } = useTranslation()

    return (<ul className="sub-nav">
        {items.map(nav => {
            if (nav.out) return <li key={nav.id} className="sub-nav-item" ><a href={nav.path}> {t(nav.id)} </a></li>

            return <li key={nav.id} className="sub-nav-item"  >
                <NavLink exact={nav.exact} to={nav.path} onClick={handleClick}> {t(nav.id)} </NavLink>
            </li>
        })}
    </ul>);
}

export default SubNavbar;