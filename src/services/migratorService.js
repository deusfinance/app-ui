import Web3 from 'web3'
import addrs from './addresses.json'
import { migratorABI, tokenABI } from '../utils/abis';

export class MigratorService {

    constructor(account, chainId = 1) {
        this.account = account;
        this.chainId = chainId;
        if (chainId !== 4 && chainId !== 1) {
            this.chainId = 1
        }
        this.INFURA_URL = 'wss://' + this.getNetworkName() + '.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093';
        this.infuraWeb3 = new Web3(new Web3.providers.WebsocketProvider(this.INFURA_URL));
        this.migratorContract = new this.infuraWeb3.eth.Contract(migratorABI, this.getMigratorAddr())
    }

    networkNames = {
        1: "Mainnet",
        3: "Ropsten",
        4: "Rinkeby",
        42: "Kovan",
    }

    makeProvider = () => {
        if (this.INFURA_URL) return
        this.INFURA_URL = '';
        this.infuraWeb3 = new Web3(new Web3.providers.HttpProvider(this.INFURA_URL));
    }

    checkWallet = () => this.account && this.chainId

    getNetworkName = () => this.networkNames[this.chainId.toString()]

    getMigratorAddr = () => addrs["migrator"][this.chainId.toString()]

    getTokenAddr = (tokenName) => addrs["token"][tokenName][this.chainId.toString()]


    getTokenBalance(tokenName) {
        if (!this.checkWallet()) return 0

        const account = this.account;
        const TokenContract = new this.infuraWeb3.eth.Contract(tokenABI, this.getTokenAddr(tokenName))
        return TokenContract.methods.balanceOf(account).call().then(balance => {
            return Web3.utils.fromWei(balance, 'ether');
        })
    }

    _getWei(number) {
        return Web3.utils.toWei(String(number), 'ether')
    }

    getRatio() {
        this.makeProvider()
        return this.migratorContract.methods.ratio().call().then(ratio => {
            return Web3.utils.fromWei(ratio, 'ether');
        })
    }

    migrate(amount, toCoin, listener) {
        if (!this.checkWallet()) return 0;
        console.log(amount, toCoin);

        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const metamaskMigratorContract = new metamaskWeb3.eth.Contract(migratorABI, this.getMigratorAddr());

        return metamaskMigratorContract.methods.migrate(this._getWei(amount), this.getTokenAddr(toCoin))
            .send({ from: this.account })
            .on('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }
}
