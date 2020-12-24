import { Web3Provider } from '@ethersproject/providers';
import { toast } from 'react-toastify';
import React from 'react';


export const isDesktop = () => {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return ((typeof window.orientation === "undefined") || (navigator.userAgent.indexOf('IEMobile') === -1)) && !(isMobile);
};



export const getStayledNumber = (number, space = 9) => {
    if (!number) return "0"
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
    if (number < 0.0000000001) return 0
    if (number < 0.000001) {
        console.log("number");
        return number.toString()

    }

    let strNumber = number.toString()
    const indexDot = strNumber.indexOf(".")
    let totalDecimals = strNumber.length - indexDot
    if (indexDot === -1 || (totalDecimals) <= decimal) return strNumber
    return strNumber.substring(0, indexDot).concat(strNumber.substring(indexDot, indexDot + decimal))
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

export const notify = (methods = method) => (state) => {

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
            methods.onStart()
            break
        }
        case "receipt": {
            toast.success("Transaction Successful.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            methods.onSuccess()
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
            methods.onError()
            break
        }
        default: {
            toast.info("Unhandled Event.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            methods.onError()
            break;
        }
    }
};

export const checkLimit = (swap) => {

    const { to } = swap

    if (to.name === "coinbase") {

        toast.info(<div> Coinbase static sale is closed! <br />Bonding curve will start soon.<br /> <br />
                Until then you can buy them on  <a style={{ color: "gold" }} href="https://app.uniswap.org/#/swap?inputCurrency=0x4185cf99745b2a20727b37ee798193dd4a56cdfa&outputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" target="_blank" rel="noopener noreferrer">Uniswap</a>
        </div>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return true
    }
    return false
}
