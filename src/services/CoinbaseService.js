import Web3 from 'web3'
import abis from './abis'
import addrs from './addresses.json'

export class CoinbaseService {

    constructor(account, chainId = 1) {
        this.account = account;
        this.chainId = chainId;

        this.INFURA_URL = 'wss://' + this.getNetworkName() + '.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093';
        this.infuraWeb3 = new Web3(new Web3.providers.WebsocketProvider(this.INFURA_URL));
        this.BakktContract = new this.infuraWeb3.eth.Contract(abis["sps"], this.getAddr("coinbase_swap_contract"));
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
        coinbase: 18,
        deus: 18,
    }

    _getWei(number, token = "eth") {
        let max = this.TokensMaxDigit[token] ? this.TokensMaxDigit[token] : 18
        let value = String(number)
        const indexDot = value.indexOf(".")
        if (indexDot !== -1 || value.substring(indexDot + 1).length > max) {
            value = value.substring(0, indexDot) + value.substring(indexDot, indexDot + max + 1)
        }
        let ans = Web3.utils.toWei(String(value), 'ether');
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

        return TokenContract.methods.approve(this.getAddr("coinbase_swap_contract"), this._getWei(amount, token))
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"));
    }

    getAllowances(token) {
        if (!this.checkWallet()) return 0

        const account = this.account;
        if (token === "eth" || token === "coinbase") return 99999

        const TokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(token))
        return TokenContract.methods.allowance(account, this.getAddr("coinbase_swap_contract"))
            .call().then(amount => {
                let result = this._fromWei(amount, token);
                // console.log(result);
                return result;
            });
    }


    swapTokens(fromToken, toToken, tokenAmount, listener) {

        if (!this.checkWallet()) return 0


        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const CoinbaseContract = new metamaskWeb3.eth.Contract(abis["bakkt_swap_contract"], this.getAddr("coinbase_swap_contract"));

        if (fromToken === 'coinbase') {
            if (toToken === 'deus') {
                return CoinbaseContract.methods.calculateSaleReturn(this._getWei(tokenAmount, toToken)).call()
                    .then(amount => {
                        const deusAmount = this._fromWei(amount[0], toToken)
                        return CoinbaseContract.methods.sell(this._getWei(tokenAmount, fromToken), this._getWei(0.95 * deusAmount, toToken))
                            .send({
                                from: this.account
                            }).once('transactionHash', () => listener("transactionHash"))
                            .once('receipt', () => listener("receipt"))
                            .once('error', () => listener("error"))
                    })
            }
        }
        if (fromToken === 'deus') {
            if (toToken === 'coinbase') {
                return CoinbaseContract.methods.calculatePurchaseReturn(this._getWei(tokenAmount)).call()
                    .then(amount => {
                        const coinbaseAmount = this._fromWei(amount[0], toToken)
                        return CoinbaseContract.methods.buy(this._getWei(coinbaseAmount * 0.95, fromToken), this._getWei(tokenAmount, toToken))
                            .send({
                                from: this.account
                            }).once('transactionHash', () => listener("transactionHash"))
                            .once('receipt', () => listener("receipt"))
                            .once('error', () => listener("error"))
                    })
            }
        }
    }



    getAmountsOut(fromToken, toToken, amountIn) {

        if (this.getTokenAddr(fromToken) === this.getTokenAddr("coinbase") && this.getTokenAddr(toToken) === this.getTokenAddr("deus")) {
            return this.BakktContract.methods.calculateSaleReturn(this._getWei(amountIn, fromToken)).call()
                .then(deusAmount => {
                    return this._fromWei(deusAmount[0], toToken);
                })
        } else if (this.getTokenAddr(fromToken) === this.getTokenAddr("deus") && this.getTokenAddr(toToken) === this.getTokenAddr("coinbase")) {
            return this.BakktContract.methods.calculatePurchaseReturn(this._getWei(amountIn, fromToken)).call()
                .then(tokenAmount => {
                    return this._fromWei(tokenAmount[0], toToken);
                })
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


}

