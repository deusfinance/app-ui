import React from 'react';
import { toast } from 'react-toastify';
import { ExternalLink } from '../components/App/Link';
import { Type } from '../components/App/Text';
import { TransactionState } from './constant';

export function shortenHex(hex, length = 4) {
    return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`
}

const EXPLORER_PREFIXES = {
    1: '',
    4: 'rinkeby.',
    56: '',
    100: 'mainnet',
    97: 'testnet.',
}


function getEtherscanLink(chainId, data, type) {
    const prefix = `https://${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[1]}etherscan.io`

    switch (type) {
        case 'transaction': {
            return `${prefix}/tx/${data}`
        }
        case 'token': {
            return `${prefix}/token/${data}`
        }
        default: {
            return `${prefix}/address/${data}`
        }
    }
}

function getBlockscoutLink(chainId, data, type) {
    const prefix = `https://blockscout.com/xdai/${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[100]}`

    switch (type) {
        case 'transaction': {
            return `${prefix}/tx/${data}`
        }
        case 'token': {
            return `${prefix}/tokens/${data}`
        }
        default: {
            return `${prefix}/address/${data}`
        }
    }
}

function getBscscanLink(chainId, data, type) {
    const prefix = `https://${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[56]}bscscan.com`

    switch (type) {
        case 'transaction': {
            return `${prefix}/tx/${data}`
        }
        case 'token': {
            return `${prefix}/token/${data}`
        }
        default: {
            return `${prefix}/address/${data}`
        }
    }
}

export function getTransactionLink(chainId, data, type) {

    switch (chainId) {
        case 1:
        case 4: {
            return getEtherscanLink(chainId, data, type)
        }
        case 56:
        case 97: {
            return getBscscanLink(chainId, data, type)
        }
        case 100: {
            return getBlockscoutLink(chainId, data, type)
        }
        default: {
            return getEtherscanLink(chainId, data, type)
        }
    }
}


export function ToastTransaction(type, title, data = "") {
    switch (type) {
        case "success":
            toast.success(<div><Type.LG style={{ marginBottom: "5px" }}> {title}</Type.LG>
                {data}
            </div>, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false,
                closeOnClick: false,

            });
            break
        case "warn":
            toast.warn(<div><Type.LG style={{ marginBottom: "5px" }}> {title}</Type.LG>
                {data}
            </div>, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false,
                closeOnClick: false,
            });
            break;

        case "info":
        default:
            toast.info(<div><Type.LG style={{ marginBottom: "5px" }}> {title}</Type.LG>
                {data}
            </div>, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false,
                closeOnClick: false,
            });
    }
}

export function SwapTranaction(type, payload) {
    toast.dismiss();
    switch (type) {
        case TransactionState.LOADING:
            ToastTransaction("info", "Transaction Pending",
                <ExternalLink href={getTransactionLink(payload.chainId, payload.hash, 'transaction')}>
                    {`Swap ${payload.from.amount} ${payload.from.symbol} for ~${payload.to.amount} ${payload.to.symbol} ↗ `}
                </ExternalLink>
            )
            break;

        case TransactionState.SUCCESS:
            ToastTransaction("success", "Transaction Successful",
                <ExternalLink href={getTransactionLink(payload.chainId, payload.hash, 'transaction')}>
                    {`Swapped ${payload.from.amount} ${payload.from.symbol} for ~${payload.to.amount} ${payload.to.symbol} ↗ `}
                </ExternalLink>
            )
            break;

        case TransactionState.FAILED:
            ToastTransaction("warn", "Transaction Failed",
                <ExternalLink href={getTransactionLink(payload.chainId, payload.hash, 'transaction')}>
                    {`View On Explorer ↗ `}
                </ExternalLink>
            )
            break;

        default:
            ToastTransaction("info", "Transaction Unhandled",
                <ExternalLink href={getTransactionLink(payload.chainId, payload.hash, 'transaction')}>
                    {`View On Explorer ↗ `}
                </ExternalLink>
            )
    }
    return
}

export function ApproveTranaction(type, payload) {
    toast.dismiss();
    switch (type) {
        case TransactionState.LOADING:
            ToastTransaction("info", "Transaction Pending",
                <ExternalLink href={getTransactionLink(payload.chainId, payload.hash, 'transaction')}>
                    {`Approve  ${payload.from.symbol} ↗ `}
                </ExternalLink>
            )
            break;

        case TransactionState.SUCCESS:
            ToastTransaction("success", "Transaction Successful",
                <ExternalLink href={getTransactionLink(payload.chainId, payload.hash, 'transaction')}>
                    {`Approved ${payload.from.symbol}`}
                </ExternalLink>
            )
            break;

        case TransactionState.FAILED:
            ToastTransaction("warn", "Transaction Failed",
                <ExternalLink href={getTransactionLink(payload.chainId, payload.hash, 'transaction')}>
                    {`View On Explorer`}
                </ExternalLink>
            )
            break;

        default:
            ToastTransaction("info", "Transaction Unhandled",
                <ExternalLink href={getTransactionLink(payload.chainId, payload.hash, 'transaction')}>
                    {`View On Explorer`}
                </ExternalLink>
            )
    }
    return
}