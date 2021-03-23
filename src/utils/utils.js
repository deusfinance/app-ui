import { Web3Provider } from '@ethersproject/providers';
import { toast } from 'react-toastify';

export const isDesktop = () => {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return ((typeof window.orientation === "undefined") || (navigator.userAgent.indexOf('IEMobile') === -1)) && !(isMobile);
};



export const getStayledNumber = (number, space = 9, flag = true) => {
    if (!number && flag) return "0"
    if (number < 0) return ""
    const strNumber = number.toString()
    if (parseFloat(strNumber) < 0.0000000001) return 0
    if (strNumber.length < space) return strNumber
    const indexDot = strNumber.indexOf(".")
    if (indexDot === -1) return strNumber
    if (indexDot > space - 2) return strNumber.substring(0, indexDot)
    return strNumber.substring(0, indexDot).concat(strNumber.substring(indexDot, space))
}



export const formatBalance = (number, decimal = 9) => {
    if (!number) return "0"
    if (number < 0.00000001) return 0

    let strNumber = number.toString()
    const indexDot = strNumber.indexOf(".")
    let totalDecimals = strNumber.length - indexDot

    if (indexDot === -1 || (totalDecimals) <= decimal) return strNumber
    return strNumber.substring(0, indexDot).concat(strNumber.substring(indexDot, indexDot + decimal))
}

export const newFormatAmount = (number, decimal = 9) => {
    if (!number) return "0"
    if (parseFloat(number) === 0) return 0

    if (parseFloat(number) >= 1) {
        number = formatBalance(number, decimal)
    }
    for (let i = number.length; i > 0; i--) {
        if (number[i - 1] === "0") {
            number = number.slice(0, i)
        } else if (number[i - 1] === ".") {
            return number.slice(0, i - 1)
        } else {
            return number
        }

    }
    return number
}


export const setBackground = (type) => {
    const elm = document.getElementById("blur-pop")
    switch (type) {
        case "dark":
            elm.classList.add("blured")
            break;

        case "light":
            elm.classList.remove("blured")
            break;

        default:
            if (elm.classList.contains("blured")) {
                elm.classList.remove("blured")
            } else {
                elm.classList.add("blured")
            }
            break;
    }
    return
}


export const formatAddress = (address) => {
    return address ? address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length) : 'connect wallet'
}




export function dollarPrice(price, fixed = 0) {
    return Number(price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: fixed
    })
}

export function getLibrary(provider) {
    // const currProvider = provider ? provider : InfuraProvider.getWebSocketProvider("homestead", "cf6ea736e00b4ee4bc43dfdb68f51093")
    const library = new Web3Provider(provider, 'any')
    library.pollingInterval = 15000
    return library
}

const method = {
    onStart: () => {
        console.log("onStart")
    },
    onSuccess: () => {
        console.log("onSuccess")
    },
    onError: () => console.log("onError"),
}

export const notify = (methods = method, payload = null) => (state) => {

    switch (state) {
        case "waiting": {
            toast.info("Waiting for Metamask confirmation.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            break
        }
        case "transactionHash": {
            toast.info("Transaction broadcasted.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            methods.onStart(payload)
            break
        }
        case "receipt": {
            toast.success("Transaction Successful.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            methods.onSuccess(payload)
            break
        }
        case "connectWallet": {
            toast.warn("Please Connect Wallet.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            break
        }
        case "error": {
            toast.warn("Transaction Failed.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            methods.onError(payload)
            break
        }
        default: {
            toast.info("Unhandled Event.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            methods.onError(payload)
            break;
        }
    }
};
export const notifSync = (methods = method, payload = null) => (state, tx) => {

    switch (state) {
        case "transactionHash": {
            methods.onStart(tx)
            break
        }
        case "receipt": {
            methods.onSuccess(payload)
            break
        }
        case "error": {
            toast.dismiss();
            toast.warn("Transaction Failed.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            break
        }
        default: {
            toast.dismiss();
            toast.info("Unhandled Event.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            methods.onError(payload)
            break;
        }
    }
};

export const checkLimit = (swap, payload) => {

    const { to, from } = swap

    if (to.name === "coinbase" || from.name === "coinbase") {
        const isOk = localStorage.getItem("isRiskOk")
        if (!isOk) {
            payload.popup(true)
            return true
        }
    }

    return false
}


