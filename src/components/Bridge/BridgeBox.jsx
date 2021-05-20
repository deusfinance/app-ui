import React from 'react'
import TokenBadge from './TokenBadge'

const BridgeBox = (props) => {
  const {
    title,
    chain,
    max,
    handleOpenModal,
    icon,
    name,
    balance,
    amount,
    setAmount,
    readonly
  } = props

  return (
    <div className="bridge-box">
      <div className="flex-between">
        <div className="bridge-from">{title}</div>
        <div className="bridge-from font-weight-600">{`Balance: ${balance}`}</div>
      </div>
      <div className="flex-between pt-13">
        <div>
          {readonly ? (
            <div className="bridge-amount">{amount}</div>
          ) : (
            <input
              type="text"
              className="input-transparent bridge-amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          )}
        </div>

        <div className="bridge-token ">
          {max && (
            <div
              onClick={() => setAmount(balance)}
              className="bridge-max pointer"
            >
              Max
            </div>
          )}
          <TokenBadge chain={chain} icon={icon} />
          <div className="bridge-assets" onClick={handleOpenModal}>
            {name} <img src="/img/arrow-nav.svg" alt="arrow" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BridgeBox
