import React from 'react';
import { isDesktop } from '../../utils/utils';

const ConnectButton = (props) => {
    const { address, isMetamask, withdrawAmount, handleClaim, handleConnectWallet, showAddress } = props
    const missingText = isDesktop() ? "Install MetaMask Wallet" : "Open MetaMask"
    const connectClass = !isDesktop() ? "swaping" : "swaping hcenter"


    return (
        <div className="connect ">
            <div className={connectClass}>
                {address && <div className="vertical-center connect-btn connected" >{showAddress()}</div>}
                {!address && !isMetamask && <a href="https://metamask.app.link/dapp/deus.finance/swap/" className="vertical-center connect-btn notconnect">{missingText}</a>}
                {!address && isMetamask && <div className="vertical-center connect-btn notconnect" onClick={handleConnectWallet}>Connect Wallet</div>}
                {withdrawAmount != 0 && <div className="claim">
                    <div className="eth-amount">{withdrawAmount} ETH claimable.</div>
                    <div className="claim-btn" onClick={handleClaim}>claim now</div>
                </div>
                }
            </div>
            <div className="clear-fix" />
            <div className="ctimer"></div>
        </div>);
}

export default ConnectButton;