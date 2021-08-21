import React, { useState } from 'react';
import { ChainMap, NameChainMap } from '../../../constant/web3';
import OutsideClickHandler from 'react-outside-click-handler';

const SelectBox = ({ currRow, setCurrRow }) => {
    const rows = [ChainMap.BSC, ChainMap.XDAI, ChainMap.HECO, ChainMap.ETH, ChainMap.MATIC]
    const ICONS = {
        [ChainMap.BSC]: "/img/chains/bsc.png",
        [ChainMap.XDAI]: "/img/chains/xdai.png",
        [ChainMap.ETH]: "/tokens/eth-logo.svg",
        [ChainMap.MATIC]: "/img/ticker/MATIC.png",
        [ChainMap.HECO]: "/img/chains/heco.svg",
    }

    const [open, setOpen] = useState(false)

    return (<OutsideClickHandler
        onOutsideClick={() => {
            setOpen(false)
        }}>
        <div className="select-items" onClick={() => setOpen(!open)}>
            <div className={`select-box ${open ? "select-open" : ""}`}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                    <img src={process.env.PUBLIC_URL + ICONS[currRow]} style={{ width: "25px", height: "25px", marginRight: "8px" }} alt={ICONS[currRow]} />
                    {NameChainMap[currRow]}
                </div>
                <svg width={9} height={5} viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 0.5L4.3 4.3L8.1 0.5" stroke="white" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </div>
            <ul className={`${open ? "ul-open" : ""}`}>
                {rows.filter((row) => row !== currRow).map((row, id) => {
                    return <li key={id} onClick={() => setCurrRow(row)}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                            <img src={process.env.PUBLIC_URL + ICONS[row]} style={{ width: "25px", height: "25px", borderRadius: "50%", marginRight: "8px" }} alt="chain" />
                            {NameChainMap[row]}
                        </div>
                    </li>
                })}

            </ul>
        </div>
    </OutsideClickHandler>
    );
}

export default SelectBox;