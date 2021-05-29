import React from 'react'
import ActionButton from './ActionButton'

const CollapseTrigger = ({
  open,
  title,
  // titleExit,
  balancer,
  link,
  onlyLocking,
  apy,
  balanceWallet,
  balance,
  handleCollapseContent
}) => {
  // const handleGet = (e) => {
  //   if (link) {
  //     e.stopPropagation()
  //     e.preventDefault()
  //     window.open(link, '_blank')
  //   } else {
  //     handleCollapseContent('lock')
  //   }
  // }
  const handleLock = (e) => {
    if (balancer) {
      e.stopPropagation()
      e.preventDefault()
      window.open(link, '_blank')
    } else {
      if (open) {
        e.stopPropagation()
        e.preventDefault()
      }
      handleCollapseContent('lock')
    }
  }
  const handleStake = (e) => {
    if (onlyLocking) {
      e.stopPropagation()
      e.preventDefault()
      window.open(
        'https://pools.balancer.exchange/#/pool/0x1dc2948b6db34e38291090b825518c1e8346938b/',
        '_blank'
      )
    } else {
      if (open) {
        e.stopPropagation()
        e.preventDefault()
      }
      handleCollapseContent('stake')
    }
  }
  return (
    <div className="collapse-trigger">
      <div className="token-info">
        <p className="token-title">{title}</p>
        <div className="wallet-amount">
          <div className="item">
            <span className="blue-color">{balanceWallet}</span> wallet
          </div>
          <div className="item">
            {!onlyLocking && (
              <>
                <span className="blue-color">{`  ${balance}`}</span> Staked
              </>
            )}
          </div>
        </div>
      </div>
      {onlyLocking ? (
        <div className="swap-BPT">get BPT and stake for APY</div>
      ) : (
        <div className="apy-wrap">
          <div className="apy-stake"> {`${0}% APY (STAKE)`}</div>
          <div className="apy-yield"> {`${apy.toFixed(0)}% APY (YIELD)`}</div>
        </div>
      )}

      <div className="expand-container">
        {/* <ActionButton
          type="GET"
          title={titleExit}
          onlyLocking={onlyLocking}
          onClick={handleGet}
        /> */}

        <ActionButton
          type="GET"
          title={title}
          onlyLocking={onlyLocking}
          onClick={handleLock}
        />
        <ActionButton
          type="DEPOSIT"
          title={title}
          onlyLocking={onlyLocking}
          onClick={handleStake}
        />

        <span className="expand-btn pointer" name="expand-btn" onClick={open ? () => handleCollapseContent("default") : undefined}>
          {open ? 'Collapse' : 'Expand'}
          <img
            src="/img/arrow-nav.svg"
            className={open ? 'expand-btn-open' : ''}
            alt="arrow"
          />
        </span>
      </div>
    </div>
  )
}

export default CollapseTrigger
