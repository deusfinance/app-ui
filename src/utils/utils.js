import { Web3Provider } from '@ethersproject/providers';
import { toast } from 'react-toastify';


export const isDesktop = () => {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return ((typeof window.orientation === "undefined") || (navigator.userAgent.indexOf('IEMobile') === -1)) && !(isMobile);
};



export const getStayledNumber = (number, space = 9) => {
    const strNumber = number.toString()
    const indexDot = strNumber.indexOf(".")
    if (indexDot === -1) return strNumber
    if (indexDot > space - 2) return strNumber.substring(0, indexDot)
    return strNumber.substring(0, indexDot).concat(strNumber.substring(indexDot, space))
}


export const formatAddress = (address) => {
    return address ? address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length) : 'connect wallet'
}



export function getLibrary(provider) {
    const library = new Web3Provider(provider, 'any')
    library.pollingInterval = 15000
    return library
}

export const notify = (methods) => (state) => {

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