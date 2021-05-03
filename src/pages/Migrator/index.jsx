import React, { Component } from 'react';
import TokenBox from '../../components/Swap/TokenBox';
import TokenMarket from '../../components/Swap/TokenMarket';
import Title from '../../components/Swap/Title';
import { ToastContainer } from 'react-toastify';
import { MigratorService as SwapService } from '../../services/migratorService';
import { getStayledNumber, notify, formatBalance } from '../../utils/utils';
import LongShort from '../../components/Swap/LongShort';
import '../../components/Swap/mainSwap.scss';
import MigratorButton from '../../components/Swap/MigratorButton';



class Migrator extends Component {
    state = {
        tokens: ["coinbase", "dcoin", "dcoin-s"],
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
        fromPerTo: false,
        showRiskPupop: false,
        claimable_amount: null,
        typingTimeout: 0,
        typeTransaction: "",
        toAmount: "",
        fromAmount: "",
        isLong: true,
        slippageAmount: 0.1
    }


    methods = {
        onStart: () => {

        },
        onSuccess: () => {
            const { typeTransaction } = this.state
            if (typeTransaction === "approve") {
                // this.getSingleAllowances(swap.from.name, true)
                this.setState({ typeTransaction: "" })
            } else {
                this.getSingleBalance("coinbase", true)
                this.getSingleBalance("dcoin", true)
                this.getSingleBalance("dcoin-s", true)
            }

        },
        onError: () => console.log("onError"),
    }

    newService = null;

    async componentDidMount() {
        document.body.style.backgroundColor = '#2c2f36'
        document.body.style.backgroundImage = 'radial-gradient(50% 50% at 50% 50%, #5c5c5c61 0%, #000000 100%)'
        const { chainId, account } = this.props
        this.handleInitToken("from", "coinbase")
        this.handleInitToken("to", "dcoin")
        await this.setState({ web3: new SwapService(account, chainId) })
        await this.handleIinitBalances()
        await this.getClaimable()
    }

    async componentDidUpdate(prevProps) {

        const { chainId, account } = this.props

        if (prevProps.account !== account || prevProps.chainId !== chainId) {

            this.setState({ isLong: true })

            await this.setState({ web3: new SwapService(account, chainId) })
            await this.handleIinitBalances(true)
            await this.getClaimable()

            this.handleInitToken("from", "coinbase")
            this.handleInitToken("to", "dcoin")
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

    handleSetLong = (flag = true) => {
        const { swap } = this.state
        const { to } = swap
        if (flag) {
            this.handleInitToken("to", "dcoin", to.amount)
        } else {
            this.handleInitToken("to", "dcoin-s", to.amount)
        }
        this.setState({ isLong: flag })
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
                this.handleCalcPairPrice(stype, amount)

                this.setState({ swap })
            }, 500)
        })

        this.setState({ swap })
    }


    handleSlippage = (amount) => {
        this.setState({ slippageAmount: amount })
    }


    handleTyping = () => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }
    }

    handleCalcPairPrice = async (searchBoxType, amount) => {
        const { swap, web3 } = this.state
        if (!web3) return

        const vstype = searchBoxType === "from" ? "to" : "from"

        if (parseFloat(swap[searchBoxType].amount) === 0) {
            swap[vstype].amount = "0"
            this.setState({ swap })
            return
        }


        try {
            const ratio = await web3.getRatio()
            let data = ""
            if (searchBoxType === "from") {
                data = swap[searchBoxType].amount * ratio
            } else {
                data = swap[searchBoxType].amount / ratio
            }
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
                allTokens[tokenName].balance = parseFloat(balance)
                allTokens[tokenName].lastFetchBalance = true
                if (tokenName === swap.to.name || tokenName === swap.from.name) {
                    this.handleInitToken("from", swap.from.name)
                    this.handleInitToken("to", swap.to.name)
                }
            } catch (error) {
                console.log(tokenName);
                console.log(error);
            }
            setAllTokens(allTokens)
        } else {
            // console.log("fetched balance");
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

    handleMigrate = async () => {
        const { swap, web3 } = this.state
        if (!web3) return


        const { from, to } = swap
        try {
            // !(swap.from.allowances > 0) ?
            //     this.handleApprove(swap) :
            //     await web3.migrate(from.amount, to.name, notify(this.methods))
            await web3.migrate(from.amount, to.name, notify(this.methods))
        } catch (error) {

        }
    }


    render() {

        const { isLong, swap, fromPerTo, toAmount, fromAmount, web3, claimable_amount } = this.state
        const from_token = swap.from
        const to_token = swap.to
        const isMobile = window.innerWidth < 670

        return (<div className="deus-swap-wrap">
            {!isMobile && <ToastContainer style={{ width: "450px" }} />}
            <Title web3={web3} claimable_amount={claimable_amount} isMigrator={true} />

            <div className="swap-container-wrap">
                <div className="swap-container">
                    <div className="swap-box-wrap">
                        <div className="swap-box">

                            <TokenBox type="from" token={from_token}
                                estimated=" "
                                handleSearchBox={this.handleSearchBox}
                                handleTokenInputChange={this.handleTokenInputChange}
                                isIPO={true}
                                isFutures={true}

                            />

                            <img
                                src={process.env.PUBLIC_URL + "/img/arrow.svg"}
                                alt="arrow"
                                className="arrow" />

                            <TokenBox type="to" token={to_token}
                                estimated=" (estimated)"
                                isIPO={true}
                                isFutures={false}
                                isMigrator={true}
                                handleSearchBox={this.handleSearchBox}
                                handleTokenInputChange={this.handleTokenInputChange}
                            />
                            <div style={{ margin: "10px 0" }}></div>

                            <LongShort isWrap={true} isLong={isLong} handleLong={this.handleSetLong} />

                            <div style={{ margin: "8px 0" }}></div>

                            <TokenMarket
                                handleSwich={this.handleSwichPerPrice}
                                swap={swap}
                                toAmount={toAmount}
                                fromAmount={fromAmount}
                                fromPerTo={fromPerTo}
                                isMigrator={true}
                                perPrice={""}
                                tvl={""}
                                tradeVol={""} />


                            <div style={{ margin: "20px 0" }}></div>

                            <MigratorButton handleMigrate={this.handleMigrate} token={swap.from} approved={true} web3={web3} isMobile={isMobile} />
                        </div>


                    </div>
                </div>
            </div>
        </div>);
    }
}


export default Migrator;