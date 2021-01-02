import React from 'react';
import Popup from './Popup/Popup';

const Risk = ({ handleRiskPopup }) => {
    return (<Popup
        title={<div > "RISK OF FUTURES TRADING <span role="img" aria-label="chart increasing">📈</span><span role="img" aria-label="chart decreasing" >📉</span>"</div>}
        close={true}
        show={true}
        handlePopup={handleRiskPopup}
        popBody={<div className="risk-popup">
            <h5>TRADING FUTURES/IOUs IS A HIGH-RISK INVESTMENT</h5>
            <p>
                No matter how small they might be, there are risks to be considered when trading IOUs/Futures on DEUS Swap.
            </p>

            <p>
                There are also systemic risks in buying IOUs with the intent to swap them to wrapped tokens. This only concerns swapping IOUs to wrapped tokens and has nothing to do with trading IOUs.

            </p>


            <h5>
                GENERAL RISKS OF TRADING  FUTURES/IOUS:
            </h5>

            <p>
                The event on which you are speculating, e.g. "Coinbase IPO" might not occur (The IPO might be called off by regulators, etc.)<br />
                -&gt; The market for that specific futures/IOU would be closed.
                <br />  <br />
                DEUS total stock market might reach its temporary (!) hard cap:<br />
                 -&gt; EFFECT: You will simply have to wait a bit to swap to the wrapped version. You might also consider selling it back to the bonding curve. (always possible)
                  <br />  <br />
               Short/long-position imbalances might increase the system’s trading fees or lower hard cap amounts:<br />
                -&gt; EFFECT: You will not be able to open a position, or have to pay very high fees
                  <br />  <br />
                Unforeseen technical/network delays might happen on swapping from IOUs to wrapped tokens<br />
                -&gt; EFFECT: You will simply have to wait for the technical issues to be resolved.
            </p>

            <div className="risk-btns">
                <div className="btn" onClick={() => {
                    localStorage.setItem("isRiskOk", Date.now())
                    handleRiskPopup(false)
                }
                }>I Understand</div>
                <a className="btn" href="https://wiki.deus.finance/docs" target="_blank" rel="noopener noreferrer">Learn more</a>
            </div>

            <p className="consider">TRADING FUTURES ON DEUS SWAP IS AN EXPERIMENTAL FEATURE</p>

        </div >}

    />)
}

export default Risk;