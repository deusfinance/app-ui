import MetaMaskOnboarding from '@metamask/onboarding';
import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../connectors';
import { dappLink } from '../../config';

const SwapStockButton = ({ isStock, from_token, to_token, handleConduct, handleSwap, isMobile }) => {
    const web3React = useWeb3React()
    const { account, activate } = web3React
    const { conducted } = to_token
    const handleConnect = async () => {
        try {
            const data = await activate(injected)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    const [isMetamask, setIsMetamask] = useState(null)

    useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            setIsMetamask(true)
        } else {
            // console.log("MetaMask didnt  Installed");
            setIsMetamask(false)
        }
    }, [account]);

    const amount = typeof (from_token.amount) === "string" ? parseFloat(from_token.amount) : from_token.amount
    return (<>
        {
            to_token && !isMetamask && <a href={dappLink} target="_blank" rel="noopener noreferrer" className="swap-btn-wrap grad-wrap dapp-link">
                <div className="swap-btn grad">{"Install Metamask"}</div>
            </a>
        }
        {!conducted && <div className="grad-wrap swap-btn-wrap stock-swap-btn " onClick={() => handleConduct(to_token)}>
            <div className="swap-btn grad">
                CONDUCT
            </div>

        </div>}
        {conducted && (!isMobile || (isMobile && account)) && <>{(from_token.balance < amount) ? <div className="swap-btn-wrap grad-wrap Insufficient stock-swap-btn ">
            <div className="swap-btn grad Insufficient">
                Insufficient Balance
            </div>
        </div> :
            <div className=" grad-wrap swap-btn-wrap stock-swap-btn" onClick={handleSwap}>
                <div className="swap-btn grad">
                    {from_token.allowances !== "0" ? isStock ? "SYNC" : "SWAP" : "APPROVE"}
                </div>
            </div>}
        </>}

    </>);
}

export default SwapStockButton;