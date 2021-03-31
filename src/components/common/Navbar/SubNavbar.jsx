import React from 'react';
import { NavLink } from 'react-router-dom';

const SubNavbar = ({ items, handleClick }) => {
    return (<ul className="sub-nav">
        {items.map(nav => {
            if (nav.out) return <li key={nav.id} className="sub-nav-item" ><a href={nav.path}> {nav.text} </a></li>

            return <li key={nav.id} className="sub-nav-item"  >
                <NavLink exact={nav.exact} to={nav.path} onClick={handleClick}> {nav.text} </NavLink>
            </li>
        })}
    </ul>);
}

export default SubNavbar;