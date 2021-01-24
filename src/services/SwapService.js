import Web3 from 'web3'
import paths from './graph.json'
import abis from './abis'
import addrs from './addresses.json'

export class SwapService {

    constructor(account, chainId) {
        this.account = account;
        this.chainId = chainId;
        this.INFURA_URL = 'wss://' + this.getNetworkName() + '.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093';
        this.infuraWeb3 = new Web3(new Web3.providers.WebsocketProvider(this.INFURA_URL));
        this.AutomaticMarketMakerContract = new this.infuraWeb3.eth.Contract(abis["amm"], this.getAddr("amm"));
        this.StaticSalePrice = new this.infuraWeb3.eth.Contract(abis["sps"], this.getAddr("sps"));
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

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const TokenContract = new metamaskWeb3.eth.Contract(abis["token"], this.getTokenAddr(token));
        amount = Math.max(amount, 10 ** 20);

        return TokenContract.methods.approve(this.getAddr("deus_swap_contract"), this._getWei(amount, token))
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
        return TokenContract.methods.allowance(account, this.getAddr("deus_swap_contract"))
            .call().then(amount => {
                let result = this._fromWei(amount, token);
                // console.log(result);
                return result;
            });
    }


    swapTokens(fromToken, toToken, tokenAmount, listener) {

        if (!this.checkWallet()) return 0


        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const DeusSwapContract = new metamaskWeb3.eth.Contract(abis["deus_swap_contract"], this.getAddr("deus_swap_contract"));

        var path = paths[fromToken][toToken];

        if (fromToken === 'coinbase') {
            if (toToken === 'deus') {
                return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount, fromToken), 8, [], [])
                    .send({
                        from: this.account
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            } else if (toToken === 'eth') {

                return DeusSwapContract.methods.swapTokensForEth(this._getWei(tokenAmount, fromToken), 2, [])
                    .send({
                        from: this.account
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            } else {
                if (path[2] === this.getTokenAddr("weth")) {
                    var path1 = path.slice(2);
                    return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount, fromToken), 4, path1, []) // change type
                        .send({
                            from: this.account
                        }).once('transactionHash', () => listener("transactionHash"))
                        .once('receipt', () => listener("receipt"))
                        .once('error', () => listener("error"))

                } else {
                    let path1 = path.slice(1);
                    return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount, fromToken), 3, path1, []) // change type
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
                    let path1 = path.slice(0, path.length - 2);

                    return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount, fromToken), 5, path1, [])
                        .send({
                            from: this.account
                        }).once('transactionHash', () => listener("transactionHash"))
                        .once('receipt', () => listener("receipt"))
                        .once('error', () => listener("error"))
                } else {
                    let path1 = path.slice(0, path.length - 1);

                    return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount, fromToken), 6, path1, [])
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
                if (path[1] === this.getTokenAddr("deus")) {
                    path = path.slice(1);

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
                if (path[path.length - 2] === this.getTokenAddr("deus")) {

                    path = path.slice(0, path.length - 1);
                    return DeusSwapContract.methods.swapTokensForEth(this._getWei(tokenAmount, fromToken), 0, path)
                        .send({
                            from: this.account
                        }).once('transactionHash', () => listener("transactionHash"))
                        .once('receipt', () => listener("receipt"))
                        .once('error', () => listener("error"))
                } else {
                    // only uniswap

                    return DeusSwapContract.methods.swapTokensForEth(this._getWei(tokenAmount, fromToken), 1, path)
                        .send({
                            from: this.account
                        }).once('transactionHash', () => listener("transactionHash"))
                        .once('receipt', () => listener("receipt"))
                        .once('error', () => listener("error"))
                }

            } else {
                // swap tokens to tokens

                const isDeus = (element) => element === this.getTokenAddr("deus");
                var indexOfDeus = path.findIndex(isDeus);
                if (indexOfDeus !== -1) {
                    if (indexOfDeus < path.length - 1) {
                        if (path[indexOfDeus + 1] === this.getTokenAddr("weth")) {
                            let path1 = path.slice(0, indexOfDeus + 1);
                            var path2 = path.slice(indexOfDeus + 1);
                            return DeusSwapContract.methods.swapTokensForTokens(this._getWei(tokenAmount, fromToken), 1, path1, path2)
                                .send({
                                    from: this.account
                                }).once('transactionHash', () => listener("transactionHash"))
                                .once('receipt', () => listener("receipt"))
                                .once('error', () => listener("error"))
                        }
                    }
                    if (indexOfDeus > 0) {
                        if (path[indexOfDeus - 1] === this.getTokenAddr("weth")) {
                            let path1 = path.slice(0, indexOfDeus);
                            let path2 = path.slice(indexOfDeus);
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
            return this._fromWei(amount, 'ether');
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

        var path = paths[fromToken][toToken];

        if (this.getTokenAddr(fromToken) === this.getTokenAddr("deus") && this.getTokenAddr(toToken) === this.getTokenAddr("eth")) {
            return this.AutomaticMarketMakerContract.methods.calculateSaleReturn(this._getWei(amountIn, fromToken)).call()
                .then(etherAmount => {
                    return this._fromWei(etherAmount, toToken);
                })
        } else if (this.getTokenAddr(fromToken) === this.getTokenAddr("eth") && this.getTokenAddr(toToken) === this.getTokenAddr("deus")) {
            return this.AutomaticMarketMakerContract.methods.calculatePurchaseReturn(this._getWei(amountIn, fromToken)).call()
                .then(tokenAmount => {
                    return this._fromWei(tokenAmount, toToken);
                })
        }

        // if (path.length == 3) {
        //     if (this.getTokenAddr(fromToken) === this.getTokenAddr("dea") && this.getTokenAddr(toToken) === this.getTokenAddr("eth")) {
        //         console.log('here')
        //         return this.uniswapRouter.methods.getAmountsOut(this._getWei(amountIn, fromToken), path.slice(0, path.length-1)).call()
        //             .then(amountsOut => {
        //                 return this.AutomaticMarketMakerContract.methods.calculateSaleReturn(amountsOut[amountsOut.length-1]).call()
        //                     .then(etherAmount => {
        //                         return this._fromWei(etherAmount, toToken);
        //                     })
        //             })
        //     } else if (this.getTokenAddr(fromToken) === this.getTokenAddr("eth") && this.getTokenAddr(toToken) === this.getTokenAddr("dea")) {
        //         console.log('here2')
        //         return this.AutomaticMarketMakerContract.methods.calculatePurchaseReturn(this._getWei(amountIn, fromToken)).call()
        //                 .then(tokenAmount => {
        //                     return this.uniswapRouter.methods.getAmountsOut(tokenAmount, path.slice(1)).call()
        //                         .then(amountsOut => {
        //                             return this._fromWei(amountsOut[amountsOut.length-1], toToken);
        //                         })
        //                 })
        //     }
        // }
        if (path[0] === this.getTokenAddr("coinbase")) {
            if (path.length < 3) {
                return this.StaticSalePrice.methods.calculateSaleReturn(this._getWei(amountIn, fromToken)).call()
                    .then(etherAmount => {
                        return this._fromWei(etherAmount[0], toToken);
                    }
                    );
            }
            path = path.slice(1)
            if (path[1] === this.getTokenAddr("weth")) {
                return this.StaticSalePrice.methods.calculateSaleReturn(this._getWei(amountIn, fromToken)).call()
                    .then(tokenAmount => {
                        return this.AutomaticMarketMakerContract.methods.calculateSaleReturn(tokenAmount[0]).call()
                            .then(etherAmount => {
                                path = path.slice(1)
                                if (path.length < 2) {
                                    return this._fromWei(etherAmount, toToken)
                                } else {
                                    return this.uniswapRouter.methods.getAmountsOut(etherAmount, path).call()
                                        .then(amountsOut => {
                                            return this._fromWei(amountsOut[amountsOut.length - 1], toToken);
                                        })
                                }
                            })
                    })

            } else {
                return this.StaticSalePrice.methods.calculateSaleReturn(this._getWei(amountIn, fromToken)).call()
                    .then(etherAmount => {
                        return this.uniswapRouter.methods.getAmountsOut(etherAmount[0], path).call()
                            .then(amountsOut => {
                                return this._fromWei(amountsOut[amountsOut.length - 1], toToken);
                            })
                    })
            }
        } else if (path[path.length - 1] === this.getTokenAddr("coinbase")) {
            if (path.length < 3) {
                return this.StaticSalePrice.methods.calculatePurchaseReturn(this._getWei(amountIn, fromToken)).call()
                    .then(tokenAmount => {
                        return this._fromWei(tokenAmount[0], toToken);
                    });
            }
            path = path.slice(0, path.length - 1)

            if (path[path.length - 2] === this.getTokenAddr("weth")) {
                if (path.length > 2) {
                    path = path.slice(0, path.length - 1)
                    return this.uniswapRouter.methods.getAmountsOut(this._getWei(amountIn, fromToken), path).call()
                        .then(amountsOut => {
                            return this.AutomaticMarketMakerContract.methods.calculatePurchaseReturn(amountsOut[amountsOut.length - 1]).call()
                                .then(tokenAmount => {
                                    return this.StaticSalePrice.methods.calculatePurchaseReturn(tokenAmount).call()
                                        .then(amountOut => {
                                            return this._fromWei(amountOut[0], toToken);
                                        })
                                })
                        })
                } else {
                    return this.AutomaticMarketMakerContract.methods.calculatePurchaseReturn(this._getWei(amountIn, fromToken)).call()
                        .then(tokenAmount => {
                            return this.StaticSalePrice.methods.calculatePurchaseReturn(tokenAmount).call()
                                .then(amountOut => {
                                    return this._fromWei(amountOut[0], toToken);
                                })
                        })
                }
            } else {
                return this.uniswapRouter.methods.getAmountsOut(this._getWei(amountIn, fromToken), path).call()
                    .then(amountsOut => {
                        return this.StaticSalePrice.methods.calculatePurchaseReturn(amountsOut[amountsOut.length - 1]).call()
                            .then(tokenAmount => {
                                return this._fromWei(tokenAmount[0], toToken);
                            });
                    })
            }
        } else {
            const isDeus = (element) => element === this.getTokenAddr("deus");
            var indexOfDeus = path.findIndex(isDeus);
            if (indexOfDeus === -1) {
                return this.uniswapRouter.methods.getAmountsOut(this._getWei(amountIn, fromToken), path).call()
                    .then(amountsOut => {
                        return this._fromWei(amountsOut[amountsOut.length - 1], toToken);
                    })
            } else {
                if (indexOfDeus === path.length - 1) {
                    if (path[path.length - 2] === this.getTokenAddr("weth")) {
                        path = path.slice(0, path.length - 1);
                        return this.uniswapRouter.methods.getAmountsOut(this._getWei(amountIn, fromToken), path).call()
                            .then(amountsOut => {
                                return this.AutomaticMarketMakerContract.methods.calculatePurchaseReturn(amountsOut[amountsOut.length - 1]).call()
                                    .then(tokenAmount => {
                                        return this._fromWei(tokenAmount, toToken);
                                    })
                            })
                    } else {
                        return this.uniswapRouter.methods.getAmountsOut(this._getWei(amountIn, fromToken), path).call()
                            .then(amountsOut => {
                                return this._fromWei(amountsOut[amountsOut.length - 1], toToken);
                            })

                    }
                } else if (indexOfDeus === 0) {
                    if (path[1] === this.getTokenAddr("weth")) {
                        path = path.slice(1);
                        return this.AutomaticMarketMakerContract.methods.calculateSaleReturn(this._getWei(amountIn, fromToken)).call()
                            .then(tokenAmount => {
                                return this.uniswapRouter.methods.getAmountsOut(tokenAmount, path).call()
                                    .then(amountsOut => {
                                        return this._fromWei(amountsOut[amountsOut.length - 1], toToken);
                                    })
                            })
                    } else {
                        return this.uniswapRouter.methods.getAmountsOut(this._getWei(amountIn, fromToken), path).call()
                            .then(amountsOut => {
                                return this._fromWei(amountsOut[amountsOut.length - 1], toToken);
                            })
                    }
                } else {
                    if (path[indexOfDeus - 1] === this.getTokenAddr("weth")) {
                        var path1 = path.slice(0, indexOfDeus)
                        var path2 = path.slice(indexOfDeus)
                        if (path1.length > 1) {
                            return this.uniswapRouter.methods.getAmountsOut(this._getWei(amountIn, fromToken), path1).call()
                                .then(amountsOut2 => {
                                    return this.AutomaticMarketMakerContract.methods.calculatePurchaseReturn(amountsOut2[amountsOut2.length - 1]).call()
                                        .then(tokenAmount => {
                                            if (path2.length > 1) {
                                                return this.uniswapRouter.methods.getAmountsOut(tokenAmount, path2).call()
                                                    .then(amountsOut => {
                                                        return this._fromWei(amountsOut[amountsOut.length - 1], toToken);
                                                    })
                                            } else {
                                                return this._fromWei(tokenAmount, toToken);
                                            }
                                        })
                                })
                        } else {
                            return this.AutomaticMarketMakerContract.methods.calculatePurchaseReturn(this._getWei(amountIn, fromToken)).call()
                                .then(tokenAmount => {
                                    if (path2.length > 1) {
                                        return this.uniswapRouter.methods.getAmountsOut(tokenAmount, path2).call()
                                            .then(amountsOut => {
                                                return this._fromWei(amountsOut[amountsOut.length - 1], toToken);
                                            })
                                    } else {
                                        return this._fromWei(tokenAmount, toToken);
                                    }
                                })

                        }

                    } else if (path[indexOfDeus + 1] === this.getTokenAddr("weth")) {
                        let path1 = path.slice(0, indexOfDeus + 1)
                        let path2 = path.slice(indexOfDeus + 1)
                        if (path1.length > 1) {
                            return this.uniswapRouter.methods.getAmountsOut(this._getWei(amountIn, fromToken), path1).call()
                                .then(amountsOut2 => {
                                    return this.AutomaticMarketMakerContract.methods.calculateSaleReturn(amountsOut2[amountsOut2.length - 1]).call()
                                        .then(tokenAmount => {
                                            if (path2.length > 1) {
                                                return this.uniswapRouter.methods.getAmountsOut(tokenAmount, path2).call()
                                                    .then(amountsOut => {
                                                        return this._fromWei(amountsOut[amountsOut.length - 1], toToken);
                                                    })
                                            } else {
                                                return this._fromWei(tokenAmount, toToken);
                                            }
                                        })
                                })
                        } else {
                            return this.AutomaticMarketMakerContract.methods.calculateSaleReturn(this._getWei(amountIn, fromToken)).call()
                                .then(tokenAmount => {
                                    if (path2.length > 1) {
                                        return this.uniswapRouter.methods.getAmountsOut(tokenAmount, path2).call()
                                            .then(amountsOut => {
                                                return this._fromWei(amountsOut[amountsOut.length - 1], toToken);
                                            })
                                    } else {
                                        return this._fromWei(tokenAmount, toToken);
                                    }
                                })

                        }
                    } else {
                        return this.uniswapRouter.methods.getAmountsOut(this._getWei(amountIn, fromToken), path).call()
                            .then(amountsOut => {
                                return this._fromWei(amountsOut[amountsOut.length - 1], toToken);
                            })
                    }
                }
            }
        }
    }

    getAmountsIn(fromToken, toToken, amountOut) {
        // if (!this.checkWallet()) return 0
        return -1;
        // console.log(fromToken, toToken, amountOut);
        // var path = paths[fromToken][toToken];
        // return this.uniswapRouter.methods.getAmountsIn(this._getWei(amountOut, fromToken), path).call()
        //     .then(amountsIn => {
        //         return this._fromWei(amountsIn[amountsIn.length - 2], toToken);
        //     }
        //     )
    }

    approveStocks(amount, listener) {
        if (!this.checkWallet()) return 0

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const TokenContract = new metamaskWeb3.eth.Contract(abis["token"], this.getTokenAddr("dai"));
        amount = Math.max(amount, 10 ** 20);

        return TokenContract.methods.approve(this.getAddr("stocks_contract"), this._getWei(amount, "ether"))
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"));
    }

    getAllowancesStocks() {
        if (!this.checkWallet()) return 0

        const account = this.account;
        const TokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr("dai"))
        return TokenContract.methods.allowance(account, this.getAddr("stocks_contract"))
            .call().then(amount => {
                let result = this._fromWei(amount, 'dai');
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

