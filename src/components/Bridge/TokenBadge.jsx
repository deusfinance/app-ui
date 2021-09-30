import React from 'react'

const TokenBadge = (props) => {
  const { chain, icon } = props
  return (
    <div className="notify-bridge">
      <img src={`/img/bridge/${icon}`} alt={icon} />
      <span className={`badge badge-${chain}`}>{chain}</span>
    </div>
  )
}

export default TokenBadge
