import React from 'react'
import TokenBadge from './TokenBadge'
import { chains, tokens } from './data'
import { fromWei } from '../../helper/formatBalance'
import { formatBalance3 } from '../../utils/utils'
import { NameChainId } from '../../constant/web3'
import { addRPC } from '../../services/addRPC'
import { useWeb3React } from '@web3-react/core'

const ClaimToken = (props) => {
  const { claims, chainId, handleClaim } = props
  const { account } = useWeb3React()
  return (
    <>
      {claims.length > 0 && (
        <div className="claim-token">
          <div className="claim-token-title">CLAIM TOKENS</div>
          {claims.map((claim, index) => {
            let amount = fromWei(claim.amount.toString())
            let token = tokens.find((item) => item.tokenId === claim.tokenId.toString())
            let chain = chains.find((item) => item.network === Number(claim.toChain.toString()))
            return (
              <div key={index}>
                <div className="flex-between mb-5">
                  <div className="token-item">
                    <TokenBadge chain={chain.name} logo={token.icon} />
                    <span>{`${token.name} (${chain.name})`}</span>
                  </div>
                  <div className="claim-amount">{formatBalance3(amount)}</div>
                </div>
                {chain.network !== chainId ? (
                  <div className=" container-claim-btn switch-claim" onClick={() => addRPC(account, chain.network)}>
                    SWITCH TO {NameChainId[chain.network]}
                  </div>
                ) : (
                  <div
                    className="container-claim-btn claim-btn pointer"
                    style={{
                      pointerEvents: !!(Number(claim?.remainingBlock?.toString()) > 0) ? 'none' : 'auto',
                      opacity: !!(Number(claim?.remainingBlock?.toString()) > 0) ? 0.55 : 1
                    }}
                    onClick={() => handleClaim(claim, chain.network)}
                  >
                    <span> CLAIM &nbsp;</span>
                    {Number(claim?.remainingBlock?.toString()) > 0 && <span style={{ fontWeight: 'bold' }}>
                      {` (${Number(claim?.remainingBlock?.toString())} blocks left)`}
                    </span>}
                  </div>
                )}
                <div className="border-bottom-claim mb-20" />
              </div>
            )
          })}
          {/* <div className="desc-claim">
            <span className="blue-color opacity-1">
              Change to the destination Network
            </span>
            <span className="opacity-5">
              to claim your token on respective networks.
            </span>
          </div> */}
        </div>
      )}
    </>
  )
}

export default ClaimToken
