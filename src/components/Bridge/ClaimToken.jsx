import React from 'react'
import TokenBadge from './TokenBadge'
import useWeb3 from '../../hooks/useWeb3'

import { chains, tokens } from './data'

const ClaimToken = (props) => {
  const { claims, chainId, handleClaim } = props
  const web3 = useWeb3()

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
              <div key={index}>
                <div className="flex-between mb-5">
                  <div className="token-item">
                    <TokenBadge chain={chain.name} icon={token.icon} />
                    <span>{`${token.name} (${chain.name})`}</span>
                  </div>
                  <div className="claim-amount">{amount}</div>
                </div>
                {chain.network !== chainId ? (
                  <div className=" container-claim-btn change-claim">
                    CHANGE NETWORK TO CLAIM
                  </div>
                ) : (
                  <div
                    className="container-claim-btn claim-btn pointer"
                    onClick={() => handleClaim(claim, chain.network)}
                  >
                    CLAIM
                  </div>
                )}
                <div className="border-bottom-claim mb-20" />
              </div>
            )
          })}
          <div className="desc-claim">
            <span className="pink-color opacity-1">
              Change to the destination Network
            </span>
            <span className="opacity-5">
              to claim your token on respective networks.
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default ClaimToken
