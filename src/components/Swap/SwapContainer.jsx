import React, { Component } from 'react'
import * as swapService from '../../services/SwapService'
import { toast } from 'react-toastify';
import Footer from '../common/Footer';
import DesktopSwap from './DesktopSwap';

import 'react-toastify/dist/ReactToastify.css';
import '../../styles/scss/exchange.css'
import MobileSwap from './MobileSwap';
// import '../../styles/scss/exchange-mobile.css'
import { isDesktop } from '../../utils/utils';


class SwapContainer extends Component {

    state = {
        swap: {
            from: {
                name: "ethereum",
                amount: "",
            },
            to: {
                name: "deus",
                amount: "",
            }
        },
        tokens: {
            "ethereum": {
                balance: "0"
            },
            "deus": {
                balance: "0"
            }
        },
        wallet: {
            withdrawAmount: 0,
            address: null,
        },
        isEthUnit: true,
        isMetamask: false,
        SwapState: null,
        perDeus: "",
        ethInUsd: "",
        isBuy: true,
        showPopup: false,
        typingTimeout: 0,
    }

    componentDidMount() {
        document.title = 'DEUS swap';
        setTimeout(() => this.initialAmounts(), 500);
    }


    getEthToUsdt = async () => {
        try {
            const resp = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
            const jresp = await resp.json()
            this.setState({ ethInUsd: jresp.ethereum.usd })

        } catch (error) {
            console.log("get dollar price had some error", error);
        }
    }


    getPerDeus = () => {
        const { isBuy } = this.state
        if (isBuy) {
            setTimeout(() => swapService.getTokenAmountIfBuying(1).then(response => {
                console.log(response)
                this.setState({ perDeus: 1 / response })
            }), 1000);
        } else {
            setTimeout(() => swapService.getEtherAmountIfSellingToken(1).then(response => {
                this.setState({ perDeus: response })
            }), 1000);
        }
    }


    setCurrentAmount = (name, amount) => {
        const { swap } = this.state
        amount = this.getStayledNumber(amount)
        swap.from.name === name ? swap.from.amount = amount : swap.to.amount = amount
        this.setState({ swap })
    }


    setBalance = (name, balance) => {
        const { tokens } = this.state
        tokens[name].balance = balance
        this.setState({ tokens })
    }

    initialAmounts = () => {
        swapService.getEtherBalance().then(balance => {
            this.setBalance("ethereum", balance)
            this.isConnected()
        });
        swapService.getTokenBalance().then(balance => {
            this.setBalance("deus", balance)
        })
        swapService.getWithdrawableAmount().then(amount => {
            console.log(amount);
            const { wallet } = this.state
            wallet.withdrawAmount = amount
            this.setState({ wallet })
        })
        this.getEthToUsdt()
        this.getPerDeus()
    }


    isConnected = () => {
        if (window.ethereum) {
            if (window.ethereum.selectedAddress) {
                const { wallet } = this.state
                wallet.address = window.ethereum.selectedAddress
                this.setState({ wallet })
            }
            if (window.ethereum.isMetaMask) {
                this.setState({ isMetamask: true })
            }
        }
    }


    handleConnectWallet = async () => {
        try {
            const rep = await swapService.connectWallet()
            console.log(rep ? "connected to metamask" : "");
            this.initialAmounts()
        } catch (error) {
            console.log("didnt connect to metamask");
        }
    }


    getStayledNumber = (number, space = 9) => {
        const strNumber = number.toString()
        const indexDot = strNumber.indexOf(".")
        if (indexDot === -1) return strNumber
        if (indexDot > space - 2) return strNumber.substring(0, indexDot)
        return strNumber.substring(0, indexDot).concat(strNumber.substring(indexDot, space))
    }


    switchOrder = () => {
        const { isBuy, swap } = this.state
        swap.from.amount = ""
        swap.to.amount = ""
        this.setState({ isBuy: !isBuy, swap })
        setTimeout(() => this.getPerDeus(!isBuy), 500)
    }


    handleMax = (stype, amount) => {
        const { swap } = this.state
        swap[stype].amount = this.getStayledNumber(amount)
        this.setState(swap)
        this.getAmountFromSwap(stype, amount)
    }


    handleTokenInputChange = (stype, amount) => {
        this.handleTyping()
        const { swap } = this.state

        if (amount === "") {
            swap.from.amount = ""
            swap.to.amount = ""
            this.setState({ swap })
            return
        }
        if (amount === "00") {
            swap.from.amount = "0"
            swap.to.amount = "0"
            this.setState({ swap })
            return
        }
        swap[stype].amount = amount
        this.setState({ swap })
        this.getAmountFromSwap(stype, amount)
    }


    getAmountFromSwap = (stype, amount) => {
        const { isBuy, swap } = this.state
        console.log(stype, amount);

        this.setState({
            typingTimeout: setTimeout(() => {
                if (isBuy) {
                    if (swap[stype].name === "deus") {
                        swapService.getEtherAmountRequiredForPurchasingToken(amount).then(response => {
                            this.setCurrentAmount("ethereum", response)
                        });
                    } else {
                        swapService.getTokenAmountIfBuying(amount).then(response => {
                            this.setCurrentAmount("deus", response)
                        });
                    }
                } else {

                    if (swap[stype].name === "deus") {
                        swapService.getEtherAmountIfSellingToken(amount).then(response => {
                            this.setCurrentAmount("ethereum", response)
                        });
                    } else {
                        swapService.getTokenAmountRequiredForGettingEther(amount).then(response => {
                            this.setCurrentAmount("deus", response)
                        });
                    }
                }
                return
            }, 500)
        })
    }


    handleTyping = () => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }
    }


    handleClaim = async () => {
        try {
            const resp = await swapService.withdrawPayment(this.handleSwapState)
            console.log(resp);
        } catch (error) {
            console.log("error claim");
        }
    }



    handleSwapState = (state) => {
        const swapStates = ["waiting", "transactionHash", "receipt", "confirmation", "error"]
        if (swapStates.indexOf(state) === -1) {
            console.log(state);
            this.setState({ SwapState: null })
            return
        }
        if (state === "receipt" || state === "error") {
            this.setState({ SwapState: null })
            this.notify(state)
            return
        }
        this.notify(state)
        this.setState({ SwapState: state })
    }

    showAddress = () => {
        const { address } = this.state.wallet
        return address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length)
    }


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


    handleSwap = () => {
        const { swap, isBuy } = this.state
        const { address } = this.state.wallet
        if (swap.from.amount === "0" || swap.from.amount === "") {
            return
        }

        if (!address) {
            this.notify("connectWallet")
            return
        }
        if (isBuy) {
            this.handleBuy()
        } else {
            this.handlePopup(true)
        }
    }

    handleBuy = async () => {
        const { swap } = this.state
        this.handleSwapState("waiting")
        try {
            const res = await swapService.buyToken(swap.from.amount, swap.to.amount, this.handleSwapState)
            console.log(res ? "transaction done" : "");
        } catch (error) {
            console.log("transaction didnt done", error);
        }
        swap.from.amount = ""
        swap.to.amount = ""
        this.setState({ swap })
    }


    handleSell = async () => {
        const { swap } = this.state
        this.handleSwapState("waiting")
        try {
            const res = swapService.sellToken(swap.to.amount, swap.from.amount, this.handleSwapState)
            console.log(res ? "transaction done" : "");
        } catch (error) {
            console.log("transaction didnt done", error);
        }
        swap.from.amount = ""
        swap.to.amount = ""
        this.setState({ swap })
    }



    handlePopup = (isPop) => {
        this.setState({ showPopup: isPop })
    }

    handleUnit = () => {
        const { isEthUnit } = this.state
        this.setState({ isEthUnit: !isEthUnit })
    }


    handleApproveSell = () => {
        this.handlePopup(false)
        this.handleSell()
    }



    render() {


        let footerClass = ""
        if (window.innerHeight > 598) {
            footerClass = "footer-wrp"
        }

        const footers = [
            { href: "https://github.com/deusfinance", title: "Github" },
            { href: "https://t.me/deusfinance", title: "Telegram" },
        ]


        // const { perDeus, isBuy, isEthUnit, ethInUsd } = this.state
        // const { SwapState, tokens, showPopup, isMetamask } = this.state
        // const { address, withdrawAmount } = this.state.wallet
        // const { from, to } = this.state.swap
        // let priceClasses = "priceBar-xl";
        // let priceViewClasses = "priceView-xl";
        // if (window.innerWidth < 1261) {
        //     priceClasses = "priceBar-lg"
        //     priceViewClasses = "priceView-lg"
        // }
        // const PerDeusETH = parseFloat(perDeus).toFixed(4)
        // const PerDeusDollar = parseFloat(perDeus * ethInUsd).toFixed(4)



        return (<div>
            {isDesktop() && <DesktopSwap
                mainState={this.state}
                handleMax={this.handleMax}
                handleTokenInputChange={this.handleTokenInputChange}
                switchOrder={this.switchOrder}
                handleSwap={this.handleSwap}
                handleUnit={this.handleUnit}
                handleApproveSell={this.handleApproveSell}
                showAddress={this.showAddress}
                handleClaim={this.handleClaim}
                handleConnectWallet={this.handleConnectWallet} />
            }
            {!isDesktop() && <MobileSwap
                mainState={this.state}
                handleMax={this.handleMax}
                handleTokenInputChange={this.handleTokenInputChange}
                switchOrder={this.switchOrder}
                handleSwap={this.handleSwap}
                handleUnit={this.handleUnit}
                handleApproveSell={this.handleApproveSell}
                showAddress={this.showAddress}
                handleClaim={this.handleClaim}
                handleConnectWallet={this.handleConnectWallet}
            />}
            {isDesktop() && <Footer classes="social" />}
            {!isDesktop() && <Footer classes="msocial" items={footers} footerClass={footerClass} />}
        </div >
        );
    }
}

export default SwapContainer;