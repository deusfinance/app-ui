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


    _getWei(number) {
        const value = typeof number === "string" ? parseFloat(number).toFixed(18) : number.toFixed(18)
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
            return Web3.utils.fromWei(balance, 'ether');
        })
    }




    approve(token, amount, listener) {
        if (!this.checkWallet()) return 0

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const AutomaticMarketMakerContract = new metamaskWeb3.eth.Contract(abis["token"], this.getTokenAddr(token));
        amount = Math.max(amount, 10 ** 20);

        return AutomaticMarketMakerContract.methods.approve(this.getAddr("deus_swap_contract"), this._getWei(amount))
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


    swapTokens(fromToken, toToken, tokenAmount = 0, listener) {

        if (!this.checkWallet()) return 0

        console.log(fromToken, toToken, tokenAmount);

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const AutomaticMarketMakerContract = new metamaskWeb3.eth.Contract(abis["deus_swap_contract"], this.getAddr("deus_swap_contract"));

        var path = paths[fromToken][toToken];
        console.log("pathssss ", path);

        // console.log(path);

        if (fromToken === 'eth') {
            // swap eth to tokens
            if (path[1] == this.getTokenAddr("deus")) {
                // swap eth to tokens
                path = path.slice(1);
                console.log("path ", path);

                // first on AMM then uniswap
                return AutomaticMarketMakerContract.methods.swapEthForTokens(path, 0)
                    .send({
                        from: this.account,
                        value: this._getWei(tokenAmount)
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
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
            if (path[path.length - 2] == this.getTokenAddr("deus")) {
                path = path.slice(0, path.length - 1);
                console.log(path);
                return AutomaticMarketMakerContract.methods.swapTokensForEth(this._getWei(tokenAmount), 0, path)
                    .send({
                        from: this.account
                    }).once('transactionHash', () => listener("transactionHash"))
                    .once('receipt', () => listener("receipt"))
                    .once('error', () => listener("error"))
            } else {
                // only uniswap
                return AutomaticMarketMakerContract.methods.swapTokensForEth(this._getWei(tokenAmount), 1, path)
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
            if (indexOfDeus != -1) {
                if (indexOfDeus < path.length - 1) {
                    if (path[indexOfDeus + 1] === "0xc778417E063141139Fce010982780140Aa0cD5Ab") {
                        var path1 = path.slice(0, indexOfDeus + 1);
                        var path2 = path.slice(indexOfDeus + 1);
                        console.log(1, path1, path2)
                        return AutomaticMarketMakerContract.methods.swapTokensForTokens(this._getWei(tokenAmount), 1, path1, path2)
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
                        return AutomaticMarketMakerContract.methods.swapTokensForTokens(this._getWei(tokenAmount), 0, path1, path2)
                            .send({
                                from: this.account
                            }).once('transactionHash', () => listener("transactionHash"))
                            .once('receipt', () => listener("receipt"))
                            .once('error', () => listener("error"))
                    }
                }
            }
            return AutomaticMarketMakerContract.methods.swapTokensForTokens(this._getWei(tokenAmount), 2, path, [])
                .send({
                    from: this.account
                }).once('transactionHash', () => listener("transactionHash"))
                .once('receipt', () => listener("receipt"))
                .once('error', () => listener("error"))
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

