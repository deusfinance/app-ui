import React from 'react'
import { sendTransaction } from '../../utils/Stakefun'
import { ExternalLink } from '../App/Link'
import useWeb3 from '../../helper/useWeb3'
// import { ToastTransaction } from '../../utils/explorers'

const UserInfo = (props) => {
  const {
    own,
    balance,
    title,
    chainId,
    stakeTypeName,
    claim,
    StakeAndYieldContract,
    owner,
    // maxRedeem,
    exit,
    burn,
    fullyUnlock,
    exitable,
    strategyLink,
    exitBalance,
  } = props
  const web3 = useWeb3()

  const handleClaim = () => {
    try {
      sendTransaction(
        StakeAndYieldContract,
        `claim`,
        [],
        owner,
        chainId,
        `Claim ${claim} ${title}`
      )
    } catch (error) {
      console.log('Error happend in Claim', error)
    }
  }
  const handleRedeem = async () => {
    try {

      if (exitBalance === '0' || exitBalance === '') return

      // if (Number(maxRedeem) < Number(exitBalance)) {
      //   ToastTransaction("warn", "Reedem Faild", "You could not reedem your token at the moment!")
      //   return
      // }

      let amount = web3.utils.toWei(String(exitBalance))

      sendTransaction(
        StakeAndYieldContract,
        `unfreeze`,
        [amount],
        owner,
        chainId,
        `Redeem ${exitBalance} ${title}`
      ).then(() => { })
    } catch (error) {
      console.log('error happend in Redeem', error)
    }
  }

  /*     const handleRedeemable = async () => {
       let result = await StakeAndYieldContract.methods.userInfo(owner).call()
       let { numbers } = result
       let exitBalance = web3.utils.fromWei(numbers[11], 'ether')
       updateUserInfo(exitBalance)
     } */


  const handleStopExit = () => {
    try {
      sendTransaction(
        StakeAndYieldContract,
        `setExit`,
        [!exit],
        owner,
        chainId,
        `${exit ? 'Stop Vault Exit' : 'Enable Vault Exit'}`
      )
    } catch (error) {
      console.log('error happend in exit', error)
    }
  }

  return (
    <div className="userInfo-container">
      <div className="flex-between flex-column mb-15">
        <div className="mb-15">
          <div className="userInfo-pool mb-20">
            <p>Staked :  <span className="blue-color">{` ${balance} ${title} `}</span></p>
            <p
              className="font-xs mt-2"
              dangerouslySetInnerHTML={{
                __html: own
              }}
            >
            </p>

          </div>

          <div className="userInfo-pool mb-20">
            <p>
              <span> Staketype: </span>
              <span className="blue-color">
                {stakeTypeName !== 'Stake' ? (
                  <a href={strategyLink} target="_blink">
                    {stakeTypeName}
                  </a>
                ) : (
                  stakeTypeName
                )}
              </span>
            </p>
            <div className="font-xs mt-2  ">generating yield with this <ExternalLink active={true} href={strategyLink}> Strategy ↗</ExternalLink> </div>
          </div>

          {title !== "BPT" && <div className="flex-between mb-15">
            <div className="exit-valuet">
              <p>
                <span className="blue-color">Exit Vault:</span> {exit ? "activated" : "deactivated"}
              </p>
              {exitable && exit && (
                <div className="font-xs mt-2">
                  <p>
                    You burn
                  <span className="blue-color">{` ${burn.toFixed(
                    4
                  )} ${title} per day `}</span>
                    {`(fully unlocked at ${fullyUnlock})`}
                  </p>
                </div>
              )}
            </div>
          </div>}
        </div>
        <div>
          <div className="wrap-box mb-15">
            <div className="wrap-box-gray cursor-default">
              <div >{`${claim} DEA `}</div>
              <div className="opacity-5">claimable</div>
            </div>
            <div className="wrap-box-gradient pointer" onClick={handleClaim}>
              CLAIM
            </div>
          </div>
          <div className="sub-description">
            *currently claimable Stake&Yield reward Tokens.
          </div>
          {title !== "BPT" && (
            <>
              {exit && <>
                <div className="wrap-box mb-15">
                  <div className="wrap-box-gray cursor-default">
                    <div>{`${exitBalance} ${title} `}</div>
                    <div className="opacity-5" >
                      redeemable
                    </div>
                  </div>
                  <div className={`wrap-box-gradient pointer wrap-box-gradient pointer`} onClick={handleRedeem}>
                    REEDEM
                </div>
                </div>

                <div className="sub-description">
                  *estimated unstakeable Vault tokens.
             </div>
              </>}
              <div className="wrap-box mb-15">
                <div className={`wrap-box-gradient pointer wrap-box-gradient-single`} onClick={handleStopExit}>
                  {exit ? 'Stop Vault Exit' : 'Enable Vault Exit'}
                </div>
              </div>
            </>)}
        </div>
      </div>
    </div >
  )
}

export default UserInfo
