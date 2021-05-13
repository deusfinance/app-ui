import React from 'react'
import { sendTransaction } from '../../utils/Stakefun'

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
    earned
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
            <p>Fluid</p>
            <p className="opacity-5">
              Tokens that are available to withdraw, as the ETH has already been
              withdrawn back into the treasury.
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
              <div>{`${earned} DEA`}</div>
              <div>{`${withDrawable} ${title}`}</div>
            </div>
          </div>
          <div className="fluid-footer-container  mb-15">
            <div className="mb-15 fluid-footer">
              <div>currently redeemable Vault tokens</div>
              <div>currently claimable Reward tokens</div>
              <div>currently unfrozen withdrawable Staked tokens</div>
            </div>
            <div className="wrap-box float-right">
              <div
                className="wrap-box-gradient-complete pointer"
                onClick={handleWithDraw}
              >
                <div className="fluid-box-content">
                  Withdraw + Claim + Redeem
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fluid
