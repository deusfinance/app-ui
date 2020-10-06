import React, { Component } from 'react';
import Swap from './Swap';
import { toast, ToastContainer } from 'react-toastify';
import ConnectButton from '../common/ConnectButton';
// import '../../styles/scss/exchange.css'

class DesktopSwap extends Component {
    state = {}

    notify = (state) => {

        switch (state) {
            case "waiting": {
                toast.info("Waiting for Metamask confirmation.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            case "transactionHash": {
                toast.info("Transaction broadcasted.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            case "receipt": {
                toast.success("Transaction Successful.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                this.initialAmounts()
                break
            }
            case "connectWallet": {
                toast.warn("Please Connect Wallet.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            case "error": {
                toast.warn("Transaction Failed.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            default: {
                toast.info("Unhandled Event.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    };

    render() {

        const { perDeus, swap, isBuy, isEthUnit, ethInUsd, isMetamask, wallet, showPopup } = this.props.mainState
        const { address, withdrawAmount } = wallet
        const { SwapState, tokens } = this.props.mainState
        const { handleTokenInputChange, switchOrder, handleSwap, handleUnit, handleMax, handleConnectWallet, showAddress, handleClaim, handleApproveSell } = this.props

        const PerDeusETH = parseFloat(perDeus).toFixed(4)
        const PerDeusDollar = parseFloat(perDeus * ethInUsd).toFixed(4)

        let priceClasses = "priceBar-xl";
        let priceViewClasses = "priceView-xl";
        if (window.innerWidth < 1261) {
            priceClasses = "priceBar-lg"
            priceViewClasses = "priceView-lg"
        }
        return (<>
            <ToastContainer style={{ width: "400px" }} />
            <div className="ex-wrapper">
                <ConnectButton address={address}
                    isMetamask={isMetamask}
                    withdrawAmount={withdrawAmount}
                    handleClaim={handleClaim}
                    handleConnectWallet={handleConnectWallet}
                    showAddress={showAddress} />
                <div className="container">
                    {showPopup && <div className="sell-popup">
                        <div className="ptitle">Important Notice:</div>
                        <div className="pdetails"> TWO transactions will need your approval </div>
                        <div className="pdetails-steps"> 1. Selling DEUS to ETH. <br /> 2. Withdrawing ETH to your Wallet. <br /><br />Or come back and claim later. </div>
                        <div className="btn-wrp">
                            <div className="understood" onClick={handleApproveSell}>  Roger that, Lafa!</div>
                        </div>
                    </div>}
                    <div className="wrapper-content">
                        <div className="content">
                            <img className="cricleTop" src="img/cTop.svg" alt="ctop" />
                            <img className="cricleDown" src="img/cDown.svg" alt="cdown" />
                            <img className={`rectMovable ${priceClasses}`} src="img/rect-movable.svg" alt="rect" />
                            <div className="unit-btn" onClick={handleUnit}>{!isEthUnit ? "Show ETH Price" : "Show Dollar Price"}</div>
                            <div className={`priceView ${priceViewClasses}`}>{perDeus && (isEthUnit ? PerDeusETH + " ETH" : PerDeusDollar + " $")}</div>
                            <div className="title-wrapper">
                                <div className="main-title"><span className="deus-name">DEUS</span> Swap</div>
                            </div>
                            <Swap tokens={tokens}
                                swap={swap}
                                handleTokenInputChange={handleTokenInputChange}
                                handleMax={handleMax}
                                isBuy={isBuy}
                                switchOrder={switchOrder}
                                perDeus={perDeus}
                                handleSwap={handleSwap}
                                SwapState={SwapState} />
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    }
}

export default DesktopSwap;

