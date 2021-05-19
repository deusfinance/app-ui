import React from 'react'
import TokenBadge from './TokenBadge'
import useWeb3 from '../../helper/useWeb3'
import { makeContract } from '../../utils/Stakefun'
import { BridgeABI } from '../../utils/StakingABI'
import { sendTransaction } from '../../utils/Stakefun'
import {
  chains,
  tokens,
  ethContract,
  bscContract,
  ftmContract,
  BSCContract,
  ETHContract,
  FTMContract
} from './data'
import { ethCallContract } from './utils'

const ClaimToken = (props) => {
  const { claims, chainId, account, setFetch } = props
  const web3 = useWeb3()
  const activeEthContract = makeContract(web3, BridgeABI, ETHContract)
  const activeBscContract = makeContract(web3, BridgeABI, BSCContract)
  const activeFtmContract = makeContract(web3, BridgeABI, FTMContract)

  const handleClaim = async (claim, id) => {
    if (chainId !== id) {
      return
    }
    let Contract = ''

    switch (chainId) {
      case 4:
        Contract = activeEthContract
        break
      case 97:
        Contract = activeBscContract
        break
      case 4002:
        Contract = activeFtmContract
        break
      default:
        break
    }
    let originContractAddress = ''
    switch (Number(claim.fromChain)) {
      case 1:
        originContractAddress = ETHContract
        break
      case 2:
        originContractAddress = BSCContract
        break
      case 3:
        originContractAddress = FTMContract
        break
      default:
        break
    }
    let amount = web3.utils.fromWei(claim.amount, 'ether')
    let chain = chains.find((item) => item.network === Number(claim.toChain))
    // const Contract = makeContract(web3, BridgeABI, bridgeContract)
    let nodesSigResults = await ethCallContract(
      originContractAddress,
      'getTx',
      [claim.txId],
      BridgeABI,
      Number(claim.fromChain)
    )
    let sigs = nodesSigResults.result.signatures.map(
      ({ signature }) => signature
    )
    sendTransaction(
      Contract,
      `claim`,
      [
        account,
        claim.amount,
        Number(claim.fromChain),
        Number(claim.toChain),
        claim.tokenId,
        claim.txId,
        sigs
      ],
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
