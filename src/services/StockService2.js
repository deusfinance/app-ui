import Web3 from 'web3'
import addrs from './addresses.json'
import { stocksABI, conductorABI, tokenABI } from '../utils/abis';
export class StockService {

    constructor(account, chainId) {
        this.account = account;
        this.chainId = chainId;
        if (!chainId) {
            this.chainId = 4
        }

        this.INFURA_URL = 'wss://' + this.getNetworkName() + '.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093';
        this.infuraWeb3 = new Web3(new Web3.providers.WebsocketProvider(this.INFURA_URL));
    }

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

    networkNames = {
        1: "Mainnet",
        3: "Ropsten",
        4: "Rinkeby",
        42: "Kovan",
    }

    _getWei(number, token = "eth") {
        let max = this.TokensMaxDigit[token] ? this.TokensMaxDigit[token] : 18
        // let value = typeof number === "string" ? parseFloat(number).toFixed(18) : number.toFixed(18)
        let ans = Web3.utils.toWei(String(number), 'ether');
        ans = ans.substr(0, ans.length - (18 - max));
        return ans.toString()
    }

    checkWallet = () => this.account && this.chainId

    getNetworkName = () => this.networkNames[this.chainId.toString()]

    getAddr = (tokenName) => addrs[tokenName][this.chainId.toString()]

    getTokenAddr = (tokenName) => addrs["token"][tokenName][this.chainId.toString()]

    conduct = (token, listener) => {

        if (!this.checkWallet()) return 0

        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const conductorContract = new metamaskWeb3.eth.Contract(conductorABI, '0x905719b8303350f4528158042C6A0032Ff24c429');
        return conductorContract.methods.conduct(
            token.symbol, token.short_name, token.short_symbol, token.long_name, token.long_symbol, token.sign_for_conduct.v, token.sign_for_conduct.r, token.sign_for_conduct.s
        )
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"));
    }

    getAllowances = (tokenAddress, spender = "0xE27Dd91434859360a1E9bD3571707200f476564C") => {
        if (!this.checkWallet()) return 0
        const account = this.account;

        if (tokenAddress !== "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735") {
            return 1000000000000000
        }

        const TokenContract = new this.infuraWeb3.eth.Contract(tokenABI, tokenAddress)
        return TokenContract.methods.allowance(account, spender).call().then(balance => {
            return Web3.utils.fromWei(balance, 'ether');
        })
    }

    approve = (tokenAddress, amount, listener) => {
        listener.onStart()
        if (!this.checkWallet()) return 0
        console.log(tokenAddress, amount);
        amount = Math.max(amount, 10 ** 20);

        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const tokenContract = new metamaskWeb3.eth.Contract(tokenABI, tokenAddress);
        return tokenContract.methods.approve('0xE27Dd91434859360a1E9bD3571707200f476564C', this._getWei(amount))
            .send({ from: this.account })
            .on('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }

    getTokenBalance = (tokenAddress) => {
        if (!this.checkWallet()) return 0
        const account = this.account;
        const TokenContract = new this.infuraWeb3.eth.Contract(tokenABI, tokenAddress)
        return TokenContract.methods.balanceOf(account).call().then(balance => {
            return Web3.utils.fromWei(balance, 'ether');
        })
    }

    buy = (address, amount, info, listener) => {
        if (!this.checkWallet()) return 0
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const marketMakerContract = new metamaskWeb3.eth.Contract(stocksABI, '0xE27Dd91434859360a1E9bD3571707200f476564C');

        console.log(address, this._getWei(amount), info.blockNo);
        console.log(info["signs"][0].v, info["signs"][0].r, info["signs"][0].s);
        console.log(info.price, info.fee);
        return marketMakerContract.methods.buyRegistrar(
            address.toString(), this._getWei(amount), info.blockNo.toString(), info["signs"][0].v.toString(), info["signs"][0].r.toString(), info["signs"][0].s.toString(), info.price.toString(), info.fee.toString())
            .send({ from: this.account })
            .on('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }

    sell = (address, amount, info, listener) => {
        if (!this.checkWallet()) return 0

        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const marketMakerContract = new metamaskWeb3.eth.Contract(stocksABI, '0xE27Dd91434859360a1E9bD3571707200f476564C');
        return marketMakerContract.methods.sellRegistrar(
            address.toString(), this._getWei(amount), info.blockNo.toString(), info["signs"][0].v.toString(), info["signs"][0].r.toString(), info["signs"][0].s.toString(), info.price.toString(), info.fee.toString())
            .send({ from: this.account })
            .on('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }

}