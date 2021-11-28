import React from 'react'

const TokenBadge = (props) => {
  const { logo } = props
  return (
    <div className="notify-bridge">
      <img src={`${logo}`} alt={logo} />
    </div>
  )
}

export default TokenBadge
