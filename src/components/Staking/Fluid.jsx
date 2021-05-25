import React from 'react'
import { sendTransaction } from '../../utils/Stakefun'
import { ExternalLink } from '../App/Link'

const Fluid = (props) => {
  const {
    withDrawable,
    withDrawableExit,
    owner,
    title,
    titleExit,
    StakeAndYieldContract,
    chainId,
    showFluid,
    // earned,
    withdrawIsActive
  } = props

  const handleWithDraw = () => {
    try {
      sendTransaction(
        StakeAndYieldContract,
        `withdrawUnfreezed`,
        [],
        owner,
        chainId,
        `Withdraw + Claim`
      ).then(() => {
        showFluid()
      })
    } catch (error) {
      console.log('error happend in Withdraw', error)
    }
  }
  return (
    <div className="userInfo-container">
      <div className="flex-between flex-column">
        <div>
          <div className="frozen-desc">
            <p>Withdrawable tokens </p>
            <p className="opacity-5">
              Unstaked, claimable & redeemable tokens that are available to withdraw.
            </p>
          </div>
        </div>
        <div>
          <div className="wrap-box">
            {/* <DrawableAmount
            withDrawable={withDrawable}
            withDrawableExit={withDrawableExit}
            title={title}
            titleExit={titleExit}
            width="width-402 border-radius-6"
          /> */}
            <div className="wrap-box-gray-complete">
              <div>{`${withDrawableExit} ${titleExit}`}</div>
              <div>{`${withDrawable} ${title}`}</div>
            </div>
          </div>
          <div className="fluid-footer-container">
            <div className="mb-15 mt-4 fluid-footer">
              <div>estimated redeemable Vault tokens.</div>
              <div>currently  withdrawable Staked tokens.</div>
            </div>
            <div className="wrap-box float-right">
              <div
                className={`wrap-box-gradient-complete ${withdrawIsActive ? "pointer" : " default opacity-25"}  `}
                onClick={withdrawIsActive ? handleWithDraw : undefined}
              >
                <div className="fluid-box-content">
                  WITHDRAW + REDEEM
                </div>
              </div>
            </div>
            <div className="sub-description mt-4">
              <ExternalLink active={true} href="#">after yearn harvest. ↗</ExternalLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fluid
