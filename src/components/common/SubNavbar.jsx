import React from 'react';
import { NavLink } from 'react-router-dom';

const SubNavbar = ({ items, handleClick }) => {
    return (<ul className="sub-nav">
        {items.map(nav => {
            const classes = "sub-nav-item"
            if (nav.out) return <li key={nav.id} className={classes} ><a href={nav.path}> {nav.text} </a></li>

            return <li key={nav.id} className={classes} ><NavLink exact={nav.exact} to={nav.path} onClick={handleClick}> {nav.text} </NavLink></li>
        })}
    </ul>);
}

export default SubNavbar;