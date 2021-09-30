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
        <div className="bridge-from">{`${title} ${chain ? chain : ''}`}</div>
        <div className="bridge-from">
          {balance && `Balance: ${balance}`}
          {max && (
            <div
              onClick={() => setAmount(String(balance))}
              className="bridge-max pointer"
            >
              (Max)
            </div>
          )}
        </div>
      </div>
      <div className="flex-between pt-13">
        <div>
          {readonly ? (
            <div className="bridge-amount">{amount ? amount : '0.0'}</div>
          ) : (
            <input
              type="number"
              className="input-transparent bridge-amount"
              value={amount}
              placeholder="0"
              onChange={(e) => setAmount(e.target.value)}
            />
          )}
        </div>

        <div className="bridge-token ">
          {chain && <TokenBadge chain={chain} icon={icon} />}
          <div className="bridge-assets pointer" onClick={handleOpenModal}>
            {name ? (
              <div className="select-token">
                {name}
                <img src="/img/arrow-nav-black.svg" alt="arrow" />
              </div>
            ) : (
              <div className="select-token-btn">
                <span>Select a Token</span>
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
