import React, { Component } from 'react'
import Swap from './Swap';

import '../../styles/scss/exchange-mobile.scss'
import ConnectButton from '../common/ConnectButton';


class MobileSwap extends Component {
    state = {}


    render() {



        const { perDeus, swap, isBuy, isMetamask, wallet, showPopup } = this.props.mainState
        const { address, withdrawAmount } = wallet
        const { SwapState, tokens } = this.props.mainState
        const { handleTokenInputChange, switchOrder, handleSwap, handleMax, handleConnectWallet, showAddress, handleClaim, handleApproveSell } = this.props

        const innerHeight = window.innerHeight
        const marginCounter = innerHeight > 600 ? (innerHeight - 600) / 3 : 0

        return (
            <div className="exm-wrapper"  >
                <div className="exchange-mobile">
                    <div className="counter" style={{ marginBottom: `${marginCounter}px` }}>
                        <ConnectButton address={address}
                            isMetamask={isMetamask}
                            withdrawAmount={withdrawAmount}
                            handleClaim={handleClaim}
                            handleConnectWallet={handleConnectWallet}
                            showAddress={showAddress} />
                        <div className="clear-fix" />
                    </div>
                    <div className="container" style={{ padding: 0 }}>
                        {showPopup && <div className="sell-popup-mob" >
                            <div className="ptitle">Important Notice:</div>
                            <div className="pdetails"> TWO transactions will need your approval </div>
                            <div className="pdetails-steps"> 1. Selling DEUS to ETH. <br /> 2. Withdrawing ETH to your Wallet. </div>
                            <div className="btn-wrp">
                                <div className="understood" onClick={handleApproveSell}>  Roger that, Lafa!</div>
                            </div>
                        </div>}



                        <Swap tokens={tokens}
                            swap={swap}
                            handleTokenInputChange={handleTokenInputChange}
                            handleMax={handleMax}
                            isBuy={isBuy}
                            switchOrder={switchOrder}
                            perDeus={perDeus}
                            handleSwap={handleSwap}
                            SwapState={SwapState}
                            handleApproveSell={handleApproveSell}
                            showPopup={showPopup} />
                    </div>
                </div>
            </div>
        );
    }
}

export default MobileSwap;