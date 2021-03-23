import Web3 from 'web3'
import addrs from './addresses.json'
import { xdaiSynchronizerABI, tokenABI, wxdaiProxyABI } from '../utils/abis';

export class StockService {

    constructor(account, chainId = 100) {
        this.account = account;
        this.chainId = chainId;
        if (chainId === 100) {
            this.marketMaker = "0xc2fB644cd18325C58889Cf8BB0573e4a8774BCD2";
            this.wxdaiProxy = "0x89951F2546f36789072c72C94272a68970Eba65e";
        } else {
            //error
            this.marketMaker = "0xBa13DaE5D0dB9B6683b4ad6b6dbee5251D18eAcb";
        }
        this.xdaiTokenAddress = "0x0000000000000000000000000000000000000001"
    }

    makeProvider = () => {
        if (this.INFURA_URL) return
        this.INFURA_URL = 'https://rpc.xdaichain.com/';
        this.infuraWeb3 = new Web3(new Web3.providers.HttpProvider(this.INFURA_URL));
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
        100: "xDAI",
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

    getAllowances = (tokenAddress, account, spender = this.wxdaiProxy) => {
        this.makeProvider()

        if (!account) return
        console.log(tokenAddress, account)

        if (tokenAddress === this.xdaiTokenAddress) {
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
        return tokenContract.methods.approve(this.wxdaiProxy, this._getWei(amount))
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

    buy = (address, amount, oracles, maxPrice, listener) => {
        if (!this.checkWallet()) return 0
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const marketMakerContract = new metamaskWeb3.eth.Contract(wxdaiProxyABI, this.wxdaiProxy);
        const info = oracles[0]
        console.log("oracles", oracles);
        console.log(maxPrice);
        return marketMakerContract.methods.calculateXdaiAmount(maxPrice, info.fee.toString(), this._getWei(amount)).call().then(xdaiAmount => {
            return marketMakerContract.methods.buy(
                info.multiplier,
                address.toString(),
                this._getWei(amount),
                info.fee.toString(),
                [oracles[0].blockNo.toString(), oracles[1].blockNo.toString()],
                [oracles[0].price, oracles[1].price],
                [oracles[0]["signs"]["buy"].v.toString(), oracles[1]["signs"]["buy"].v.toString()],
                [oracles[0]["signs"]["buy"].r.toString(), oracles[1]["signs"]["buy"].r.toString()],
                [oracles[0]["signs"]["buy"].s.toString(), oracles[1]["signs"]["buy"].s.toString()])
                .send({ from: this.account, value: xdaiAmount, gasPrice: Web3.utils.toWei("1", "Gwei") })
                .on('transactionHash', (hash) => listener("transactionHash", hash))
                .once('receipt', () => listener("receipt"))
                .on('error', () => listener("error"));
        })
    }

    sell = (address, amount, oracles, listener) => {
        if (!this.checkWallet()) return 0
        const info = oracles[0]
        console.log(oracles);
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const marketMakerContract = new metamaskWeb3.eth.Contract(wxdaiProxyABI, this.wxdaiProxy);
        return marketMakerContract.methods.sell(
            info.multiplier,
            address.toString(),
            this._getWei(amount),
            info.fee.toString(),
            [oracles[0].blockNo.toString(), oracles[1].blockNo.toString()],
            [oracles[0].price, oracles[1].price],
            [oracles[0]["signs"]["sell"].v.toString(), oracles[1]["signs"]["sell"].v.toString()],
            [oracles[0]["signs"]["sell"].r.toString(), oracles[1]["signs"]["sell"].r.toString()],
            [oracles[0]["signs"]["sell"].s.toString(), oracles[1]["signs"]["sell"].s.toString()])
            .send({ from: this.account, gasPrice: Web3.utils.toWei("1", "Gwei") })
            .on('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }

    getTotalCap = async () => {
        return 1000000
    }

    getUsedCap = async () => {
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const marketMakerContract = new metamaskWeb3.eth.Contract(xdaiSynchronizerABI, this.marketMaker);
        return marketMakerContract.methods.remainingDollarCap().call().then(info => {
            return Web3.utils.fromWei(info, 'ether');
        })
    }
}