import MetaMaskOnboarding from '@metamask/onboarding';
import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../connectors';
import { dappLink } from '../../config';

const SwapButton = ({ approved, token, handleSwap, isMobile }) => {
    const web3React = useWeb3React()
    const { account, activate } = web3React

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


    const amount = typeof (token.amount) === "string" ? parseFloat(token.amount) : token.amount
    return (<>
        {(!isMobile || (isMobile && account)) && <>{(token.balance < amount) ? <div className="swap-btn-wrap grad-wrap Insufficient ">
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
        {
            isMobile && isMetamask && !account && <div className="swap-btn-wrap grad-wrap dapp-link" onClick={handleConnect}>
                <div className="swap-btn grad">{"connect wallet"}</div>
            </div>
        }
        {
            isMobile && !isMetamask && <a href={dappLink} target="_blank" rel="noopener noreferrer" className="swap-btn-wrap grad-wrap dapp-link">
                <div className="swap-btn grad">{"Install Metamask"}</div>
            </a>
        }
    </>);
}

export default SwapButton;