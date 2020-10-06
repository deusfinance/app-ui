import React from 'react'

const Footer = ({ classes, items, footerClass }) => {
    const footers = items ? items : [
        { href: "https://github.com/deusfinance", title: "Github" },
        // { href: "https://twitter.com/DeusFinance", title: "Twitter" },
        { href: "https://discord.com/invite/DxdM7TW", title: "Discord" },
        { href: "https://t.me/deusfinance", title: "Telegram" },
    ]
    return (
        <footer className={footerClass}>
            <ul className={classes} style={{ fontFamily: "Comfortaa" }}>
                {footers.map((item, index) => (<li key={index}> <a href={item.href} target="_blank" rel="noopener noreferrer" > {item.title} </a></li>))}
            </ul>
        </footer>
    );
}

export default Footer;