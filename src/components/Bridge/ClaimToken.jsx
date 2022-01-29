import React from 'react'
import TokenBadge from './TokenBadge'
import { chains, tokens } from './data'
import { fromWei } from '../../helper/formatBalance'
import { formatBalance3 } from '../../utils/utils'
import { NameChainId } from '../../constant/web3'
import { addRPC } from '../../services/addRPC'
import { useWeb3React } from '@web3-react/core'
import { Type } from '../App/Text'
import { RowBetween, RowCenter } from '../App/Row/index';

const ClaimToken = (props) => {
  const { claims, chainId, handleClaim, claimsLoading } = props
  const { account } = useWeb3React()
  return (
    <>
      {claims.length > 0 && (
        <div className="claim-token">
          <RowBetween className="claim-token-title" alignItems={"center"}>
            <div >Claim Tokens</div>
            {claimsLoading && <img alt="sp" src="/img/spinner.svg" width="25" />}
          </RowBetween>

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
                    Switch to {NameChainId[chain.network]}
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
                    <span> Claim &nbsp;</span>
                    {Number(claim?.remainingBlock?.toString()) > 0 && <span style={{ fontWeight: 'bold' }}>
                      {` (${Number(claim?.remainingBlock?.toString())} blocks left)`}
                    </span>}
                  </div>
                )}
                <div className="border-bottom-claim mb-20" />
              </div>
            )
          })}
          <div className="desc-claim">
            <Type.XS>Updated every 30s.
              <br />
              *depending on RPC, this list may be incomplete*</Type.XS>
          </div>
        </div>
      )}
      {claims.length === 0 && <div className="claim-token" style={{ textAlign: "center" }}>
        <img style={{ margin: "0 auto 5px", }} alt="sp" src="/img/bridge/claim.svg" width="50" />
        <RowCenter style={{ alignItems: "center", height: "25px" }}>
          <Type.SM>nothing to claim yet</Type.SM>
          {claimsLoading && <img alt="sp" src="/img/spinner.svg" width="25" />}
        </RowCenter>
      </div>}
    </>
  )
}

export default ClaimToken
