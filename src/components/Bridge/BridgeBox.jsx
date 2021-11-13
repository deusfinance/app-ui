import React from 'react'
import { useState, useEffect } from 'react'
import { getFullDisplayBalance } from '../../helper/formatBalance'
import useCrossTokenBalance from '../../hooks/useCrossTokenBalance'
import { formatBalance3 } from '../../utils/utils'
import TokenBadge from './TokenBadge'

const BridgeBox = (props) => {
  const {
    title,
    max,
    handleOpenModal,
    amount,
    setAmount,
    readonly,
    currency,
  } = props

  // const [balance, setBalance] = useState(100)
  const data = useCrossTokenBalance(currency?.address, currency.chainId)
  const [balance, setBalance] = useState(data)

  useEffect(() => {
    const getBalance = () => {
      setBalance(data ? getFullDisplayBalance(data, currency?.decimals) : "0")
    }

    if (currency) {
      getBalance()
    }

  }, [data, currency,])


  return (
    <div className="bridge-box">
      <div className="flex-between">
        <div className="bridge-from">{title}</div>
        <div className="bridge-from">
          {balance && `Balance: ${formatBalance3(balance)}`}
          {max && (
            <div
              onClick={() => setAmount(balance)}
              className="bridge-max pointer"
            >
              (Max)
            </div>
          )}
        </div>
      </div>
      <div className="flex-between pt-13">
        <div className="wrap-input">
          <input
            type="number"
            className="input-transparent bridge-amount"
            value={amount}
            placeholder={`${currency.symbol ? "0.0" : ""}`}
            disabled={!currency.symbol || readonly}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="bridge-token ">
          {currency.chainId && <TokenBadge chainId={currency.chainId} logo={currency.logo} />}
          <div className="bridge-assets pointer" onClick={handleOpenModal}>
            {currency.symbol ? (
              <div className="select-token">
                {currency.symbol}
                <img src="/img/arrow-nav-black.svg" alt="arrow" />
              </div>
            ) : (
              <div className="select-token-btn">
                <span>Select a token</span>
                <img src="/img/bridge/arrow-nav-black.svg" alt="arrow" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BridgeBox
