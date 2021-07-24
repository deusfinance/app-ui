import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import './styles/selected-networks.scss'

const SelectedNetworks = () => {
    const { chainId } = useWeb3React()
    const { t } = useTranslation()
    const [chain, setChain] = useState("ETH")
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
        else if (currHref.includes("/heco")) {
            return "HECO"
        }
        else if (currHref.includes("/polygon")) {
            return "POLYGON"
        }
        else {
            return "ETH"
        }
    }

    useEffect(() => {
        setChain(networkChooser())
    }, [chainId]) //eslint-disable-line

    const actionMenu = {
        "ETH": [
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
                path: "/img/synthetics.svg",
                title: t("synthetics"),
                link: "/synchronizer"
            },
            {
                path: "/tokens/muon-invert.svg",
                title: t("MUON PRESALE"),
                link: "/muon-presale"
            },
            {
                path: "/img/futuresIcon.svg",
                title: "BAKKT",
                link: "/bakkt"
            },
            {
                path: "/img/futuresIcon.svg",
                title: "Space X",
                link: "/musk"
            },
        ],
        "xDai": [
            {
                path: "/img/synthetics.svg",
                title: t("synthetics"),
                link: "/crosschain/xdai/synchronizer"
            },
            {
                path: "/img/bridge.svg",
                title: t("bridgeTokens"),
                link: "https://bridge.xdaichain.com/",
            },
            {
                path: "/tokens/muon-invert.svg",
                title: t("MUON PRESALE"),
                link: "/crosschain/xdai/muon-presale"
            },
        ],
        "BSC": [
            {
                path: "/img/synthetics.svg",
                title: t("synthetics"),
                link: "/crosschain/bsc/synchronizer"
            },
            {
                path: "/img/bridge.svg",
                title: t("bridgeTokens"),
                link: "https://www.binance.org/en/bridge",
            },
            {
                path: "/tokens/muon-invert.svg",
                title: t("MUON PRESALE"),
                link: "/crosschain/bsc/muon-presale"
            },
        ],
        "HECO": [
            {
                path: "/img/synthetics.svg",
                title: t("synthetics"),
                link: "/crosschain/heco/synchronizer"
            },
            {
                path: "/img/bridge.svg",
                title: t("bridgeTokens"),
                link: "https://www.huobi.com/en-us/exchange/",
            },
        ],
        "POLYGON": [
            {
                title: t("synthetics"),
                path: "/img/synthetics.svg",
                link: "/crosschain/polygon/synchronizer"
            },
            {
                path: "/img/bridge.svg",
                title: t("bridgeTokens"),
                link: "https://wallet.matic.network",
            },
        ],

    }
    return (<div className="wrap-networks">
        <p >{t("selectNetwork")}</p>
        <select name="networks" id="networks" value={chain} style={{ cursor: "pointer" }} onChange={(e) => setChain(e.currentTarget.value)}>
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
                        {item.path ? <img src={item.path} style={{ width: "15px", marginRight: "8px" }} /> : item.img}
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