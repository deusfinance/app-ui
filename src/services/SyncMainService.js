import Web3 from 'web3'
import addrs from './addresses.json'
import { bscSynchronizerABI, tokenABI } from '../utils/abis';

export class StockService {

    constructor(account, chainId = 1) {
        this.account = account;
        this.chainId = chainId;
        this.marketMaker = "0x7a27a7BF25d64FAa090404F94606c580ce8E1D37";
    }

    makeProvider = () => {
        if (this.INFURA_URL) return
        this.INFURA_URL = 'wss://mainnet.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093';
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

    _getWei(number, token = "eth") {
        let max = this.TokensMaxDigit[token] ? this.TokensMaxDigit[token] : 18
        // let value = typeof number === "string" ? parseFloat(number).toFixed(18) : number.toFixed(18)
        let ans = Web3.utils.toWei(String(number), 'ether');
        ans = ans.substr(0, ans.length - (18 - max));
        return ans.toString()
    }

    checkWallet = () => this.account && this.chainId

    getAddr = (tokenName) => addrs[tokenName][this.chainId.toString()]

    getTokenAddr = (tokenName) => addrs["token"][tokenName][this.chainId.toString()]

    getAllowances = (tokenAddress, account, spender = this.marketMaker) => {
        this.makeProvider()

        if (!account) return

        if (tokenAddress !== this.getTokenAddr("dai")) {
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
            .on('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }


    getEtherBalance(account) {
        return this.infuraWeb3.eth.getBalance(account).then(balance => {
            // console.log(balance);
            // console.log("balance ", balance);
            return Web3.utils.fromWei(balance, 'ether');
        })
    }


    getTokenBalance = (tokenAddress, account) => {
        this.makeProvider()
        if (!account) return

        if (tokenAddress === this.xdaiTokenAddress)
            return this.getEtherBalance(account)

        console.log(tokenAddress, account);

        const TokenContract = new this.infuraWeb3.eth.Contract(tokenABI, tokenAddress)
        return TokenContract.methods.balanceOf(account).call().then(balance => {
            console.log(tokenAddress, balance);
            return Web3.utils.fromWei(balance, 'ether');
        })
    }

    buy = (address, amount, oracles, listener) => {
        if (!this.checkWallet()) return 0
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const marketMakerContract = new metamaskWeb3.eth.Contract(bscSynchronizerABI, this.marketMaker);
        const info = oracles[0]
        // console.log("oracles", oracles);
        // console.log("conrtact", marketMakerContract);
        // console.log("wallet ", this.account);
        // console.log("address ", address);
        // console.log("amount ", amount);

        //, gasPrice: Web3.utils.toWei("1", "Gwei")
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
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
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
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }

    getTotalCap = async () => {
        return 1000000
    }

    getUsedCap = async () => {
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const marketMakerContract = new metamaskWeb3.eth.Contract(this.marketMaker, this.marketMaker);
        return marketMakerContract.methods.remainingDollarCap().call().then(info => {
            return Web3.utils.fromWei(info, 'ether');
        })
    }
}