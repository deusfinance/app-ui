import Web3 from 'web3'
import paths from './graph'
import tokensAbi from './tokensAbi.json'

export class SwapInstance {

    constructor(account, chainId) {
        this.account = account;
        this.chainId = chainId;
        this.TokensAddress = tokensAbi
        this.INFURA_URL = 'wss://' + this.getNetworkName() + '.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093';
        this.infuraWeb3 = new Web3(new Web3.providers.WebsocketProvider(this.INFURA_URL));
        this.AutomaticMarketMakerContract = new this.infuraWeb3.eth.Contract(this.getToken("AMM").abi, this.getToken("AMM").address);
        this.DeusSwapContract = new this.infuraWeb3.eth.Contract(this.getToken("DeusSwapContract").abi, this.getToken("DeusSwapContract").address);
        this.uniswapRouter = new this.infuraWeb3.eth.Contract(this.getToken("uniswapRouter").abi, this.getToken("uniswapRouter").address);
    }

    checkWallet = () => this.account && this.chainId


    networkNames = {
        1: "Mainnet",
        3: "Ropsten",
        4: "Rinkeby",
        42: "Kovan",
    }

    getNetworkName() {
        return this.networkNames[this.chainId.toString()]
    }

    getToken = (tokenName) => {
        const token = this.TokensAddress[tokenName]
        return {
            address: token.chainId[this.chainId],
            abi: token.abi
        }
    }


    _getWei(number) {
        const value = typeof number === "string" ? parseFloat(number).toFixed(18) : number.toFixed(18)
        return Web3.utils.toWei(String(value), 'ether')
    }

    getEtherBalance() {
        const account = this.account
        if (account) {
            return this.infuraWeb3.eth.getBalance(account).then(balance => {
                return Web3.utils.fromWei(balance, 'ether');
            })
        } else {
            return new Promise(function (resolve, reject) {
                resolve(0);
            })
        }
    }


    getTokenBalance(token) {
        if (!this.checkWallet()) return 0

        const account = this.account;

        console.log(token);
        if (token === "eth") {
            return this.getEtherBalance(account)
        }
        const TokenContract = new this.infuraWeb3.eth.Contract(this.getToken(token).abi, this.getToken(token).address)
        return TokenContract.methods.balanceOf(account).call().then(balance => {
            return Web3.utils.fromWei(balance, 'ether');
        })

    }


    approve(token, amount, listener) {

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const AutomaticMarketMakerContract = new metamaskWeb3.eth.Contract(this.getToken(token).abi, this.getToken(token).address);
        // const TokenContract = new infuraWeb3.eth.Contract(TokenABI[token], TokenAddr[token])
        amount = Math.max(amount, 10 ** 20);

        return AutomaticMarketMakerContract.methods.approve(this.getToken("DeusSwapContract").address, this._getWei(amount))
            .send({ from: this.account })
            .on('transactionHash', () => listener("transactionHash"))
            .on('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }

    getAllowances(token) {
        if (!this.checkWallet()) return 0

        const account = this.account;
        if (token === "eth") return 9999

        const TokenContract = new this.infuraWeb3.eth.Contract(this.getToken(token).abi, this.getToken(token).address)
        return TokenContract.methods.allowance(account, this.getToken("DeusSwapContract").address)
            .call().then(amount => {
                let result = Web3.utils.fromWei(amount, 'ether');
                // console.log(result);
                return result;
            });
    }


    swapTokens(fromToken, toToken, tokenAmount = 0, listener) {

        if (!this.checkWallet()) return 0

        console.log(fromToken, toToken, tokenAmount);

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const AutomaticMarketMakerContract = new metamaskWeb3.eth.Contract(this.getToken("DeusSwapContract").abi, this.getToken("DeusSwapContract").address);

        var path = paths[fromToken][toToken];
        console.log("pathssss ", path);

        // console.log(path);

        if (fromToken === 'eth') {
            // swap eth to tokens
            if (path[1] == this.getToken("deus").address) {
                // swap eth to tokens
                path = path.slice(1);
                console.log("path ", path);

                // first on AMM then uniswap
                return AutomaticMarketMakerContract.methods.swapEthForTokens(path, 0)
                    .send({
                        from: this.account,
                        value: this._getWei(tokenAmount)
                    }).on('transactionHash', () => listener("transactionHash"))
                    .on('receipt', () => listener("receipt"))
                    .on('error', () => listener("error"))
            } else {
                // only uniswap
                // console.log(path);

                return AutomaticMarketMakerContract.methods.swapEthForTokens(path, 1)
                    .send({
                        from: this.account,
                        value: this._getWei(tokenAmount)
                    }).on('transactionHash', () => listener("transactionHash"))
                    .on('receipt', () => listener("receipt"))
                    .on('error', () => listener("error"))
            }
        } else if (toToken === 'eth') {
            // swap tokens to eth
            if (path[path.length - 2] == this.getToken("deus").address) {
                path = path.slice(0, path.length - 1);
                console.log(path);
                return AutomaticMarketMakerContract.methods.swapTokensForEth(this._getWei(tokenAmount), 0, path)
                    .send({
                        from: this.account
                    }).on('transactionHash', () => listener("transactionHash"))
                    .on('receipt', () => listener("receipt"))
                    .on('error', () => listener("error"))
            } else {
                // only uniswap
                return AutomaticMarketMakerContract.methods.swapTokensForEth(this._getWei(tokenAmount), 1, path)
                    .send({
                        from: this.account
                    }).on('transactionHash', () => listener("transactionHash"))
                    .on('receipt', () => listener("receipt"))
                    .on('error', () => listener("error"))
            }

        } else {
            // swap tokens to tokens
            const isDeus = (element) => element === this.getToken("deus").address;
            var indexOfDeus = path.findIndex(isDeus);
            if (indexOfDeus != -1) {
                if (indexOfDeus < path.length - 1) {
                    if (path[indexOfDeus + 1] === "0xc778417E063141139Fce010982780140Aa0cD5Ab") {
                        var path1 = path.slice(0, indexOfDeus + 1);
                        var path2 = path.slice(indexOfDeus + 1);
                        console.log(1, path1, path2)
                        return AutomaticMarketMakerContract.methods.swapTokensForTokens(this._getWei(tokenAmount), 1, path1, path2)
                            .send({
                                from: this.account
                            }).on('transactionHash', () => listener("transactionHash"))
                            .on('receipt', () => listener("receipt"))
                            .on('error', () => listener("error"))
                    }
                }
                if (indexOfDeus > 0) {
                    if (path[indexOfDeus - 1] === "0xc778417E063141139Fce010982780140Aa0cD5Ab") {
                        var path1 = path.slice(0, indexOfDeus);
                        var path2 = path.slice(indexOfDeus);
                        console.log(2, path1, path2)
                        return AutomaticMarketMakerContract.methods.swapTokensForTokens(this._getWei(tokenAmount), 0, path1, path2)
                            .send({
                                from: this.account
                            }).on('transactionHash', () => listener("transactionHash"))
                            .on('receipt', () => listener("receipt"))
                            .on('error', () => listener("error"))
                    }
                }
            }
            return AutomaticMarketMakerContract.methods.swapTokensForTokens(this._getWei(tokenAmount), 2, path, [])
                .send({
                    from: this.account
                }).on('transactionHash', () => listener("transactionHash"))
                .on('receipt', () => listener("receipt"))
                .on('error', () => listener("error"))
        }

    }

    getAmountsOut(fromToken, toToken, amountIn) {
        if (!this.checkWallet()) return 0
        
        console.log(fromToken, toToken, amountIn);
        var path = paths[fromToken][toToken];
        return this.uniswapRouter.methods.getAmountsOut(this._getWei(amountIn), path).call()
            .then(amountsOut => {
                console.log(amountsOut)
                return Web3.utils.fromWei(amountsOut[amountsOut.length - 1], 'ether');
            }
            )
    }

    getAmountsIn(fromToken, toToken, amountOut) {
        if (!this.checkWallet()) return 0

        console.log(fromToken, toToken, amountOut);
        var path = paths[fromToken][toToken];
        return this.uniswapRouter.methods.getAmountsIn(this._getWei(amountOut), path).call()
            .then(amountsIn => {
                return Web3.utils.fromWei(amountsIn[amountsIn.length - 2], 'ether');
            }
            )
    }

}

