import Web3 from 'web3'
import abis from './abis'
import addrs from './addresses.json'

export class StakeService {

    constructor(account, chainId) {
        this.account = account;
        this.chainId = 1;
        if (!chainId) {
            this.chainId = 1
        }
        this.INFURA_URL = 'wss://' + this.getNetworkName() + '.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093';
        this.infuraWeb3 = new Web3(new Web3.providers.WebsocketProvider(this.INFURA_URL));
    }

    networkNames = {
        1: "Mainnet",
        3: "Ropsten",
        4: "Rinkeby",
        42: "Kovan",
    }

    checkWallet = () => this.account && this.chainId

    getNetworkName = () => this.networkNames[this.chainId.toString()]

    getAddr = (tokenName) => addrs[tokenName][this.chainId.toString()]

    getTokenAddr = (tokenName) => addrs["token"][tokenName][this.chainId.toString()]

    getStakeAddr = (tokenName) => addrs["staking"][tokenName][this.chainId.toString()]


    _getWei(number) {
        return Web3.utils.toWei(String(number), 'ether')
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


    getAllowances(stakedToken) {
        if (!this.checkWallet()) return 0;

        const stakedTokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(stakedToken));
        return stakedTokenContract.methods.allowance(this.account, this.getStakeAddr(stakedToken))
            .call().then(amount => {
                let result = Web3.utils.fromWei(amount, 'ether');
                return result;
            });
    }

    stake(stakedToken, amount, listener) {

        if (!this.checkWallet()) return 0;

        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const metamaskStakedTokenContract = new metamaskWeb3.eth.Contract(abis["staking"], this.getStakeAddr(stakedToken));

        return metamaskStakedTokenContract.methods.deposit(this._getWei(amount))
            .send({ from: this.account })
            .on('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }


    getUserWalletStakedTokenBalance(stakedToken) {
        if (!this.checkWallet()) return 0;

        const stakedTokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(stakedToken));

        return stakedTokenContract.methods.balanceOf(this.account).call()
            .then(balance => {
                return Web3.utils.fromWei(balance, 'ether');
            });
    }



    approve(stakedToken, amount, listener) {
        if (!this.checkWallet()) return 0;
        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const metamaskStakedTokenContract = new metamaskWeb3.eth.Contract(abis["token"], this.getTokenAddr(stakedToken));
        if (stakedToken !== 'uni') {
            amount = Math.max(amount, 10 ** 20);
        } else {
            amount = Math.max(amount, 10 ** 10);
        }
        return metamaskStakedTokenContract.methods.approve(this.getStakeAddr(stakedToken), this._getWei(amount)) // amount = 1e30
            .send({ from: this.account })
            .on('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }

    withdraw(stakedToken, amount, listener) {
        if (!this.checkWallet()) return 0;
        console.log(stakedToken, amount);

        const metamaskWeb3 = new Web3(Web3.givenProvider);
        const metamaskStakingContract = new metamaskWeb3.eth.Contract(abis["staking"], this.getStakeAddr(stakedToken));

        return metamaskStakingContract.methods.withdraw(this._getWei(amount))
            .send({ from: this.account })
            .on('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    }


    getNumberOfStakedTokens(stakedToken) {
        if (!this.checkWallet()) return 0;

        let stakingContract = new this.infuraWeb3.eth.Contract(abis["staking"], this.getStakeAddr(stakedToken));

        return stakingContract.methods.users(this.account).call()
            .then(user => {
                return Web3.utils.fromWei(user.depositAmount, 'ether');
            });
    }

    getNumberOfPendingRewardTokens(stakedToken) {
        if (!this.checkWallet()) return 0;

        let stakingContract = new this.infuraWeb3.eth.Contract(abis["staking"], this.getStakeAddr(stakedToken));

        return stakingContract.methods.pendingReward(this.account).call()
            .then(amount => {
                return Web3.utils.fromWei(amount, 'ether');
            });
    }

    getTotalStakedToken(stakedToken) {

        const stakedTokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(stakedToken));

        return stakedTokenContract.methods.balanceOf(this.getStakeAddr(stakedToken)).call()
            .then(balance => {
                return Web3.utils.fromWei(balance, 'ether');
            });

    }


}




