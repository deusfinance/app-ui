import React from 'react'
import { toast } from 'react-toastify'
import { ExternalLink } from '../components/App/Link'
import { Type } from '../components/App/Text'
import { ChainId } from '../constant/web3'
import { TransactionState } from './constant'

export function shortenHex(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`
}

const EXPLORER_PREFIXES = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  56: '',
  100: 'mainnet',
  97: 'testnet.',
  128: '',
  137: '',
  256: 'testnet.',
  [ChainId.AVALANCHE]: '',
  [ChainId.METIS]: '',
  [ChainId.ARBITRUM]: '',
  [ChainId.OPTIMISTIC]: '',
}

function getEtherscanLink(chainId, data, type) {
  const prefix = `https://${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[1]
    }etherscan.io`

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

function getXdaiLink(chainId, data, type) {
  const prefix = `https://blockscout.com/xdai${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[100]
    }`

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
function getAvalancheLink(chainId, data, type) {
  const prefix = `https://cchain.explorer.avax.network${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[1]
    }`

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

function getBscScanLink(chainId, data, type) {
  const prefix = `https://${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[56]
    }bscscan.com`

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

function getPolygonScan(chainId, data, type) {
  const prefix = `https://${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[137]
    }polygonscan.com`

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


function getHecoLink(chainId, data, type) {
  const prefix = `https://${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[128]
    }hecoinfo.com`

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

function getMetisLink(chainId, data, type) {
  const prefix = `https://${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[ChainId.METIS]
    }andromeda-explorer.metis.io/`

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

function getArbitrumLink(chainId, data, type) {
  const prefix = `https://${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[ChainId.ARBITRUM]
    }arbiscan.io/`

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
    case 3:
    case 4: {
      return getEtherscanLink(chainId, data, type)
    }
    case ChainId.BSC:
    case ChainId.BSC_TESTNET: {
      return getBscScanLink(chainId, data, type)
    }
    case ChainId.XDAI: {
      return getXdaiLink(chainId, data, type)
    }

    case ChainId.HECO_TESTNET:
    case ChainId.HECO: {
      return getHecoLink(chainId, data, type)
    }
    case ChainId.MATIC: {
      return getPolygonScan(chainId, data, type)
    }
    case ChainId.AVALANCHE: {
      return getAvalancheLink(chainId, data, type)
    }
    case ChainId.METIS: {
      return getMetisLink(chainId, data, type)
    }
    case ChainId.ARBITRUM: {
      return getArbitrumLink(chainId, data, type)
    }
    // case ChainId.OPTIMISTIC: {
    //   return getOptimisticLink(chainId, data, type)
    // }
    default: {
      return getEtherscanLink(chainId, data, type)
    }
  }
}


export function ToastTransaction(type, title, data = '', option = {}) {
  switch (type) {
    case 'success':
      toast.success(
        <div>
          <Type.MD style={{ marginBottom: '3px' }}> {title}</Type.MD>
          {data}
        </div>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: false,
          closeOnClick: false,
          ...option
        }
      )
      break
    case 'warn':
      toast.warn(
        <div>
          <Type.MD style={{ marginBottom: '3px' }}> {title}</Type.MD>
          {data}
        </div>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: false,
          draggable: false,
          closeOnClick: false,
          ...option
        }
      )
      break

    case 'info':
    default:
      toast.info(
        <div>
          <Type.MD style={{ marginBottom: '3px' }}> {title}</Type.MD>
          {data}
        </div>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: false,
          closeOnClick: false,
          ...option
        }
      )
  }
}

export function SwapTransaction(type, payload, option = { autoClose: true }) {
  toast.dismiss()
  switch (type) {
    case TransactionState.LOADING:
      ToastTransaction(
        'info',
        'Transaction Pending',
        <ExternalLink
          href={getTransactionLink(
            payload.chainId,
            payload.hash,
            'transaction'
          )}
        >
          {`Swap ${payload.from.amount} ${payload.from.symbol} for ${payload.to.amount} ${payload.to.symbol} ↗ `}
        </ExternalLink>
      )
      break

    case TransactionState.SUCCESS:
      ToastTransaction(
        'success',
        'Transaction Successful',
        <ExternalLink
          href={getTransactionLink(
            payload.chainId,
            payload.hash,
            'transaction'
          )}
        >
          {`Swapped ${payload.from.amount} ${payload.from.symbol} for ${payload.to.amount} ${payload.to.symbol} ↗ `}
        </ExternalLink>,
        option)
      break

    case TransactionState.FAILED:
      if (!payload.hash) {
        ToastTransaction('warn', 'Transaction Rejected', '', {
          autoClose: true
        })
        return
      }
      ToastTransaction(
        'warn',
        'Transaction Failed',
        <ExternalLink
          href={getTransactionLink(
            payload.chainId,
            payload.hash,
            'transaction'
          )}
        >
          {`View On Explorer ↗`}
        </ExternalLink>,
        option)
      break

    default:
      ToastTransaction(
        'info',
        'Transaction Unhandled',
        <ExternalLink
          href={getTransactionLink(
            payload.chainId,
            payload.hash,
            'transaction'
          )}
        >
          {`View On Explorer ↗`}
        </ExternalLink>,
        option)
  }
  return
}

export function ApproveTransaction(type, payload, option = { autoClose: true }) {
  toast.dismiss()
  switch (type) {
    case TransactionState.LOADING:
      ToastTransaction(
        'info',
        'Transaction Pending',
        <ExternalLink
          href={getTransactionLink(
            payload.chainId,
            payload.hash,
            'transaction'
          )}
        >
          {`Approve  ${payload.from.symbol} ↗`}
        </ExternalLink>,
        {}
      )
      break

    case TransactionState.SUCCESS:
      ToastTransaction(
        'success',
        'Transaction Successful',
        <ExternalLink
          href={getTransactionLink(
            payload.chainId,
            payload.hash,
            'transaction'
          )}
        >
          {`Approved ${payload.from.symbol} ↗`}
        </ExternalLink>,
        option
      )
      break

    case TransactionState.FAILED:
      if (!payload.hash) {
        ToastTransaction('warn', 'Transaction Rejected', null, option)
        return
      }
      ToastTransaction(
        'warn',
        'Transaction Failed',
        <ExternalLink
          href={getTransactionLink(
            payload.chainId,
            payload.hash,
            'transaction'
          )}
        >
          {`View On Explorer ↗`}
        </ExternalLink>,
        option
      )
      break

    default:
      ToastTransaction(
        'info',
        'Transaction Unhandled',
        <ExternalLink
          href={getTransactionLink(
            payload.chainId,
            payload.hash,
            'transaction'
          )}
        >
          {`View On Explorer ↗`}
        </ExternalLink>,
        option
      )
  }
  return
}

export function CustomTransaction(type, payload, option = { autoClose: true }) {
  toast.dismiss()
  switch (type) {
    case TransactionState.LOADING:
      ToastTransaction(
        'info',
        'Transaction Pending',
        <ExternalLink
          href={getTransactionLink(
            payload.chainId,
            payload.hash,
            'transaction'
          )}
        >
          {`${payload.message} ↗ `}
        </ExternalLink>,
        {}
      )
      break

    case TransactionState.SUCCESS:
      ToastTransaction(
        'success',
        'Transaction Successful',
        <ExternalLink
          href={getTransactionLink(
            payload.chainId,
            payload.hash,
            'transaction'
          )}
        >
          {`${payload.message}`}
        </ExternalLink>,
        option
      )
      break

    case TransactionState.FAILED:
      if (!payload.hash) {
        ToastTransaction('warn', 'Transaction Rejected', "", { autoClose: true })
        return
      }
      ToastTransaction(
        'warn',
        'Transaction Failed',
        <ExternalLink
          href={getTransactionLink(
            payload.chainId,
            payload.hash,
            'transaction'
          )}
        >
          {`View On Explorer ↗`}
        </ExternalLink>,
        option
      )
      break

    default:
      ToastTransaction(
        'info',
        'Transaction Unhandled',
        <ExternalLink
          href={getTransactionLink(
            payload.chainId,
            payload.hash,
            'transaction'
          )}
        >
          {`View On Explorer`}
        </ExternalLink>,
        option
      )
  }
  return
}
