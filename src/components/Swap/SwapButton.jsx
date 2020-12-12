import React from 'react';

const SwapButton = ({ approved, token, handleSwap }) => {
    // console.log(token.balance, "\t", token.amount);
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