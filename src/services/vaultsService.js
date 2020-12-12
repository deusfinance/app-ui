import Web3 from 'web3'
import abis from './abis'
import addrs from './addresses.json'

export class VaultsService {

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

    getVaultsAddr = (tokenName) => addrs["vaults"][tokenName][this.chainId.toString()]


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


    getTokenTotalSupply(tokenName) {
        if (!this.checkWallet()) return 0;

        const TokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(tokenName));
        return TokenContract.methods.totalSupply().call().then(supply => {
            return Web3.utils.fromWei(supply, 'ether');
        })
    }


    getAllowances(tokenName, contractName) {
        if (!this.checkWallet()) return 0;
        if (tokenName === "eth") return 9999

        const account = this.account;
        console.log(tokenName);
        console.log(this.getVaultsAddr(tokenName));

        const TokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(tokenName));
        return TokenContract.methods.allowance(account, this.getVaultsAddr(contractName))
            .call().then(amount => {
                let result = Web3.utils.fromWei(amount, 'ether');
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
                let result = Web3.utils.fromWei(user.lockedAmount, 'ether');
                // console.log(result);
                return result;
            });
    }





    getSandAndTimeAmount(contractName, amount) {
        if (!this.checkWallet()) return 0;

        const account = this.account;
        const Contract = new this.infuraWeb3.eth.Contract(abis["vaults"], this.getVaultsAddr(contractName));
        return Contract.methods.sandAndTimeAmount(this._getWei(amount), account)
            .call().then(amount => {
                console.log(amount);
                // let result = Web3.utils.fromWei(user.lockedAmount, 'ether');
                // console.log(result);
                return [Web3.utils.fromWei(amount[0], 'ether'), Web3.utils.fromWei(amount[1], 'ether')];
            });
    }


    approve(tokenName, contractName, amount, listener) {
        if (!this.checkWallet()) return 0;

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const TokenContract = new metamaskWeb3.eth.Contract(abis["token"], this.getTokenAddr(tokenName));

        amount = Math.max(amount, 10 ** 20);

        return TokenContract.methods.approve(this.getVaultsAddr(contractName), this._getWei(amount))
            .send({ from: this.account })
            .on('transactionHash', () => listener("transactionHash"))
            .on('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }




    lock(contractName, amount, listener) {
        if (!this.checkWallet()) return 0;

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const AutomaticMarketMakerContract = new metamaskWeb3.eth.Contract(abis["vaults"], this.getVaultsAddr(contractName));
        return AutomaticMarketMakerContract.methods.lock(this._getWei(amount))
            .send({ from: this.account })
            .on('transactionHash', () => listener("transactionHash"))
            .on('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }

}

