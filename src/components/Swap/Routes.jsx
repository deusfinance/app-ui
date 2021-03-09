import React from 'react';
import { AllTokens, AddressChainMap } from '../../config';
import pathsRink from './../../services/graph.json'
import pathsMain from './../../services/graphbk.json'


const Routes = ({ from, to, chainId }) => {
    const path = chainId && chainId === 4 ? pathsRink[from.name][to.name] : pathsMain[from.name][to.name]
    const AddressMap = AddressChainMap[chainId && chainId === 4 ? chainId : 1]
    const deusPath = {
        "deus": {
            "eth": true,
            "bakkt": true,
            "coinbase": true
        },
        "dea": {
            "spcx": true,
        },
        "coinbase": {
            "deus": true,
        },
        "bakkt": {
            "deus": true,
        },
        "spcx": {
            "dea": true,
        },
        "eth": {
            "deus": true,
        },
    }
    return (<div className="routes">
        <p>Route</p>
        <div className="routes-tokens">
            {path && path.map((p, i) => {
                const name = AddressMap[p]
                const token = AllTokens[name]
                if (i === 0) {
                    return <div key={i} className="route-token">
                        <div className="token-wrap">
                            <img className="icon" src={process.env.PUBLIC_URL + `/tokens/${token?.pic_name}`} alt="eth" />
                            <div className="symbol">{token?.title}</div>
                        </div>
                    </div>
                }
                return <div key={i} className="route-token">

                    {path.length !== i && <div className="swap-place">
                        {!deusPath[AddressMap[path[i - 1]]]?.[AddressMap[path[i]]] ?
                            <img src={process.env.PUBLIC_URL + "img/swap/uni.svg"} alt="uni" /> :
                            <img src={process.env.PUBLIC_URL + "img/swap/d-swap.svg"} alt="deus-swap" />
                        }
                        <img src={process.env.PUBLIC_URL + "img/swap/right-arrow.svg"} alt="arrow" />
                    </div>}

                    <div className="token-wrap">
                        <img className="icon" src={process.env.PUBLIC_URL + `/tokens/${token?.pic_name ? token?.pic_name : token?.logo}`} alt="eth" />
                        <div className="symbol">{token?.title}</div>
                    </div>
                </div>
            })}
        </div>
    </div >);
}

export default Routes;