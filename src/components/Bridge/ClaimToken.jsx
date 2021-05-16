import React from 'react'
import TokenBadge from './TokenBadge'
import useWeb3 from '../../helper/useWeb3'
import { chains, tokens, ETHContract, BSCContract } from './data'
import { makeContract } from '../../utils/Stakefun'
import { BridgeABI } from '../../utils/StakingABI'
import { sendTransaction } from '../../utils/Stakefun'

const ClaimToken = (props) => {
  const { claims, chainId, account, setFetch } = props
  const web3 = useWeb3()
  // let network = ''
  // if (chainId && validNetworks.includes(chainId)) {
  //   network = chains.find((item) => item.id === chainId).network
  // }
  // let showClaims = claims.filter((item) => Number(item.toChain) === network)
  const handleClaim = async (claim, id) => {
    if (chainId !== id) {
      return
    }
    let bridgeContract = ''

    switch (chainId) {
      case 4:
        bridgeContract = ETHContract
        break
      case 97:
        bridgeContract = BSCContract
        break
      default:
        break
    }
    let amount = web3.utils.fromWei(claim.amount, 'ether')
    let chain = chains.find((item) => item.network === Number(claim.toChain))
    const Contract = makeContract(web3, BridgeABI, bridgeContract)
    console.log({
      claim,
      camount: claim.amount,
      amount,
      network: Number(claim.toChain),
      tokenId: claim.tokenId,
      cTx: claim.txId
    })
    sendTransaction(
      Contract,
      `claim`,
      [account, claim.amount, Number(claim.toChain), claim.tokenId, claim.txId],
      account,
      chainId,
      `Claim ${amount} ${chain.name}`
    ).then(() => {
      setFetch(claim)
    })
  }
  return (
    <>
      {claims.length > 0 && (
        <div className="claim-token">
          <div className="claim-token-title">CLAIM TOKENS</div>
          {claims.map((claim, index) => {
            let amount = web3.utils.fromWei(claim.amount, 'ether')
            let token = tokens.find((item) => item.tokenId === claim.tokenId)
            let chain = chains.find(
              (item) => item.network === Number(claim.toChain)
            )
            return (
              <div className="flex-between mb-5" key={index}>
                <div className="token-item">
                  <TokenBadge chain={chain.name} icon={token.icon} />
                  <span>{`${token.name} (${chain.name})`}</span>
                </div>
                <div className="claim-amount">{amount}</div>
                <div className="container-claim-btn">
                  {chain.id !== chainId && (
                    <div className="claim-btn">Change Network</div>
                  )}
                  <div
                    className="claim-btn"
                    onClick={() => handleClaim(claim, chain.id)}
                  >
                    CLAIM
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default ClaimToken
