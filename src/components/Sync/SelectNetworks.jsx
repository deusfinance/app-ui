import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import './styles/selected-networks.scss'
import { useTranslation } from 'react-i18next'

const SelectedNetworks = () => {
    const { chainId } = useWeb3React()
    const { t } = useTranslation()
    const [chain, setChain] = useState("Main")
    const currHref = window.location.pathname


    const networkChooser = () => {
        if (currHref.includes("/xdai"))
            return "xDai";
        else if (currHref.includes("/bsc-test")) {
            return "BSC-Test"
        }
        else if (currHref.includes("/bsc")) {
            return "BSC"
        }
        else {
            return "Main"
        }
    }
    useEffect(() => {
        setChain(networkChooser())

    }, [chainId]) //eslint-disable-line

    const actionMenu = {
        "Main": [

            {
                img: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5.3C0 1.82061 1.82061 0 5.3 0H14V8.7C14 12.1794 12.1794 14 8.7 14H0V5.3Z" fill="white" />
                    <path d="M7.10075 11C8.45522 11 10 10.4917 10 8.62431C10 7.0221 8.77985 6.71271 7.33582 6.44751C6.36194 6.27072 5.27612 6.02762 5.27612 5.14365C5.27612 4.29282 6.02612 3.82873 6.92164 3.82873C7.98507 3.82873 8.65672 4.46961 8.72388 5.55249L9.78731 5.36464C9.58582 3.60773 8.34328 3 6.87687 3C5.64552 3 4.23507 3.62983 4.23507 5.1768C4.23507 6.62431 5.47761 7.07735 6.60821 7.35359C7.69403 7.61878 8.94776 7.62983 8.94776 8.70166C8.94776 9.76243 8.05224 10.1602 7.06716 10.1602C5.94776 10.1602 5.14179 9.51934 5.07463 8.34807L4 8.45856C4.06716 10.1934 5.47761 11 7.10075 11Z" fill="black" />
                </svg>
                ,
                title: t("swap"),
                link: "/swap"
            },
            {
                img: <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.1453 3.41848L14.0991 0.0692935L10.7529 0L11.8187 1.08132L2.49139 10.4171C1.59139 8.36137 2.02985 6.09779 3.62215 4.50404C5.02985 3.09507 7.01446 2.63311 8.81446 3.11817L10.4298 1.50132C7.70677 0.300231 4.36062 0.785285 2.12215 3.00268C-0.739384 5.86681 -0.647076 10.625 2.05292 13.466L13.1183 2.39059L14.1453 3.41848ZM3.17179 15.926L12.5066 6.58276C13.4066 8.63846 12.9681 10.902 11.3758 12.4958C9.96809 13.9048 7.98348 14.3667 6.18348 13.8817L4.56809 15.4985C7.29117 16.6996 10.6373 16.2146 12.8758 13.9741C15.7373 11.1099 15.645 6.37488 12.945 3.51074L1.86335 14.6255L0.829373 13.6045L0.898604 16.9537L4.24476 16.9999L3.17179 15.926Z" fill="white"></path></svg>,
                title: t("synthetics"),
                link: "/synchronizer"
            },
        ],
        "xDai": [
            {
                img: <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.1453 3.41848L14.0991 0.0692935L10.7529 0L11.8187 1.08132L2.49139 10.4171C1.59139 8.36137 2.02985 6.09779 3.62215 4.50404C5.02985 3.09507 7.01446 2.63311 8.81446 3.11817L10.4298 1.50132C7.70677 0.300231 4.36062 0.785285 2.12215 3.00268C-0.739384 5.86681 -0.647076 10.625 2.05292 13.466L13.1183 2.39059L14.1453 3.41848ZM3.17179 15.926L12.5066 6.58276C13.4066 8.63846 12.9681 10.902 11.3758 12.4958C9.96809 13.9048 7.98348 14.3667 6.18348 13.8817L4.56809 15.4985C7.29117 16.6996 10.6373 16.2146 12.8758 13.9741C15.7373 11.1099 15.645 6.37488 12.945 3.51074L1.86335 14.6255L0.829373 13.6045L0.898604 16.9537L4.24476 16.9999L3.17179 15.926Z" fill="white"></path></svg>,
                title: t("synthetics"),
                link: "/crosschain/xdai/synchronizer"
            },
            {
                img: <svg width="24" height="9" viewBox="0 0 24 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.224 9C21.984 9 21.792 8.82692 21.744 8.60439C21.48 7.31868 20.424 3.38736 17.448 3.38736C14.472 3.38736 13.44 7.29396 13.176 8.57967C13.128 8.82692 12.912 8.97527 12.696 8.97527H11.352C11.112 8.97527 10.92 8.8022 10.872 8.57967C10.608 7.29396 9.552 3.36264 6.576 3.36264C3.6 3.36264 2.52 7.29396 2.256 8.57967C2.208 8.82692 1.992 8.97527 1.776 8.97527H0.504C0.24 8.97527 0 8.75275 0 8.45604V0.519231C0 0.222527 0.216 0 0.504 0H23.496C23.76 0 24 0.222527 24 0.519231V8.48077C24 8.75275 23.784 9 23.496 9H22.224Z" fill="white" />
                </svg>
                ,
                title: t("bridgeTokens"),
                link: "https://bridge.xdaichain.com/",
            },
        ],
        // "BSC-Test": [
        //     {
        //         img: <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.1453 3.41848L14.0991 0.0692935L10.7529 0L11.8187 1.08132L2.49139 10.4171C1.59139 8.36137 2.02985 6.09779 3.62215 4.50404C5.02985 3.09507 7.01446 2.63311 8.81446 3.11817L10.4298 1.50132C7.70677 0.300231 4.36062 0.785285 2.12215 3.00268C-0.739384 5.86681 -0.647076 10.625 2.05292 13.466L13.1183 2.39059L14.1453 3.41848ZM3.17179 15.926L12.5066 6.58276C13.4066 8.63846 12.9681 10.902 11.3758 12.4958C9.96809 13.9048 7.98348 14.3667 6.18348 13.8817L4.56809 15.4985C7.29117 16.6996 10.6373 16.2146 12.8758 13.9741C15.7373 11.1099 15.645 6.37488 12.945 3.51074L1.86335 14.6255L0.829373 13.6045L0.898604 16.9537L4.24476 16.9999L3.17179 15.926Z" fill="white"></path></svg>,
        //         title: t("synthetics"),
        //         link: "/crosschain/bsc-test/synchronizer"
        //     },
        //     {
        //         img: <svg width="24" height="9" viewBox="0 0 24 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        //             <path d="M22.224 9C21.984 9 21.792 8.82692 21.744 8.60439C21.48 7.31868 20.424 3.38736 17.448 3.38736C14.472 3.38736 13.44 7.29396 13.176 8.57967C13.128 8.82692 12.912 8.97527 12.696 8.97527H11.352C11.112 8.97527 10.92 8.8022 10.872 8.57967C10.608 7.29396 9.552 3.36264 6.576 3.36264C3.6 3.36264 2.52 7.29396 2.256 8.57967C2.208 8.82692 1.992 8.97527 1.776 8.97527H0.504C0.24 8.97527 0 8.75275 0 8.45604V0.519231C0 0.222527 0.216 0 0.504 0H23.496C23.76 0 24 0.222527 24 0.519231V8.48077C24 8.75275 23.784 9 23.496 9H22.224Z" fill="white" />
        //         </svg>
        //         ,
        //         title: t("bridgeTokens"),
        //         link: "https://bridge.xdaichain.com/",
        //     },
        // ],
        "BSC": [
            {
                img: <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.1453 3.41848L14.0991 0.0692935L10.7529 0L11.8187 1.08132L2.49139 10.4171C1.59139 8.36137 2.02985 6.09779 3.62215 4.50404C5.02985 3.09507 7.01446 2.63311 8.81446 3.11817L10.4298 1.50132C7.70677 0.300231 4.36062 0.785285 2.12215 3.00268C-0.739384 5.86681 -0.647076 10.625 2.05292 13.466L13.1183 2.39059L14.1453 3.41848ZM3.17179 15.926L12.5066 6.58276C13.4066 8.63846 12.9681 10.902 11.3758 12.4958C9.96809 13.9048 7.98348 14.3667 6.18348 13.8817L4.56809 15.4985C7.29117 16.6996 10.6373 16.2146 12.8758 13.9741C15.7373 11.1099 15.645 6.37488 12.945 3.51074L1.86335 14.6255L0.829373 13.6045L0.898604 16.9537L4.24476 16.9999L3.17179 15.926Z" fill="white"></path></svg>,
                title: t("synthetics"),
                link: "/crosschain/bsc/synchronizer"
            },
            {
                img: <svg width="24" height="9" viewBox="0 0 24 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.224 9C21.984 9 21.792 8.82692 21.744 8.60439C21.48 7.31868 20.424 3.38736 17.448 3.38736C14.472 3.38736 13.44 7.29396 13.176 8.57967C13.128 8.82692 12.912 8.97527 12.696 8.97527H11.352C11.112 8.97527 10.92 8.8022 10.872 8.57967C10.608 7.29396 9.552 3.36264 6.576 3.36264C3.6 3.36264 2.52 7.29396 2.256 8.57967C2.208 8.82692 1.992 8.97527 1.776 8.97527H0.504C0.24 8.97527 0 8.75275 0 8.45604V0.519231C0 0.222527 0.216 0 0.504 0H23.496C23.76 0 24 0.222527 24 0.519231V8.48077C24 8.75275 23.784 9 23.496 9H22.224Z" fill="white" />
                </svg>
                ,
                title: t("bridgeTokens"),
                link: "https://www.binance.org/en/bridge",
            },
        ]
    }
    return (<div className="wrap-networks">
        <p >{t("selectNetwork")}</p>
        <select name="networks" id="networks" value={chain} onChange={(e) => setChain(e.currentTarget.value)}>
            {
                Object.keys(actionMenu).map((currChain) => {

                    return <option key={currChain} value={currChain} >{currChain}</option>
                })
            }
        </select>
        <div className="action-wrap">
            {

                actionMenu[chain].map((item, index) => {
                    const activeClass = currHref === item.link ? "active" : ""
                    const itemElm = <> <div className="names">
                        {item.img}
                        <p>{item.title}</p>
                    </div>
                        <p>({chain})</p>
                    </>
                    if (item.link.charAt(0) === "/") {
                        return <a key={index} href={item.link} className={`items ${activeClass}`}>{itemElm}</a>
                    }
                    return <a key={index} href={item.link} className={`items ${activeClass}`} target="_blank" rel="noopener noreferrer">{itemElm}</a>
                })
            }
        </div>

    </div>);
}

export default SelectedNetworks;