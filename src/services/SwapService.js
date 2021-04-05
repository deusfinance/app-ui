import Web3 from 'web3'
import paths from './graphbk.json'
import abis from './abis'
import addrs from './addresses.json'

String.prototype.replaceAt = function (index, replacement) {
    if (!replacement) return
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

export class SwapService {

    constructor(account, chainId = 1) {
        this.account = account;
        this.chainId = chainId;
        this.INFURA_URL = 'wss://' + this.getNetworkName() + '.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093';
        this.infuraWeb3 = new Web3(new Web3.providers.WebsocketProvider(this.INFURA_URL));
        this.AutomaticMarketMakerContract = new this.infuraWeb3.eth.Contract(abis["amm"], this.getAddr("amm"));
        this.StaticSalePrice = new this.infuraWeb3.eth.Contract(abis["sps"], this.getAddr("sps"));
        this.MultiSwapContract = new this.infuraWeb3.eth.Contract(abis["multi_swap_contract"], this.getAddr("multi_swap_contract"));
        this.uniswapRouter = new this.infuraWeb3.eth.Contract(abis["uniswap_router"], this.getAddr("uniswap_router"));

    }

    makeProvider = () => {
        if (this.INFURA_URL) return
        this.INFURA_URL = 'wss://' + this.getNetworkName().toLowerCase() + '.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093';
        this.infuraWeb3 = new Web3(new Web3.providers.WebsocketProvider(this.INFURA_URL));
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
        let max = this.TokensMaxDigit[token] ? this.TokensMaxDigit[token] : 18
        // let value = typeof number === "string" ? parseFloat(number).toFixed(18) : number.toFixed(18)
        let ans = Web3.utils.toWei(String(number), 'ether');
        ans = ans.substr(0, ans.length - (18 - max));
        return ans.toString()
    }

    _fromWei(value, token) {
        let max = this.TokensMaxDigit[token] ? this.TokensMaxDigit[token] : 18
        let ans;
        if (typeof value != "string") {
            ans = value.toString()
        } else {
            ans = value;
        }
        while (ans.length < max) {
            ans = "0" + ans;
        }
        ans = ans.substr(0, ans.length - max) + "." + ans.substr(ans.length - max);
        if (ans[0] === ".") {
            ans = "0" + ans;
        }
        return ans.toString()
    }

    getEtherBalance() {
        if (!this.checkWallet()) return 0
        return this.infuraWeb3.eth.getBalance(this.account).then(balance => {
            return this._fromWei(balance, 'eth');
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
            return this._fromWei(balance, tokenName);
        })
    }

    approve(token, amount, listener) {
        if (!this.checkWallet()) return 0

        let walletWeb3 = new Web3(Web3.givenProvider);
        const TokenContract = new walletWeb3.eth.Contract(abis["token"], this.getTokenAddr(token));
        amount = Math.max(amount, 10 ** 20);

        return TokenContract.methods.approve(this.getAddr("multi_swap_contract"), this._getWei(amount, token))
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"));
    }

    getAllowances(token) {
        if (!this.checkWallet()) return 0

        const account = this.account;
        if (token === "eth") return 9999

        const TokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(token))
        return TokenContract.methods.allowance(account, this.getAddr("multi_swap_contract"))
            .call().then(amount => {
                let result = this._fromWei(amount, token);
                // console.log(result);
                return result;
            });
    }


    swapTokens(inputToken, outputToken, amountIn, minAmountOut, listener) {
        if (!this.checkWallet()) return 0



        minAmountOut = parseFloat(minAmountOut).toFixed(19)
        minAmountOut = minAmountOut.slice(0, minAmountOut.length - 1)

        console.log(amountIn, minAmountOut);

        amountIn = this._getWei(amountIn, inputToken);
        minAmountOut = this._getWei(minAmountOut, outputToken);

        let walletWeb3 = new Web3(Web3.givenProvider);
        const MetaMask = new walletWeb3.eth.Contract(abis["multi_swap_contract"], this.getAddr("multi_swap_contract"));
        const uniswapRouter = new walletWeb3.eth.Contract(abis["uniswap_router"], this.getAddr("uniswap_router"));
        var path = paths[inputToken][outputToken];

        if (inputToken === 'eth' && outputToken === 'deus') {
            let walletWeb3 = new Web3(Web3.givenProvider);
            const AutomaticMarketMakerContract = new walletWeb3.eth.Contract(abis["amm"], this.getAddr('amm'));
            // console.log(inputToken, outputToken, amountIn, minAmountOut);
            return AutomaticMarketMakerContract.methods.buy(minAmountOut)
                .send({
                    from: this.account,
                    value: amountIn
                }).on('transactionHash', () => listener("transactionHash"))
                .on('receipt', () => listener("receipt"))
                .on('error', () => listener("error"))

        }
        if (inputToken === 'deus' && outputToken === 'eth') {
            path = []
            return MetaMask.methods.uniDeusEth(amountIn, path, minAmountOut)
                .send({
                    from: this.account
                }).once('transactionHash', () => listener("transactionHash"))
                .once('receipt', () => listener("receipt"))
                .once('error', () => listener("error"))
        }

        const isDeus = (element) => element === this.getTokenAddr("deus");
        var indexOfDeus = path.findIndex(isDeus);
        if (indexOfDeus === -1) {
            if (path[0] === this.getTokenAddr('weth')) {
                const deadline = Math.floor(Date.now() / 1000) + 60 * 5000;
                console.log(deadline);
                return uniswapRouter.methods.swapExactETHForTokens(minAmountOut, path, this.account, deadline)
                    .send({
                        from: this.account,
                        value: amountIn
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            }
            if (path[path.length - 1] === this.getTokenAddr('weth')) {
                console.log("hii");
                return MetaMask.methods.tokensToEthOnUni(amountIn, path, minAmountOut)
                    .send({
                        from: this.account
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            }

            return MetaMask.methods.tokensToTokensOnUni(amountIn, path, minAmountOut)
                .send({
                    from: this.account
                }).once('transactionHash', () => listener("transactionHash"))
                .once('receipt', () => listener("receipt"))
                .once('error', () => listener("error"))
        }

        if (indexOfDeus === path.length - 1) {
            if (path[path.length - 2] === this.getTokenAddr("weth")) {
                var path1 = path.slice(0, indexOfDeus);
                var path2 = [];
                console.log("miyad? ", amountIn, path1, path2, minAmountOut);
                return MetaMask.methods.uniEthDeusUni(amountIn, path1, path2, minAmountOut)
                    .send({
                        from: this.account
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            }

            return MetaMask.methods.tokensToTokensOnUni(amountIn, path, minAmountOut)
                .send({
                    from: this.account
                }).once('transactionHash', () => listener("transactionHash"))
                .once('receipt', () => listener("receipt"))
                .once('error', () => listener("error"))

        }

        console.log("miyad1");

        if (indexOfDeus === 0) {
            if (path[1] === this.getTokenAddr("weth")) {
                var path = path.slice(1);
                console.log("miyad 200")
                return MetaMask.methods.deusEthUni(amountIn, path, minAmountOut)
                    .send({
                        from: this.account
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            }

            console.log("miyad? ", amountIn, path, minAmountOut);
            return MetaMask.methods.tokensToTokensOnUni(amountIn, path, minAmountOut)
                .send({
                    from: this.account
                }).once('transactionHash', () => listener("transactionHash"))
                .once('receipt', () => listener("receipt"))
                .once('error', () => listener("error"))
        }

        console.log("miyad2");

        if (path[indexOfDeus - 1] === this.getTokenAddr("weth")) {
            var path1 = path.slice(0, indexOfDeus)
            var path2 = path.slice(indexOfDeus)
            if (path1.length > 1) {
                return MetaMask.methods.uniEthDeusUni(amountIn, path1, path2, minAmountOut)
                    .send({
                        from: this.account
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            }
            path = path.slice(indexOfDeus)
            console.log(amountIn, path, minAmountOut);
            return MetaMask.methods.ethDeusUni(path, minAmountOut)
                .send({
                    from: this.account,
                    value: amountIn
                }).once('transactionHash', () => listener("transactionHash"))
                .once('receipt', () => listener("receipt"))
                .once('error', () => listener("error"))

        }

        console.log("miyad3");

        if (path[indexOfDeus + 1] === this.getTokenAddr("weth")) {
            let path1 = path.slice(0, indexOfDeus + 1)
            let path2 = path.slice(indexOfDeus + 1)
            if (path1.length >= 2 && path2.length <= 1) {
                path = path1;
                return MetaMask.methods.uniDeusEth(amountIn, path, minAmountOut)
                    .send({
                        from: this.account
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            }
            if (path1.length >= 2 && path2.length >= 2) {
                console.log("miyad 600")
                console.log(path1, path2)
                return MetaMask.methods.uniDeusEthUni(amountIn, path1, path2, minAmountOut)
                    .send({
                        from: this.account
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            }
        }


    }

    getWithdrawableAmount() {
        if (!this.checkWallet()) return
        return this.AutomaticMarketMakerContract.methods.payments(this.account).call().then(amount => {
            return this._fromWei(amount, 'ether');
        })
    }

    withdrawPayment(listener) {

        let walletWeb3 = new Web3(Web3.givenProvider);
        const AutomaticMarketMakerContract = new walletWeb3.eth.Contract(abis["amm"], this.getAddr("amm"));
        return AutomaticMarketMakerContract.methods.withdrawPayments(this.account)
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"))
    }

    getAmountsOut(inputToken, outputToken, amountIn) {

        var path = paths[inputToken][outputToken];
        amountIn = this._getWei(amountIn, inputToken);

        if (inputToken === "deus" && outputToken === "eth") {
            return this.AutomaticMarketMakerContract.methods.calculateSaleReturn(amountIn).call()
                .then(etherAmount => {
                    return this._fromWei(etherAmount, outputToken);
                })
        } else if (inputToken === "eth" && outputToken === "deus") {
            return this.AutomaticMarketMakerContract.methods.calculatePurchaseReturn(amountIn).call()
                .then(tokenAmount => {
                    return this._fromWei(tokenAmount, outputToken);
                })
        }

        console.log("m1");
        const isDeus = (element) => element === this.getTokenAddr("deus");
        var indexOfDeus = path.findIndex(isDeus);
        if (indexOfDeus === -1) {
            return this.uniswapRouter.methods.getAmountsOut(amountIn, path).call()
                .then(amountsOut => {
                    return this._fromWei(amountsOut[amountsOut.length - 1], outputToken);
                })
        }
        console.log("m2");

        if (indexOfDeus === path.length - 1) {
            if (path[path.length - 2] === this.getTokenAddr("weth")) {
                path = path.slice(0, path.length - 1);
                return this.uniswapRouter.methods.getAmountsOut(amountIn, path).call()
                    .then(amountsOut => {
                        return this.AutomaticMarketMakerContract.methods.calculatePurchaseReturn(amountsOut[amountsOut.length - 1]).call()
                            .then(tokenAmount => {
                                return this._fromWei(tokenAmount, outputToken);
                            })
                    })
            } else {
                return this.uniswapRouter.methods.getAmountsOut(amountIn, path).call()
                    .then(amountsOut => {
                        return this._fromWei(amountsOut[amountsOut.length - 1], outputToken);
                    })

            }
        }
        console.log("m3");

        if (indexOfDeus === 0) {
            if (path[1] === this.getTokenAddr("weth")) {
                path = path.slice(1);
                return this.AutomaticMarketMakerContract.methods.calculateSaleReturn(amountIn).call()
                    .then(tokenAmount => {
                        return this.uniswapRouter.methods.getAmountsOut(tokenAmount, path).call()
                            .then(amountsOut => {
                                return this._fromWei(amountsOut[amountsOut.length - 1], outputToken);
                            })
                    })
            } else {

                return this.uniswapRouter.methods.getAmountsOut(amountIn, path).call()
                    .then(amountsOut => {
                        return this._fromWei(amountsOut[amountsOut.length - 1], outputToken);
                    })
            }
        }
        console.log("m4");

        if (path[indexOfDeus - 1] === this.getTokenAddr("weth")) {
            var path1 = path.slice(0, indexOfDeus)
            var path2 = path.slice(indexOfDeus)
            if (path1.length > 1) {
                return this.uniswapRouter.methods.getAmountsOut(amountIn, path1).call()
                    .then(amountsOut2 => {
                        return this.AutomaticMarketMakerContract.methods.calculatePurchaseReturn(amountsOut2[amountsOut2.length - 1]).call()
                            .then(tokenAmount => {
                                if (path2.length > 1) {
                                    return this.uniswapRouter.methods.getAmountsOut(tokenAmount, path2).call()
                                        .then(amountsOut => {
                                            return this._fromWei(amountsOut[amountsOut.length - 1], outputToken);
                                        })
                                } else {
                                    return this._fromWei(tokenAmount, outputToken);
                                }
                            })
                    })
            } else {
                return this.AutomaticMarketMakerContract.methods.calculatePurchaseReturn(amountIn).call()
                    .then(tokenAmount => {
                        if (path2.length > 1) {
                            return this.uniswapRouter.methods.getAmountsOut(tokenAmount, path2).call()
                                .then(amountsOut => {
                                    return this._fromWei(amountsOut[amountsOut.length - 1], outputToken);
                                })
                        } else {
                            return this._fromWei(tokenAmount, outputToken);
                        }
                    })

            }

        }

        if (path[indexOfDeus + 1] === this.getTokenAddr("weth")) {
            let path1 = path.slice(0, indexOfDeus + 1)
            let path2 = path.slice(indexOfDeus + 1)
            if (path1.length > 1) {
                return this.uniswapRouter.methods.getAmountsOut(amountIn, path1).call()
                    .then(amountsOut2 => {
                        return this.AutomaticMarketMakerContract.methods.calculateSaleReturn(amountsOut2[amountsOut2.length - 1]).call()
                            .then(tokenAmount => {
                                if (path2.length > 1) {
                                    return this.uniswapRouter.methods.getAmountsOut(tokenAmount, path2).call()
                                        .then(amountsOut => {
                                            return this._fromWei(amountsOut[amountsOut.length - 1], outputToken);
                                        })
                                } else {
                                    return this._fromWei(tokenAmount, outputToken);
                                }
                            })
                    })
            } else {
                return this.AutomaticMarketMakerContract.methods.calculateSaleReturn(amountIn).call()
                    .then(tokenAmount => {
                        if (path2.length > 1) {
                            return this.uniswapRouter.methods.getAmountsOut(tokenAmount, path2).call()
                                .then(amountsOut => {
                                    return this._fromWei(amountsOut[amountsOut.length - 1], outputToken);
                                })
                        } else {
                            return this._fromWei(tokenAmount, outputToken);
                        }
                    })
            }
        }
    }

    getAmountsIn(inputToken, outputToken, amountOut) {
        return -1;
    }
}