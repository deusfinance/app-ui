import React from 'react'

const ActionButton = (props) => {
  const { type, title, onlyLocking, onClick } = props
  return (
    <span
      className={`action-btn pointer ${
        type === 'GET' ? (onlyLocking ? 'uni-get-btn' : 'get-btn') : 'lock-btn'
      }`}
      onClick={(e) => onClick(e)}
    >
      <span className={`${onlyLocking ? 'uni-background' : ''}`}>
        {type === 'STAKE' && onlyLocking ? 'GET BPT' : `${type} ${title}`}
      </span>
    </span>
  )
}

export default ActionButton
