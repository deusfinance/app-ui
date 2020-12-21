import Web3 from 'web3'
import paths from './graph'
import abis from './abis'
import addrs from './addresses.json'

export class SwapService {

    constructor(account, chainId) {
        this.account = account;
        this.chainId = chainId;
        this.INFURA_URL = 'wss://' + this.getNetworkName() + '.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093';
        this.infuraWeb3 = new Web3(new Web3.providers.WebsocketProvider(this.INFURA_URL));
        this.AutomaticMarketMakerContract = new this.infuraWeb3.eth.Contract(abis["amm"], this.getAddr("amm"));
        this.DeusSwapContract = new this.infuraWeb3.eth.Contract(abis["deus_swap_contract"], this.getAddr("deus_swap_contract"));
        this.uniswapRouter = new this.infuraWeb3.eth.Contract(abis["uniswap_router"], this.getAddr("uniswap_router"));
    }

    checkWallet = () => this.account && this.chainId

    networkNames = {
        1: "Mainnet",
        3: "Ropsten",
        4: "Rinkeby",
        42: "Kovan",
    }

    getNetworkName = () => this.networkNames[this.chainId.toString()]

    getAddr = (tokenName) => addrs[tokenName][this.chainId.toString()]

    getTokenAddr = (tokenName) => addrs["token"][tokenName][this.chainId.toString()]

    TokensMaxDigit = {
        wbtc: 8,
        usdt: 6,
        usdc: 6,
        coinbase: 18,
        dea: 18,
        deus: 18,
        dai: 18,
        eth: 18,
    }

    _getWei(number, token = "eth") {
        const max = this.TokensMaxDigit[token] ? this.TokensMaxDigit[token] : 18
        const value = typeof number === "string" ? parseFloat(number).toFixed(18) : number.toFixed(18)
        // if(max!==18){
        //       return  new Web3.utils.BN(value).mul(new Web3.utils.BN(10 **(max)))
        // }

        // if (max !== 18) {
        //     console.log(number, token, "_getWei");
        //     const value = typeof number === "string" ? parseFloat(number).toFixed(max) : number.toFixed(max)
        //     var BN = Web3.utils.BN
        //     let asn = new BN(number.toString()).mul(new BN(10 ** max))
        //     console.log("answer", asn.toString());
        //     return asn
        // }
        return Web3.utils.toWei(String(value), 'ether')
    }

    getEtherBalance() {
        if (!this.checkWallet()) return 0
        return this.infuraWeb3.eth.getBalance(this.account).then(balance => {
            return Web3.utils.fromWei(balance, 'ether');
        })
    }


    getTokenBalance(tokenName) {
        if (!this.checkWallet()) return 0

        const account = this.account;

        if (tokenName === "eth") {
            return this.getEtherBalance(account)
        }
        const TokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(tokenName))
        return TokenContract.methods.balanceOf(account).call().then(balance => {
            const max = this.TokensMaxDigit[tokenName] ? this.TokensMaxDigit[tokenName] : 18
            if (max !== 18) {
                return Web3.utils.fromWei(balance, 'mwei') / (10 ** (max - 6))
            }
            console.log(tokenName, "\t", balance);
            return Web3.utils.fromWei(balance, 'ether');
        })
    }




    approve(token, amount, listener) {
        if (!this.checkWallet()) return 0

        if (token === 'usdt') return this.safeApprove(token, amount, listener)

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const TokenContract = new metamaskWeb3.eth.Contract(abis["token"], this.getTokenAddr(token));
        amount = Math.max(amount, 10 ** 20);

        return TokenContract.methods.approve(this.getAddr("deus_swap_contract"), this._getWei(amount, token))
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"));
    }

    safeApprove(token, amount, listener) {
        if (!this.checkWallet()) return 0

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const TokenContract = new metamaskWeb3.eth.Contract(abis["token"], this.getTokenAddr(token));
        amount = Math.max(amount, 10 ** 20);

        return TokenContract.methods.safeApprove(this.getAddr("deus_swap_contract"), this._getWei(amount, token))
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"));
    }

    getAllowances(token) {
        if (!this.checkWallet()) return 0

        const account = this.account;
        if (token === "eth") return 9999
        console.log(this.getTokenAddr(token));
        const TokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(token))
        return TokenContract.methods.allowance(account, this.getAddr("deus_swap_contract"))
            .call().then(amount => {
                let result = Web3.utils.fromWei(amount, 'ether');
                // console.log(result);
                return result;
            });
    }


    swapTokens(fromToken, toToken, tokenAmount, listener) {

        if (!this.checkWallet()) return 0

        console.log(fromToken, toToken, tokenAmount);

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const DeusSwapContract = new metamaskWeb3.eth.Contract(abis["deus_swap_contract"], this.getAddr("deus_swap_contract"));

        var path = paths[fromToken][toToken];
        console.log("pathssss ", path);

        // console.log(path);
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (fromToken === 'coinbase') {
            if (toToken === 'deus') {
                return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount, fromToken), 8, [], [])
                    .send({
                        from: this.account
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            } else if (toToken === 'eth') {
                console.log("to eth  ", path);

                return DeusSwapContract.methods.swapTokensForEth(this._getWei(tokenAmount, fromToken), 2, [])
                    .send({
                        from: this.account
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            } else {
                if (path[2] == this.getTokenAddr("weth")) {
                    var path1 = path.slice(2);
                    console.log("path", path1)
                    return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount), 4, path1, []) // change type
                        .send({
                            from: this.account
                        }).once('transactionHash', () => listener("transactionHash"))
                        .once('receipt', () => listener("receipt"))
                        .once('error', () => listener("error"))

                } else {
                    var path1 = path.slice(1);
                    console.log("path", path1)
                    return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount), 3, path1, []) // change type
                        .send({
                            from: this.account
                        }).once('transactionHash', () => listener("transactionHash"))
                        .once('receipt', () => listener("receipt"))
                        .once('error', () => listener("error"))
                }
            }

        } else if (toToken === 'coinbase') {
            if (fromToken === 'deus') {
                return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount, fromToken), 7, [], [])
                    .send({
                        from: this.account
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            } else if (fromToken === 'eth') {
                return DeusSwapContract.methods.swapEthForTokens([], 2)
                    .send({
                        from: this.account,
                        value: this._getWei(tokenAmount, fromToken)
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            } else {
                if (path[path.length - 3] === this.getTokenAddr("weth")) {
                    var path1 = path.slice(0, path.length - 2);

                    return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount), 5, path1, [])
                        .send({
                            from: this.account
                        }).once('transactionHash', () => listener("transactionHash"))
                        .once('receipt', () => listener("receipt"))
                        .once('error', () => listener("error"))
                } else {
                    var path1 = path.slice(0, path.length - 1);

                    return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount), 6, path1, [])
                        .send({
                            from: this.account
                        }).once('transactionHash', () => listener("transactionHash"))
                        .once('receipt', () => listener("receipt"))
                        .once('error', () => listener("error"))
                }
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        } else {

            if (fromToken === 'eth') {
                // swap eth to tokens
                if (path[1] == this.getTokenAddr("deus")) {
                    // swap eth to tokens
                    path = path.slice(1);
                    console.log("path ", path);

                    // first on AMM then uniswap
                    return DeusSwapContract.methods.swapEthForTokens(path, 0)
                        .send({
                            from: this.account,
                            value: this._getWei(tokenAmount, fromToken)
                        }).once('transactionHash', () => listener("transactionHash"))
                        .once('receipt', () => listener("receipt"))
                        .once('error', () => listener("error"))
                } else {
                    // only uniswap
                    // console.log(path);

                    return DeusSwapContract.methods.swapEthForTokens(path, 1)
                        .send({
                            from: this.account,
                            value: this._getWei(tokenAmount, fromToken)
                        }).on('transactionHash', () => listener("transactionHash"))
                        .on('receipt', () => listener("receipt"))
                        .on('error', () => listener("error"))
                }
            } else if (toToken === 'eth') {
                // swap tokens to eth
                console.log("to eth2  ", path);
                if (path[path.length - 2] == this.getTokenAddr("deus")) {
                    console.log("to eth3  ", path);

                    path = path.slice(0, path.length - 1);
                    console.log(path);
                    return DeusSwapContract.methods.swapTokensForEth(this._getWei(tokenAmount, fromToken), 0, path)
                        .send({
                            from: this.account
                        }).once('transactionHash', () => listener("transactionHash"))
                        .once('receipt', () => listener("receipt"))
                        .once('error', () => listener("error"))
                } else {
                    // only uniswap
                    console.log("to eth4  ", path);

                    return DeusSwapContract.methods.swapTokensForEth(this._getWei(tokenAmount, fromToken), 1, path)
                        .send({
                            from: this.account
                        }).once('transactionHash', () => listener("transactionHash"))
                        .once('receipt', () => listener("receipt"))
                        .once('error', () => listener("error"))
                }

            } else {
                // swap tokens to tokens
                console.log("5 aaa  ", path);

                const isDeus = (element) => element === this.getTokenAddr("deus");
                var indexOfDeus = path.findIndex(isDeus);
                if (indexOfDeus != -1) {
                    if (indexOfDeus < path.length - 1) {
                        if (path[indexOfDeus + 1] === "0xc778417E063141139Fce010982780140Aa0cD5Ab") {
                            var path1 = path.slice(0, indexOfDeus + 1);
                            var path2 = path.slice(indexOfDeus + 1);
                            console.log(1, path1, path2)
                            return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount, fromToken), 1, path1, path2)
                                .send({
                                    from: this.account
                                }).once('transactionHash', () => listener("transactionHash"))
                                .once('receipt', () => listener("receipt"))
                                .once('error', () => listener("error"))
                        }
                    }
                    if (indexOfDeus > 0) {
                        if (path[indexOfDeus - 1] === "0xc778417E063141139Fce010982780140Aa0cD5Ab") {
                            var path1 = path.slice(0, indexOfDeus);
                            var path2 = path.slice(indexOfDeus);
                            console.log(2, path1, path2)
                            return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount, fromToken), 0, path1, path2)
                                .send({
                                    from: this.account
                                }).once('transactionHash', () => listener("transactionHash"))
                                .once('receipt', () => listener("receipt"))
                                .once('error', () => listener("error"))
                        }
                    }
                }
                return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount, fromToken), 2, path, [])
                    .send({
                        from: this.account
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            }
        }
    }

    getWithdrawableAmount() {
        if (!this.checkWallet()) return 0
        return this.AutomaticMarketMakerContract.methods.payments(this.account).call().then(amount => {
            console.log("getWithdrawableAmount", amount);
            return Web3.utils.fromWei(amount, 'ether');
        })
    }

    withdrawPayment(listener) {
        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const AutomaticMarketMakerContract = new metamaskWeb3.eth.Contract(abis["amm"], this.getAddr("amm"));
        return AutomaticMarketMakerContract.methods.withdrawPayments(this.account)
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"))
    }

    getAmountsOut(fromToken, toToken, amountIn) {
        if (!this.checkWallet()) return 0

        console.log(fromToken, toToken, amountIn);
        var path = paths[fromToken][toToken];

        return this.uniswapRouter.methods.getAmountsOut(this._getWei(amountIn, fromToken), path).call()
            .then(amountsOut => {
                console.log(amountsOut)
                const max = this.TokensMaxDigit[toToken] ? this.TokensMaxDigit[toToken] : 18
                if (max !== 18) {
                    return Web3.utils.fromWei(amountsOut[amountsOut.length - 1], 'mwei') / (10 ** (max - 6))
                }
                return Web3.utils.fromWei(amountsOut[amountsOut.length - 1], 'ether');
            }
            )
    }

    getAmountsIn(fromToken, toToken, amountOut) {
        // if (!this.checkWallet()) return 0
        return -1;
        // console.log(fromToken, toToken, amountOut);
        // var path = paths[fromToken][toToken];
        // return this.uniswapRouter.methods.getAmountsIn(this._getWei(amountOut, fromToken), path).call()
        //     .then(amountsIn => {
        //         return Web3.utils.fromWei(amountsIn[amountsIn.length - 2], 'ether');
        //     }
        //     )
    }

    approveStocks(amount, listener) {
        if (!this.checkWallet()) return 0

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const TokenContract = new metamaskWeb3.eth.Contract(abis["token"], this.getTokenAddr("dai"));
        amount = Math.max(amount, 10 ** 20);

        return TokenContract.methods.approve(this.getAddr("stocks_contract"), this._getWei(amount))
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"));
    }

    getAllowancesStocks() {
        if (!this.checkWallet()) return 0

        const account = this.account;
        console.log(this.getTokenAddr("dai"));
        const TokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr("dai"))
        return TokenContract.methods.allowance(account, this.getAddr("stocks_contract"))
            .call().then(amount => {
                let result = Web3.utils.fromWei(amount, 'ether');
                // console.log(result);
                return result;
            });
    }

    buyStock(stockAddr, amount, blockNo, v, r, s, price, fee, listener) {
        if (!this.checkWallet()) return 0

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const StocksContract = new metamaskWeb3.eth.Contract(abis["stocks_contract"], this.getAddr("stocks_contract"));
        return StocksContract.methods.buyStock(stockAddr, amount, blockNo, v, r, s, price, fee)
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"))

    }

    sellStock(stockAddr, amount, blockNo, v, r, s, price, fee, listener) {
        if (!this.checkWallet()) return 0

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const StocksContract = new metamaskWeb3.eth.Contract(abis["stocks_contract"], this.getAddr("stocks_contract"));
        return StocksContract.methods.sellStock(stockAddr, amount, blockNo, v, r, s, price, fee)
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"))

    }
}

