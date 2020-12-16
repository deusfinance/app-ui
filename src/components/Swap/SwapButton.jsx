import React from 'react';
// import { useWeb3React } from '@web3-react/core';

const SwapButton = ({ approved, token, handleSwap }) => {
    // console.log(token.balance, "\t", token.amount);
    // const web3React = useWeb3React()
    // const { account, activate, chainId } = web3React

    const amount = typeof (token.amount) === "string" ? parseFloat(token.amount) : token.amount
    return (<>
        {(token.balance < amount) ? <div className="swap-btn-wrap grad-wrap Insufficient ">
            <div className="swap-btn grad Insufficient">
                Insufficient Balance
            </div>
        </div> :
            <div className="swap-btn-wrap grad-wrap" onClick={handleSwap}>
                <div className="swap-btn grad">
                    {approved ? "SWAP" : "APPROVE"}
                </div>
            </div>}
    </>);
}

export default SwapButton;