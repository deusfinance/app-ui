import React from 'react'
import { isDesktop } from '../../utils/utils';


const Footer = ({ classes, items, footerClass }) => {
    const footers = items ? items : [
        { href: "https://t.me/deusfinance", title: "Telegram" },
        { href: "https://github.com/deusfinance", title: "Github" },
        { href: "https://medium.com/@deusfinance", title: "Medium" },
        { href: "https://twitter.com/deusdao", title: "Twitter" },
        // { href: "https://discord.com/invite/DxdM7TW", title: "Discord" },
    ]
    const hideme = isDesktop() ? "flex" : "none"
    return (
        <footer className={footerClass}>
            <ul className={classes} style={{ fontFamily: "Comfortaa" }}>
                {footers.reverse().map((item, index) => (<li key={index}> <a href={item.href} target="_blank" rel="noopener noreferrer" > {item.title} </a></li>))}
            </ul>
            <a className="deo-wrap" style={{ display: hideme }} href="https://etherscan.io/token/0x80ab141f324c3d6f2b18b030f1c4e95d4d658778" target="_blank" rel="noopener noreferrer"><img src="img/dea.svg" alt="" /> DEA token</a>
        </footer>
    );
}

export default Footer;
