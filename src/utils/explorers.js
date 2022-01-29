import React from 'react'
import { toast } from 'react-toastify'
import { ExternalLink } from '../components/App/Link'
import { Type } from '../components/App/Text'
import { ChainId, rpcConfig, TransactionState } from '../constant/web3'

export const ExplorerDataType = {
  ADDRESS: "address",
  TRANSACTION: "transaction",
  TOKEN: "token"
}

function getDefaultLink(chainId, data, type) {
  const prefix = rpcConfig[chainId].blockExplorerUrls || rpcConfig[ChainId.ETH].blockExplorerUrls

  switch (type) {
    case ExplorerDataType.TRANSACTION: {
      return `${prefix}/tx/${data}`
    }
    case ExplorerDataType.TOKEN: {
      return `${prefix}/token/${data}`
    }
    default: {
      return `${prefix}/address/${data}`
    }
  }
}


function getXdaiLink(chainId, data, type) {
  const prefix = rpcConfig[chainId].blockExplorerUrls || rpcConfig[ChainId.ETH].blockExplorerUrls

  switch (type) {
    case ExplorerDataType.TRANSACTION: {
      return `${prefix}/tx/${data}`
    }
    case ExplorerDataType.TOKEN: {
      return `${prefix}/tokens/${data}`
    }
    default: {
      return `${prefix}/address/${data}`
    }
  }
}


export function getTransactionLink(chainId, data, type) {

  switch (chainId) {
    case ChainId.ETH:
    case ChainId.RINKEBY:
    case ChainId.OPTIMISTIC:
    case ChainId.BSC:
    case ChainId.BSC_TESTNET:
    case ChainId.FTM:
    case ChainId.METIS:
    case ChainId.AVALANCHE:
    case ChainId.ARBITRUM:
    case ChainId.MATIC: {
      return getDefaultLink(chainId, data, type)
    }

    case ChainId.XDAI: {
      return getXdaiLink(chainId, data, type)
    }

    default: {
      return getDefaultLink(chainId, data, type)
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
      console.log(payload.error);
      console.log({ code: payload.error.code });
      console.log(payload.receipt);

      // if (payload.error.code === 4001) {
      //   console.log("User denied transaction signature!");
      // }

      if (!payload.hash) {
        ToastTransaction('warn', 'Transaction Rejected', "", { autoClose: true })
        return
      }

      if (!payload.receipt) {
        ToastTransaction('info', 'Transaction Unknown',
          <ExternalLink
            href={getTransactionLink(
              payload.chainId,
              payload.hash,
              'transaction'
            )}
          >
            {`View On Explorer ↗`}
          </ExternalLink>
          , { autoClose: true })
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
