//Be name khoda
import Web3 from 'web3'

let network = 'rinkeby';
if (isConnected()) {
    network = getChainAndAddress().network;
}

// window.ethereum.on('accountsChanged', function(accounts) {
//     window.location.reload();
// });

// window.ethereum.on('chainChanged', function(chainId) {
//     window.location.reload();
// });

function connectWallet(initFunction) {
    return window.ethereum.enable().thne(res => {
        if (window.ethereum && window.ethereum.selectedAddress) {
            initFunction();
        }
    });
}

function getChainAndAddress() {
    let networkNames = {
        "0x1": "Mainnet",
        "0x3": "Ropsten",
        "0x4": "Rinkeby",
        "0x2a": "Kovan",
    }

    return {
        network: networkNames[window.ethereum.chainId],
        addres: window.ethereum.selectedAddress
    };
}

function isConnected() {
    return window.ethereum.selectedAddress != null;
}

function _getWei(number) {
    const value = typeof number === "string" ? parseFloat(number).toFixed(18) : number.toFixed(18)
    return Web3.utils.toWei(String(value), 'ether')
}

const INFURA_URL = 'wss://' + network + '.infura.io/ws/v3/3bbb2243f4d24357a630ee39fb1f5bca';
let infuraWeb3 = new Web3(new Web3.providers.WebsocketProvider(INFURA_URL));

let metamaskWeb3 = null;

const stakingContractABI = [{ "inputs": [{ "internalType": "address", "name": "_stakedToken", "type": "address" }, { "internalType": "address", "name": "_rewardToken", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "RewardClaimed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "lastRewardedBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "pendingReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardPerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardTillNowPerShare", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardToken", "outputs": [{ "internalType": "contract RewardToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakedToken", "outputs": [{ "internalType": "contract StakedToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "update", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "users", "outputs": [{ "internalType": "uint256", "name": "depositAmount", "type": "uint256" }, { "internalType": "uint256", "name": "paidReward", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const uniswapContractABI = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
const deusContractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "BURNER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "CURRENT_POINT_INDEX_SETTER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MINTER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "currentPointIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getRoleMember", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleMemberCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_currentPointIndex", "type": "uint256" }], "name": "setCurrentPointIndex", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]

let deusEth = {
    stakingAddr: { rinkeby: '0xcc284f82cd51a31ba045839f009cb208246bb5f9' }[network],
    stakingContractABI: stakingContractABI,
    stakedTokenAddr: { rinkeby: '0x3c2D80d0EdAa124287e62a78740AC9dcf2F67a00' }[network],
    stakedTokenContractABI: uniswapContractABI,
};

let deus = {
    stakingAddr: { rinkeby: '0x2a0C5fc61619372A811e093f0D5Ec4050aE0124d' }[network],
    stakingContractABI: stakingContractABI,
    stakedTokenAddr: { rinkeby: '0xf025db474fcf9ba30844e91a54bc4747d4fc7842' }[network],
    stakedTokenContractABI: deusContractABI,
}

let stakingPools = {
    deus_eth: deusEth,
    deus: deus,
};


for (const poolName in stakingPools) {
    let pool = stakingPools[poolName];
    console.log(pool.stakingAddr);
    console.log(pool.stakedTokenAddr);
    pool.infuraStakingContract = new infuraWeb3.eth.Contract(pool.stakingContractABI, pool.stakingAddr);
    pool.infuraStakedTokenContract = new infuraWeb3.eth.Contract(pool.stakedTokenContractABI, pool.stakedTokenAddr);
}


function approve(stakedToken, amount, listener) {
    window.ethereum.enable().then(r => {
        if (metamaskWeb3 === null) {
            metamaskWeb3 = new Web3(Web3.givenProvider);
        }
        let pool = stakingPools[stakedToken];
        if (!('metamaskStakedTokenContract' in pool)) {
            pool.metamaskStakedTokenContract = new metamaskWeb3.eth.Contract(pool.stakedTokenContractABI, pool.stakedTokenAddr);
        }
        return pool.metamaskStakedTokenContract.methods.approve(pool.stakingAddr, _getWei(1e30)) // amount = 1e30
            .send({ from: window.ethereum.selectedAddress })
            .on('transactionHash', () => listener("transactionHash"))
            .on('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    })
}

function getAllowances(stakedToken) {
    if (window.ethereum && window.ethereum.selectedAddress) {
        let pool = stakingPools[stakedToken];
        let stakedTokenContract = pool.infuraStakedTokenContract;
        return stakedTokenContract.methods.allowance(window.ethereum.selectedAddress, pool.stakedTokenAddr)
            .call().then(amount => {
                return Web3.utils.fromWei(amount, 'ether');
            });
    } else {
        return new Promise(function (resolve, reject) {
            resolve(0);
        })
    }
}

function stake(stakedToken, amount, listener) {
    console.log(stakedToken + "\t" + amount);
    window.ethereum.enable().then(r => {
        if (metamaskWeb3 === null) {
            metamaskWeb3 = new Web3(Web3.givenProvider);
        }
        let pool = stakingPools[stakedToken];
        if (!('metamaskStakingContract' in pool)) {
            pool.metamaskStakingContract = new metamaskWeb3.eth.Contract(pool.stakingContractABI, pool.stakingAddr);
        }
        return pool.metamaskStakingContract.methods.deposit(_getWei(amount))
            .send({ from: window.ethereum.selectedAddress })
            .on('transactionHash', () => listener("transactionHash"))
            .on('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    })
}


function getUserWalletStakedTokenBalance(stakedToken) {
    if (window.ethereum && window.ethereum.selectedAddress) {
        let pool = stakingPools[stakedToken];
        let stakedTokenContract = stakingPools[stakedToken].infuraStakedTokenContract;
        return stakedTokenContract.methods.balanceOf(window.ethereum.selectedAddress).call()
            .then(balance => {
                return Web3.utils.fromWei(balance, 'ether');
            });
    } else {
        return new Promise(function (resolve, reject) {
            resolve(0);
        })
    }
}

function withdraw(stakedToken, amount, listener) {
    window.ethereum.enable().then(r => {
        if (metamaskWeb3 === null) {
            metamaskWeb3 = new Web3(Web3.givenProvider);
        }
        let pool = stakingPools[stakedToken];
        if (!('metamaskStakingContract' in pool)) {
            pool.metamaskStakingContract = new metamaskWeb3.eth.Contract(pool.stakingContractABI, pool.stakingAddr);
        }
        return pool.metamaskStakingContract.methods.withdraw(_getWei(amount))
            .send({ from: window.ethereum.selectedAddress })
            .on('transactionHash', () => listener("transactionHash"))
            .on('receipt', () => listener("receipt"))
            .on('error', () => listener("error"));
    })
}

function getNumberOfStakedTokens(stakedToken) {
    if (window.ethereum && window.ethereum.selectedAddress) {
        let stakingContract = stakingPools[stakedToken].infuraStakingContract;
        return stakingContract.methods.users(window.ethereum.selectedAddress).call()
            .then(user => {
                return Web3.utils.fromWei(user.depositAmount, 'ether');
            });
    } else {
        return new Promise(function (resolve, reject) {
            resolve(0);
        })
    }
}

function getNumberOfPendingRewardTokens(stakedToken) {
    if (window.ethereum && window.ethereum.selectedAddress) {
        let stakingContract = stakingPools[stakedToken].infuraStakingContract;
        return stakingContract.methods.pendingReward(window.ethereum.selectedAddress).call()
            .then(amount => {
                return Web3.utils.fromWei(amount, 'ether');
            });
    } else {
        return new Promise(function (resolve, reject) {
            resolve(0);
        })
    }
}

function getTotalStakedToken(stakedToken) {
    if (window.ethereum && window.ethereum.selectedAddress) {
        let pool = stakingPools[stakedToken];
        let stakedTokenContract = stakingPools[stakedToken].infuraStakedTokenContract;
        return stakedTokenContract.methods.balanceOf(pool.stakingAddr).call()
            .then(balance => {
                return Web3.utils.fromWei(balance, 'ether');
            });
    } else {
        return new Promise(function (resolve, reject) {
            resolve(0);
        })
    }
}




export {
    connectWallet,
    stakingPools,
    approve,
    stake,
    withdraw,
    getAllowances,
    getUserWalletStakedTokenBalance,
    getNumberOfStakedTokens,
    getNumberOfPendingRewardTokens,
    getTotalStakedToken
}

//Dar panah khoda