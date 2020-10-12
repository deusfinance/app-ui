//Be name khoda
import Web3 from 'web3'

let network = 'Mainnet';
if (isConnected()) {
    network = getChainAndAddress().network;
}

window.ethereum.on('accountsChanged', function (accounts) {
    // window.location.reload();
    console.log(1);
});

window.ethereum.on('chainChanged', function (chainId) {
    // window.location.reload();
    console.log(2);
});

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

const AutomaticMarketMakerABI = [{ "inputs": [{ "internalType": "address", "name": "_deusToken", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenAmount", "type": "uint256" }], "name": "buy", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "etherAmount", "type": "uint256" }], "name": "calculatePurchaseReturn", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "calculateSaleReturn", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cw", "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "daoShare", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "daoShareScale", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "daoTargetBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "daoWallet", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "deusToken", "outputs": [{ "internalType": "contract DEUSToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "firstReserve", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "firstSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_firstReserve", "type": "uint256" }, { "internalType": "uint256", "name": "_firstSupply", "type": "uint256" }], "name": "init", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "maxDaoShare", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "dest", "type": "address" }], "name": "payments", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "reserve", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "reserveShiftAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "scale", "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }, { "internalType": "uint256", "name": "_etherAmount", "type": "uint256" }], "name": "sell", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_maxDaoShare", "type": "uint256" }, { "internalType": "uint256", "name": "_daoTargetBalance", "type": "uint256" }], "name": "setDaoShare", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_daoWallet", "type": "address" }], "name": "setDaoWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "payee", "type": "address" }], "name": "withdrawPayments", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
const AutomaticMarketMakerAddr = {
    Rinkeby: '0x6D3459E48C5D106e97FeC08284D56d43b00C2AB4',
    Mainnet: '0xD77700fC3C78d1Cb3aCb1a9eAC891ff59bC7946D'
}[network];

const DEUSTokenABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "BURNER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "CURRENT_POINT_INDEX_SETTER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MINTER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "currentPointIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getRoleMember", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleMemberCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_currentPointIndex", "type": "uint256" }], "name": "setCurrentPointIndex", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
const DEUSTokenAddr = {
    Rinkeby: '0xf025db474fcf9ba30844e91a54bc4747d4fc7842',
    Mainnet: '0x3b62f3820e0b035cc4ad602dece6d796bc325325'
}[network];

let INFURA_URL = 'wss://' + network + '.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093';

let infuraWeb3 = new Web3(new Web3.providers.WebsocketProvider(INFURA_URL));


let AutomaticMarketMakerContract = new infuraWeb3.eth.Contract(AutomaticMarketMakerABI, AutomaticMarketMakerAddr);
let DEUSTokenContract = new infuraWeb3.eth.Contract(DEUSTokenABI, DEUSTokenAddr);


function getEtherBalance() {
    if (window.ethereum && window.ethereum.selectedAddress) {
        return infuraWeb3.eth.getBalance(window.ethereum.selectedAddress).then(balance => {
            return Web3.utils.fromWei(balance, 'ether');
        })
    } else {
        return new Promise(function (resolve, reject) {
            resolve(0);
        })
    }
}

function getTokenBalance() {
    if (window.ethereum && window.ethereum.selectedAddress) {
        return DEUSTokenContract.methods.balanceOf(window.ethereum.selectedAddress).call().then(balance => {
            return Web3.utils.fromWei(balance, 'ether');
        })
    } else {
        return new Promise(function (resolve, reject) {
            resolve(0);
        })
    }
}

function getTokenAmountIfBuying(etherAmount) {
    return AutomaticMarketMakerContract.methods.calculatePurchaseReturn(_getWei(etherAmount)).call()
        .then(tokenAmount => {
            return Web3.utils.fromWei(tokenAmount, 'ether');
        });
}

function getEtherAmountRequiredForPurchasingToken(tokenAmount) {
    return new Promise(function (resolve, reject) {
        resolve(0);
    })
}

function buyToken(etherAmount, tokenAmount, listener) {
    return window.ethereum.enable().then(r => {
        let metamaskWeb3 = new Web3(Web3.givenProvider);
        AutomaticMarketMakerContract = new metamaskWeb3.eth.Contract(AutomaticMarketMakerABI, AutomaticMarketMakerAddr);
        return AutomaticMarketMakerContract.methods.buy(_getWei(tokenAmount * 0.95))
            .send({
                from: window.ethereum.selectedAddress,
                value: _getWei(etherAmount)
            }).on('transactionHash', () => listener("transactionHash"))
            .on('receipt', () => listener("receipt"))
            .on('error', () => listener("error"))
        // .on('confirmation', () => listener("confirmation"))

    });
}

function getEtherAmountIfSellingToken(tokenAmount) {
    return AutomaticMarketMakerContract.methods.calculateSaleReturn(_getWei(tokenAmount)).call()
        .then(etherAmount => {
            return Web3.utils.fromWei(etherAmount, 'ether');
        });
}

function getTokenAmountRequiredForGettingEther(tokenAmount) {
    return new Promise(function (resolve, reject) {
        resolve(0);
    })
}

function sellToken(tokenAmount, etherAmount, listener) {
    console.log("sell " + tokenAmount + "\t" + etherAmount);
    return window.ethereum.enable().then(r => {
        let metamaskWeb3 = new Web3(Web3.givenProvider);
        AutomaticMarketMakerContract = new metamaskWeb3.eth.Contract(AutomaticMarketMakerABI, AutomaticMarketMakerAddr);
        return AutomaticMarketMakerContract.methods.sell(_getWei(tokenAmount), _getWei(etherAmount * 0.95))
            .send({ from: window.ethereum.selectedAddress })
            .on('transactionHash', () => listener("transactionHash"))
            .on('receipt', () => {
                AutomaticMarketMakerContract.methods.withdrawPayments(window.ethereum.selectedAddress)
                    .send({ from: window.ethereum.selectedAddress })
                    .on('transactionHash', () => listener("transactionHash"))
                    .on('receipt', () => listener("receipt"))
                    .on('error', () => listener("error"))
            })
            .on('error', () => listener("error"))
        // .on('confirmation', () => listener("confirmation"))
    });
}


function getWithdrawableAmount() {
    if (window.ethereum && window.ethereum.selectedAddress) {
        return AutomaticMarketMakerContract.methods.payments(window.ethereum.selectedAddress).call().then(amount => {
            return Web3.utils.fromWei(amount, 'ether');
        })
    } else {
        return new Promise(function (resolve, reject) {
            resolve(0);
        })
    }
}

function withdrawPayment(listener) {
    return window.ethereum.enable().then(r => {
        let metamaskWeb3 = new Web3(Web3.givenProvider);
        AutomaticMarketMakerContract = new metamaskWeb3.eth.Contract(AutomaticMarketMakerABI, AutomaticMarketMakerAddr);
        return AutomaticMarketMakerContract.methods.withdrawPayments(window.ethereum.selectedAddress)
            .send({ from: window.ethereum.selectedAddress })
            .on('transactionHash', () => listener("transactionHash"))
            .on('receipt', () => listener("receipt"))
            .on('error', () => listener("error"))
    })
}

function getLockedEtherAmount() {
    return AutomaticMarketMakerContract.reserve.call().then(reserve => {
        return reserve;
    });
}

export {
    connectWallet,
    getTokenBalance,
    getEtherBalance,
    getTokenAmountIfBuying,
    getEtherAmountRequiredForPurchasingToken,
    buyToken,
    getEtherAmountIfSellingToken,
    getTokenAmountRequiredForGettingEther,
    sellToken,
    getWithdrawableAmount,
    withdrawPayment,
    getLockedEtherAmount,
}

//Dar panah khoda