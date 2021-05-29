import React from 'react'
import { getStayledNumber } from '../../utils/utils'

const DrawableAmount = ({
  withDrawable,
  withDrawableExit,
  title,
  titleExit,
  width
}) => {
  return (
    <div className={`wrap-box-gray ${width}`}>
      <span>{withDrawable > 0 ? `${getStayledNumber(withDrawable)} ${title}` : ''}</span>
      <span>{withDrawable > 0 && withDrawableExit > 0 ? '+' : ''}</span>
      <span>
        {withDrawableExit > 0 ? `${getStayledNumber(withDrawableExit)} ${titleExit}` : ''}
      </span>
    </div>
  )
}

export default DrawableAmount
