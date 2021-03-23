import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../connectors';

const SwapButton = ({ approved, token, handleSwap, isMobile }) => {
    const web3React = useWeb3React()
    const { account, activate, chainId } = web3React

    const handleConnect = async () => {
        try {
            const data = await activate(injected)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const amount = typeof (token.amount) === "string" ? parseFloat(token.amount) : token.amount


    if (chainId && chainId !== 1) {
        return (<>
            <div className="swap-btn-wrap grad-wrap Insufficient ">
                <div className="swap-btn grad Insufficient" style={{ backgroundColor: "#111111" }} >
                    WRONG NETWORK
                </div>
            </div>
        </>)
    }

    return (<>
        { account && <>{(token.balance < amount) ? <div className="swap-btn-wrap grad-wrap Insufficient ">
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
            !account && <div className="swap-btn-wrap grad-wrap dapp-link" onClick={handleConnect}>
                <div className="swap-btn grad">{"connect wallet"}</div>
            </div>
        }

    </>);
}

export default SwapButton;