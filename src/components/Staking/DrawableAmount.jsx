import React from 'react'

const DrawableAmount = ({
  withDrawable,
  withDrawableExit,
  title,
  titleExit,
  width
}) => {
  return (
    <div className={`wrap-box-gray ${width}`}>
      <span>{withDrawable > 0 ? `${withDrawable} ${title}` : ''}</span>
      <span>{withDrawable > 0 && withDrawableExit > 0 ? '+' : ''}</span>
      <span>
        {withDrawableExit > 0 ? `${withDrawableExit} ${titleExit}` : ''}
      </span>
    </div>
  )
}

export default DrawableAmount
