import Web3 from 'web3'
import addrs from './addresses.json'
import { bscSynchronizerABI, tokenABI } from '../utils/abis';
import { random } from 'lodash';

export class StockService {

    constructor(account, chainId) {
        this.account = account;
        this.chainId = 137;
        this.usdc = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        this.marketMaker = "0x5e16B021994e3c2536435CA3A45f0dA6536eD315";
    }

    makeProvider = () => {
        if (this.INFURA_URL) return
        const RPC_URL = ["https://rpc-mainnet.matic.network", "https://rpc-mainnet.maticvigil.com",
            "https://rpc-mainnet.matic.quiknode.pro"]

        const randomIndex = random(0, RPC_URL.length - 1)
        this.INFURA_URL = RPC_URL[randomIndex];

        this.infuraWeb3 = new Web3(new Web3.providers.HttpProvider(this.INFURA_URL));
    }

    TokensMaxDigit = {
        usdc: 6,
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

    checkWallet = () => this.account && this.chainId

    getAddr = (tokenName) => addrs[tokenName][this.chainId.toString()]

    getTokenAddr = (tokenName) => addrs["token"][tokenName][this.chainId.toString()]

    getAllowances = (tokenAddress, account, spender = this.marketMaker) => {
        this.makeProvider()

        if (!account) return

        if (tokenAddress !== this.usdc) {
            console.log("hii");
            return 1000000000000000
        }
        console.log(tokenAddress, "wait for answer");

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
            .on('transactionHash', (hash) => listener("transactionHash", hash))
            .once('receipt', (hash) => listener("receipt", hash))
            .on('error', (hash) => listener("error", hash));
    }


    getTokenBalance = (tokenAddress, account) => {
        this.makeProvider()
        if (!account) return

        const TokenContract = new this.infuraWeb3.eth.Contract(tokenABI, tokenAddress)
        return TokenContract.methods.balanceOf(account).call().then(balance => {
            if (tokenAddress === this.usdc) {
                return this._fromWei(balance, "usdc")
            }
            return Web3.utils.fromWei(balance, 'ether');
        })
    }

    buy = (address, amount, oracles, listener) => {
        if (!this.checkWallet()) return 0
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const marketMakerContract = new metamaskWeb3.eth.Contract(bscSynchronizerABI, this.marketMaker);
        const info = oracles[0]
        console.log("oracles", oracles);
        console.log("conrtact", marketMakerContract);
        console.log("wallet ", this.account);
        console.log("address ", address);
        console.log("amount ", amount);

        return marketMakerContract.methods.buyFor(
            this.account,
            info.multiplier,
            address.toString(),
            this._getWei(amount),
            info.fee.toString(),
            [oracles[0].blockNo.toString(), oracles[1].blockNo.toString()],
            [oracles[0].price, oracles[1].price],
            [oracles[0]["signs"]["buy"].v.toString(), oracles[1]["signs"]["buy"].v.toString()],
            [oracles[0]["signs"]["buy"].r.toString(), oracles[1]["signs"]["buy"].r.toString()],
            [oracles[0]["signs"]["buy"].s.toString(), oracles[1]["signs"]["buy"].s.toString()])
            .send({ from: this.account })
            .on('transactionHash', (hash) => listener("transactionHash", hash))
            .once('receipt', (hash) => listener("receipt", hash))
            .on('error', (hash) => listener("error", hash));
    }

    sell = (address, amount, oracles, listener) => {
        if (!this.checkWallet()) return 0
        const info = oracles[0]
        console.log(oracles);
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const marketMakerContract = new metamaskWeb3.eth.Contract(bscSynchronizerABI, this.marketMaker);
        return marketMakerContract.methods.sellFor(
            this.account,
            info.multiplier,
            address.toString(),
            this._getWei(amount),
            info.fee.toString(),
            [oracles[0].blockNo.toString(), oracles[1].blockNo.toString()],
            [oracles[0].price, oracles[1].price],
            [oracles[0]["signs"]["sell"].v.toString(), oracles[1]["signs"]["sell"].v.toString()],
            [oracles[0]["signs"]["sell"].r.toString(), oracles[1]["signs"]["sell"].r.toString()],
            [oracles[0]["signs"]["sell"].s.toString(), oracles[1]["signs"]["sell"].s.toString()])
            .send({ from: this.account })
            .on('transactionHash', (hash) => listener("transactionHash", hash))
            .once('receipt', (hash) => listener("receipt", hash))
            .on('error', (hash) => listener("error", hash));
    }


    getUsedCap = async () => {
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const marketMakerContract = new metamaskWeb3.eth.Contract(bscSynchronizerABI, this.marketMaker);
        return marketMakerContract.methods.remainingDollarCap().call().then(info => {
            return this._fromWei(info, "usdc")
        })
    }
}