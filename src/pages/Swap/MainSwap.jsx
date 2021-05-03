import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { getStayledNumber, notify, formatBalance, checkLimit } from '../../utils/utils';
import TokenBox from '../../components/Swap/TokenBox';
import SearchBox from '../../components/Swap/SearchBox';
import TokenMarket from '../../components/Swap/TokenMarket';
import Title from '../../components/Swap/Title';
import SwapButton from '../../components/Swap/SwapButton';
import { SwapService } from '../../services/SwapService';
import Routes from '../../components/Swap/Routes';
import '../../components/Swap/mainSwap.scss';
import Slippage from '../../components/Swap/Slippage';
import SwapWrap from '../../components/Swap/SwapWrap';
import PriceBox from '../../components/Swap/PriceBox';
import SelectedNetworks from '../../components/Sync/SelectNetworks';
import { withTranslation } from 'react-i18next'


class MainSwap extends Component {
    state = {
        tokens: ["eth", "deus", "dea", "dai", "wbtc", "usdc"],
        web3: null,
        tokensMap: {},
        swap: {
            from: {
                name: "", pic_name: "", price: "", balance: "", amount: ""
            },
            to: {
                name: "", pic_name: "", price: "", balance: "", amount: ""
            }
        },
        showSearchBox: false,
        searchBoxType: "from",
        currInputType: "from",
        fromPerTo: true,
        minPerTo: 0,
        claimable_amount: null,
        typingTimeout: 0,
        typingInterval: 0,
        typeTransaction: "",
        slippageAmount: 0.5,
        toAmount: "",
        fromAmount: "",
        priceImpact: 0

    }



    methods = {
        onStart: () => {

        },
        onSuccess: () => {
            const { swap, typeTransaction } = this.state
            if (typeTransaction === "approve") {
                this.getSingleAllowances(swap.from.name, true)
                this.setState({ typeTransaction: "" })
            } else {
                this.getSingleBalance(swap.to.name, true)
                this.getSingleBalance(swap.from.name, true)
            }

        },
        onError: () => console.log("onError"),
    }


    async componentDidMount() {
        document.body.style.backgroundColor = '#2c2f36'
        document.body.style.backgroundImage = 'radial-gradient(50% 50% at 50% 50%, #5c5c5c61 0%, #000000 100%)'
        const { chainId, account } = this.props

        this.handleInitToken("from", "eth")
        this.handleInitToken("to", "deus")

        // if (!chainId || !account) return

        await this.setState({ web3: new SwapService(account, chainId) })
        await this.handleIinitBalances()
        await this.getClaimable()
        await this.handleInitAllowances()

    }

    async componentDidUpdate(prevProps) {

        const { chainId, account } = this.props

        if (prevProps.account !== account || prevProps.chainId !== chainId) {
            // if (!chainId || !account) return

            await this.setState({ web3: new SwapService(account, chainId) })
            await this.handleIinitBalances(true)
            await this.getClaimable()
            await this.handleInitAllowances(true)

            this.handleInitToken("from", "eth")
            this.handleInitToken("to", "deus")
        }
    }

    getClaimable = async () => {
        const { web3 } = this.state
        if (!web3) return
        try {
            const amount = await web3.getWithdrawableAmount()
            this.setState({ claimable_amount: amount })
            return amount
        } catch (error) {
            return 0
        }
    }


    handleSlippage = (amount) => {
        this.setState({ slippageAmount: amount })
    }

    handleTokensToMap = () => {
        const { tokens, tokensMap } = this.state
        for (let i = 0; i < tokens.length; i++) {
            tokensMap[tokens[i].name] = tokens[i]
        }
        this.setState({ tokensMap })
    }

    handleInitToken = (type, tokenName, amount = "") => {
        const { swap } = this.state
        const { allTokens } = this.props
        const tk = allTokens[tokenName]
        swap[type] = { ...tk, amount: amount }
        this.setState({ swap, toAmount: "", fromAmount: "" })
    }

    getToken = (tokenName) => this.state.tokens.find(t => t.name === tokenName)

    handleChangeType = () => {
        const { swap } = this.state
        const { from, to } = swap
        from.amount = ""
        to.amount = ""
        swap.from = to
        swap.to = from
        this.setState({ swap, toAmount: "", fromAmount: "" })
        this.handleSwichPerPrice()
    }

    handleSwichPerPrice = () => {
        const { fromPerTo } = this.state
        this.setState({ fromPerTo: !fromPerTo })
    }

    handleTokenInputChange = (stype, amount) => {
        this.handleTyping()

        const { swap } = this.state

        if (amount === "") {
            swap.from.amount = ""
            swap.to.amount = ""
            this.setState({ swap, toAmount: "", fromAmount: "" })
            return
        }
        if (amount === "00") {
            swap.from.amount = "0"
            swap.to.amount = "0"
            this.setState({ swap })
            return
        }

        swap[stype].amount = amount

        this.setState({
            typingTimeout: setTimeout(() => {

                this.setState({
                    typingInterval: setInterval(() => {
                        this.handleCalcPairPrice(stype, amount)
                    }, 10000)
                })

                this.handleCalcPairPrice(stype, amount)

                this.setState({ swap })
            }, 500)
        })

        this.setState({ swap })
    }


    handleTyping = () => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
            clearInterval(this.state.typingInterval)
        }
    }

    handleCalcPairPrice = async (searchBoxType, amount) => {
        const { swap, web3 } = this.state
        console.log(searchBoxType, amount);
        this.setState({ currInputType: searchBoxType })

        if (!web3) return

        const vstype = searchBoxType === "from" ? "to" : "from"

        if (parseFloat(swap[searchBoxType].amount) === 0) {
            swap[vstype].amount = "0"
            this.setState({ swap })
            return
        }

        this.handlePriceImpact()

        try {
            const data = searchBoxType === "from" ? await web3.getAmountsOut(swap.from.name, swap.to.name, amount) : await web3.getAmountsIn(swap.from.name, swap.to.name, amount)
            swap[vstype].amount = getStayledNumber(data, 9)
            this.setState({
                swap,
                fromAmount: swap.from.amount,
                toAmount: swap.to.amount
            })
        } catch (error) {
            console.log(error);
            this.setState({ swap })
        }
    }

    handleSearchBox = (flag, type = "from") => {
        this.setState({ showSearchBox: flag, searchBoxType: type })
    }

    handleIinitBalances = async (foceUpdate) => {
        const { tokens } = this.state

        tokens.map(async (t) => {
            try {
                this.getSingleBalance(t, foceUpdate)
            } catch (error) {
                console.log(error);
            }
        })

    }


    getSingleBalance = async (tokenName, force = false) => {

        const { swap, web3 } = this.state
        if (!web3) return
        const { allTokens, setAllTokens } = this.props

        if (force || !allTokens[tokenName].lastFetchBalance) {

            try {
                const data = await web3.getTokenBalance(tokenName)
                const balance = formatBalance(data)
                allTokens[tokenName].balance = balance
                allTokens[tokenName].lastFetchBalance = true
                if (tokenName === swap.to.name || tokenName === swap.from.name) {
                    this.handleInitToken("from", swap.from.name)
                    this.handleInitToken("to", swap.to.name)
                }
            } catch (error) {
                console.log("getSingleBalance ", tokenName, error);
            }
            setAllTokens(allTokens)
        } else {
            // console.log("fetched balance");
        }
    }


    handleInitAllowances = async (foceUpdate) => {
        const { tokens } = this.state

        tokens.map(async (t) => {
            try {
                this.getSingleAllowances(t, foceUpdate)
            } catch (error) {
                console.log(error);
            }
        })
    }


    getSingleAllowances = async (tokenName, force = false) => {
        const { swap, web3 } = this.state

        if (!web3) return

        const { allTokens, setAllTokens } = this.props

        if (tokenName === "deus" || force || !allTokens[tokenName].lastFechAllowance) {

            try {
                const allowances = await web3.getAllowances(tokenName)
                allTokens[tokenName].allowances = parseInt(allowances)
                allTokens[tokenName].lastFechAllowance = true
                if (tokenName === swap.from.name || tokenName === swap.to.name) {
                    this.handleInitToken("from", swap.from.name, swap.from.amount)
                    this.handleInitToken("to", swap.to.name, swap.to.amount)
                }
                setAllTokens(allTokens)

            } catch (error) {
                console.log(tokenName, error);
            }
        }

    }


    handleChangeToken = (tokenName) => {
        const { searchBoxType, swap } = this.state
        const vstype = searchBoxType === "from" ? "to" : "from"

        if (swap[vstype].name === tokenName) {
            const tmp = swap[searchBoxType].name
            this.handleInitToken(vstype, tmp)
        } else {
            const tmp = swap[vstype].name
            this.handleInitToken(vstype, tmp)
        }
        this.setState({ minPerTo: 0 })
        this.handleInitToken(searchBoxType, tokenName)
        this.handleSearchBox(false)
    }

    handleFilterToken = () => {
        const { searchBoxType, tokens, swap } = this.state
        return tokens.filter(t => swap[searchBoxType].name !== t.name)
    }


    isApproved = () => {
        const { swap } = this.state
        return swap.from.allowances > 0
    }

    handleSwap = async () => {
        const { swap, web3, slippageAmount } = this.state
        if (!web3) return

        if (checkLimit(swap)) {
            return
        }

        const { from, to } = swap

        try {
            this.setState({ typeTransaction: "swap" })

            const data = !(swap.from.allowances > 0) ?
                this.handleApprove(swap) :
                await web3.swapTokens(from.name, to.name, from.amount, (1 - (slippageAmount / 100)) * (to.amount), notify(this.methods))

            console.log(data);
        } catch (error) {

        }
    }


    handleApprove = async (swap) => {
        const { web3 } = this.state

        if (checkLimit(swap)) {
            return
        }

        try {
            this.setState({ typeTransaction: "approve" })
            const data = await web3.approve(swap.from.name, swap.from.amount, notify(this.methods))
            return data
        } catch (error) {
            console.log(error);
        }
        return 0
    }

    handlePriceImpact = async () => {
        const { swap, web3 } = this.state
        try {
            const result = await web3.getAmountsOut(swap.from.name, swap.to.name, 0.1)
            this.setState({ minPerTo: parseFloat(result) })
        } catch (error) {
            console.log(error);
        }
    }


    render() {

        const { showSearchBox, swap, fromPerTo, toAmount, fromAmount,
            searchBoxType, tokens, web3, claimable_amount, slippageAmount, minPerTo } = this.state
        const { allTokens } = this.props
        const from_token = swap.from
        const to_token = swap.to
        const approved = this.isApproved()
        const isMobile = window.innerWidth < 670
        const { chainId } = this.props
        const { t } = this.props;
        const priceImpactResult = (toAmount === "" || fromAmount === "") ? 0 : ((1 - (toAmount / ((fromAmount / 0.1) * minPerTo))) * 100).toFixed(3)
        return (<div className="deus-swap-wrap">

            {!isMobile && <ToastContainer style={{ width: "450px" }} />}



            <Title web3={web3} claimable_amount={claimable_amount} />

            <SwapWrap>
                <div className="swap-box">

                    <TokenBox type={"from"} token={from_token}
                        estimated=""
                        handleSearchBox={this.handleSearchBox}
                        handleTokenInputChange={this.handleTokenInputChange}
                    />

                    <img
                        onClick={this.handleChangeType}
                        src={process.env.PUBLIC_URL + "/img/arrow.svg"}
                        alt="arrow"
                        className="arrow" />

                    <TokenBox type={"to"} token={to_token}
                        estimated={` (${t("estimated")})`}
                        handleSearchBox={this.handleSearchBox}
                        handleTokenInputChange={this.handleTokenInputChange}
                        disabled={true}
                    />

                    <TokenMarket
                        handleSwich={this.handleSwichPerPrice}
                        swap={swap}
                        toAmount={toAmount}
                        fromAmount={fromAmount}
                        fromPerTo={fromPerTo}
                        perPrice={""}
                        tvl={""}
                        tradeVol={""} />

                    <div style={{ margin: "8px 0" }}></div>

                    <SwapButton handleSwap={this.handleSwap} token={swap.from} approved={approved} web3={web3} isMobile={isMobile} />
                </div>

                <SearchBox
                    showSearchBox={showSearchBox}
                    choosedToken={swap[searchBoxType].name}
                    handleSearchBox={this.handleSearchBox}
                    allTokens={allTokens}
                    tokens={tokens}
                    handleFilterToken={this.state.tokensMap}
                    handleChangeToken={this.handleChangeToken}
                />

                {/* <PriceBox impact={""} vaultsFee={""} /> */}
                {<PriceBox impact={priceImpactResult} />}

                {from_token.name && to_token && <Routes from={from_token} to={to_token} chainId={chainId} />}
                <Slippage slippage={slippageAmount} setSlippage={this.handleSlippage} />


            </SwapWrap>

            <div className='tut-left-wrap'>
                <SelectedNetworks />
            </div>

        </div>);
    }
}


export default withTranslation()(MainSwap);
