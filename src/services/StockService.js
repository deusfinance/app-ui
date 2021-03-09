import Web3 from 'web3'
import addrs from './addresses.json'
import { stocksABI, stakingABI, tokenABI } from '../utils/abis';
import JSBI from 'jsbi';

export class StockService {

    constructor(account, chainId = 1) {
        this.account = account;
        this.chainId = 1;
        this.marketMaker = "0x15e343d8Cebb2d9b17Feb7271bB26e127aa2E537";
        this.timeTokenAddress = this.getTokenAddr("timetoken")
        this.timeStakingAddress = this.getStakingAddr("timetoken")
    }

    makeProvider = () => {
        if (this.INFURA_URL) return
        this.INFURA_URL = 'wss://Mainnet.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093';
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

    getStakingAddr = (tokenName) => addrs["staking"][tokenName][this.chainId.toString()]

    getAllowances = (tokenAddress, account, spender = this.marketMaker) => {
        this.makeProvider()

        if (!account) return

        if (tokenAddress !== this.getTokenAddr("dai")) {
            return 1000000000000000
        }

        const TokenContract = new this.infuraWeb3.eth.Contract(tokenABI, tokenAddress)
        return TokenContract.methods.allowance(account, spender).call().then(balance => {
            return Web3.utils.fromWei(balance, 'ether');
        })
    }

    approve = (tokenAddress, amount, listener) => {
        if (!this.checkWallet()) return 0

        amount = Math.max(amount, 10 ** 20);

        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const tokenContract = new metamaskWeb3.eth.Contract(tokenABI, tokenAddress);
        return tokenContract.methods.approve(this.marketMaker, this._getWei(amount))
            .send({ from: this.account })
            .on('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }

    getTokenBalance = (tokenAddress, account) => {
        this.makeProvider()
        if (!account) return
        // console.log(tokenAddress, "called");

        const TokenContract = new this.infuraWeb3.eth.Contract(tokenABI, tokenAddress)
        return TokenContract.methods.balanceOf(account).call().then(balance => {
            // console.log(balance, "received");
            return Web3.utils.fromWei(balance, 'ether');
        })
    }

    buy = (address, amount, info, listener) => {
        if (!this.checkWallet()) return 0
        // var BN = Web3.utils.BN;
        // console.log("before", amount);
        // amount = new BN(amount).toString()
        // console.log("after", amount);
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const marketMakerContract = new metamaskWeb3.eth.Contract(stocksABI, this.marketMaker);

        console.log(address, this._getWei(amount), info.blockNo);
        console.log(info["signs"][0].v, info["signs"][0].r, info["signs"][0].s);
        const price = String(JSBI.BigInt(info.price))
        return marketMakerContract.methods.buy(
            address.toString(), this._getWei(amount), info.blockNo.toString(), price, info.fee.toString(), info["signs"][0].v.toString(), info["signs"][0].r.toString(), info["signs"][0].s.toString())
            .send({ from: this.account })
            .on('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }

    sell = (address, amount, info, listener) => {
        if (!this.checkWallet()) return 0
        const price = String(JSBI.BigInt(info.price))
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const marketMakerContract = new metamaskWeb3.eth.Contract(stocksABI, this.marketMaker);
        return marketMakerContract.methods.sell(
            address.toString(), this._getWei(amount), info.blockNo.toString(), price, info.fee.toString(), info["signs"][0].v.toString(), info["signs"][0].r.toString(), info["signs"][0].s.toString())
            .send({ from: this.account })
            .on('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }

    getTotalCap = (account) => {
        this.makeProvider()
        if (!account) return 0
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const TokenContract = new this.infuraWeb3.eth.Contract(tokenABI, this.timeTokenAddress);
        const marketMakerContract = new metamaskWeb3.eth.Contract(stocksABI, this.marketMaker);
        const TimeStakingContract = new metamaskWeb3.eth.Contract(stakingABI, this.timeStakingAddress)

        return TokenContract.methods.balanceOf(account).call().then(balance => {
            return TimeStakingContract.methods.users(account).call().then(stakedAmount => {
                return marketMakerContract.methods.capRatio().call().then(ratio => {
                    const balace = Number(Web3.utils.fromWei(balance, 'ether'));
                    const stakedAmount2 = Number(Web3.utils.fromWei(stakedAmount[0], 'ether'));
                    const result = ((balace + stakedAmount2) * Number(Web3.utils.fromWei(ratio, 'ether')))
                    return result;
                })
            })
        })
    }

    getUsedCap = (account) => {
        if (!account) return 0
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const marketMakerContract = new metamaskWeb3.eth.Contract(stocksABI, this.marketMaker);
        return marketMakerContract.methods.boughtAmount(account).call().then(info => {
            return Web3.utils.fromWei(info, 'ether');
        })
    }

}