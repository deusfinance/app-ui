import Web3 from 'web3'
import abis from './abis'
import addrs from './addresses.json'

export class VaultsService {

    constructor(account, chainId = 1) {
        this.account = account;
        this.chainId = 1;
        this.INFURA_URL = 'wss://' + this.getNetworkName() + '.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093';
        this.infuraWeb3 = new Web3(new Web3.providers.WebsocketProvider(this.INFURA_URL));
        this.AutomaticMarketMakerContract = new this.infuraWeb3.eth.Contract(abis["amm"], this.getAddr("amm"));
    }

    checkWallet = () => this.account && this.chainId


    networkNames = {
        1: "Mainnet",
        3: "Ropsten",
        4: "Rinkeby",
        42: "Kovan",
    }

    TokensMaxDigit = {
        wbtc: 8,
        sand_wbtc: 18,
        usdt: 6,
        usdc: 6,
        coinbase: 18,
        deus: 18,
        dai: 18,
        eth: 18,
    }

    _getWei(number, token = "eth") {
        let max = this.TokensMaxDigit[token] ? this.TokensMaxDigit[token] : 18
        // let value = typeof number === "string" ? parseFloat(number).toFixed(18) : number.toFixed(18)
        let ans = Web3.utils.toWei(String(number), 'ether');
        ans = ans.substr(0, ans.length - (18 - max));
        console.log(ans);
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

    getNetworkName = () => this.networkNames[this.chainId.toString()]

    getAddr = (tokenName) => addrs[tokenName][this.chainId.toString()]

    getTokenAddr = (tokenName) => addrs["token"][tokenName][this.chainId.toString()]

    getVaultsAddr = (tokenName) => addrs["vaults"][tokenName][this.chainId.toString()]


    // _getWei(number) {
    //     const value = typeof number === "string" ? parseFloat(number).toFixed(18) : number.toFixed(18)
    //     return Web3.utils.toWei(String(value), 'ether')
    // }

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
            return this._fromWei(balance, tokenName);
        })
    }


    getTokenTotalSupply(tokenName) {

        const TokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(tokenName));
        return TokenContract.methods.totalSupply().call().then(supply => {
            return this._fromWei(supply, tokenName);
        })
    }


    getAllowances(tokenName, contractName) {
        if (!this.checkWallet()) return 0;
        if (tokenName === "eth") return 9999

        const account = this.account;
        // console.log(tokenName);
        // console.log(this.getVaultsAddr(tokenName));

        const TokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(tokenName));
        return TokenContract.methods.allowance(account, this.getVaultsAddr(contractName))
            .call().then(amount => {
                let result = this._fromWei(amount, tokenName);
                // console.log(result);
                return result;
            });
    }


    getLockedAmount(contractName) {
        if (!this.checkWallet()) return 0;

        const account = this.account;
        console.log(contractName);
        const Contract = new this.infuraWeb3.eth.Contract(abis["vaults"], this.getVaultsAddr(contractName));
        return Contract.methods.users(account)
            .call().then(user => {
                let result = this._fromWei(user.lockedAmount, contractName);
                // console.log(result);
                return result;
            });
    }



    getTotalStakedToken(stakedToken) {

        const stakedTokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(stakedToken));

        return stakedTokenContract.methods.balanceOf(this.getStakeAddr(stakedToken)).call()
            .then(balance => {
                return this._fromWei(balance, stakedToken);
            }).catch(error => alert(error));
    }



    getSandAndTimeAmount(contractName, amount) {

        const account = this.account;
        const Contract = new this.infuraWeb3.eth.Contract(abis["vaults"], this.getVaultsAddr(contractName));
        return Contract.methods.sealedAndTimeAmount(account, this._getWei(amount, contractName))
            .call().then(amount => {
                console.log(amount);
                // let result = Web3.utils.fromWei(user.lockedAmount, 'ether');
                // console.log(result);
                return [Web3.utils.fromWei(amount[0], 'ether'), Web3.utils.fromWei(amount[1], 'ether')];
            });
    }


    approve(tokenName, contractName, amount, listener) {
        if (!this.checkWallet()) return 0;
        if (tokenName === "eth") return 9999999;

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const TokenContract = new metamaskWeb3.eth.Contract(abis["token"], this.getTokenAddr(tokenName));

        amount = Math.max(amount, 10 ** 20);

        return TokenContract.methods.approve(this.getVaultsAddr(contractName), this._getWei(amount, contractName))
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"));
    }




    lock(contractName, amount, listener) {
        if (!this.checkWallet()) return 0;

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        if (contractName === "eth") {
            const AutomaticMarketMakerContract = new metamaskWeb3.eth.Contract(abis["vaultsEth"], this.getVaultsAddr(contractName));
            return AutomaticMarketMakerContract.methods.lock()
                .send({ from: this.account, value: this._getWei(amount) })
        }
        const AutomaticMarketMakerContract = new metamaskWeb3.eth.Contract(abis["vaults"], this.getVaultsAddr(contractName));
        return AutomaticMarketMakerContract.methods.lock(this._getWei(amount, contractName))
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"));
    }

}

