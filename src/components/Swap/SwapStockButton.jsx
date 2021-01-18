import MetaMaskOnboarding from '@metamask/onboarding';
import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../connectors';
import { dappLink } from '../../config';

const SwapStockButton = ({ approved, from_token, to_token, handleSwap, isMobile }) => {
    const web3React = useWeb3React()
    const { account, activate } = web3React
    const { isDeployed } = to_token

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

    console.log(to_token);
    const amount = typeof (from_token.amount) === "string" ? parseFloat(from_token.amount) : from_token.amount
    return (<>
        {
            to_token && !isMetamask && <a href={dappLink} target="_blank" rel="noopener noreferrer" className="swap-btn-wrap grad-wrap dapp-link">
                <div className="swap-btn grad">{"Install Metamask"}</div>
            </a>
        }
        {!isDeployed && <div className="swap-btn-wrap grad-wrap" onClick={() => console.log("conduct")}>
            <div className="swap-btn grad">
                CONDUCT
            </div>
        </div>}
        {isDeployed && (!isMobile || (isMobile && account)) && <>{(from_token.balance < amount) ? <div className="swap-btn-wrap grad-wrap Insufficient ">
            <div className="swap-btn grad Insufficient">
                Insufficient Balance
            </div>
        </div> :
            <div className="swap-btn-wrap grad-wrap" onClick={handleSwap}>
                <div className="swap-btn grad">
                    {approved ? "SWAP" : "APPROVE"}
                </div>
            </div>}
        </>}

    </>);
}

export default SwapStockButton;