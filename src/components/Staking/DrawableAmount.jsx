import React from 'react'
import { formatBalance3 } from '../../utils/utils'

const DrawableAmount = ({
  withDrawable,
  withDrawableExit,
  title,
  titleExit,
  width
}) => {
  return (
    <div className={`wrap-box-gray ${width}`}>
      <span>{withDrawable > 0 ? `${formatBalance3(withDrawable, 3)} ${title}` : ''}</span>
      <span>{withDrawable > 0 && withDrawableExit > 0 ? '+' : ''}</span>
      <span>
        {withDrawableExit > 0 ? `${formatBalance3(withDrawableExit, 3)} ${titleExit}` : ''}
      </span>
    </div>
  )
}

export default DrawableAmount
