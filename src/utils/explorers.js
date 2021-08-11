import React from 'react'
import { toast } from 'react-toastify'
import { ExternalLink } from '../components/App/Link'
import { Type } from '../components/App/Text'
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
  const prefix = `https://blockscout.com/xdai/${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[100]
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

function getBscscanLink(chainId, data, type) {
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


function getHechoInfo(chainId, data, type) {
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

export function getTransactionLink(chainId, data, type) {
  switch (chainId) {
    case 1:
    case 3:
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

    case 256:
    case 128: {
      return getHechoInfo(chainId, data, type)
    }
    case 137: {
      return getPolygonScan(chainId, data, type)
    }
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

export function SwapTransaction(type, payload) {
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
        </ExternalLink>
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
        </ExternalLink>
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
        </ExternalLink>
      )
  }
  return
}

export function ApproveTransaction(type, payload) {
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
          {`Approved ${payload.from.symbol} ↗`}
        </ExternalLink>
      )
      break

    case TransactionState.FAILED:
      if (!payload.hash) {
        ToastTransaction('warn', 'Transaction Rejected')
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
        </ExternalLink>
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
        </ExternalLink>
      )
  }
  return
}

//to do
export function CustomTransaction(type, payload) {
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
          {`${payload.message}`}
        </ExternalLink>
      )
      break

    case TransactionState.FAILED:
      ToastTransaction(
        'warn',
        'Transaction Failed'
        // <ExternalLink
        //   href={getTransactionLink(
        //     payload.chainId,
        //     payload.hash,
        //     'transaction'
        //   )}
        // >
        //   {`View On Explorer`}
        // </ExternalLink>
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
        </ExternalLink>
      )
  }
  return
}
