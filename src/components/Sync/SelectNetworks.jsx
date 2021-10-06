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
                path: "/tokens/muon-invert.svg",
                title: t("MUON PRESALE"),
                link: "/muon-presale"
            },
        ],
        "xDai": [

            {
                path: "/tokens/muon-invert.svg",
                title: t("MUON PRESALE"),
                link: "/crosschain/xdai/muon-presale"
            },
        ],
        "BSC": [
            {
                path: "/tokens/muon-invert.svg",
                title: t("MUON PRESALE"),
                link: "/crosschain/bsc/muon-presale"
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
                        {item.path ? <img src={item.path} style={{ width: "15px", marginRight: "8px" }} alt={item.title} /> : item.img}
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