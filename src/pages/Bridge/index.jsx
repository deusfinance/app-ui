import React, { useState, useEffect, useCallback } from "react"
import BridgeBox from "../../components/Bridge/BridgeBox"
import ClaimToken from "../../components/Bridge/ClaimToken"
import Instruction from "../../components/Bridge/Instruction"
import BridgeAction from "../../components/App/Swap/SwapAction"
import { chains, tokens } from "../../components/Bridge/data"
import useTokenBalances from "./../../components/Bridge/getBalances"
import TokenModal from "../../components/Bridge/TokenModal"
import { useWeb3React } from "@web3-react/core"
import { useDebounce } from "../../hooks/useDebounce"
import { useAllowance } from "../../hooks/useAllowance"
import useCorrectChain from "../../hooks/useCorrectChain"
import { BridgeTokens } from "../../constant/token"
import { useApprove } from "../../hooks/useApprove"
import BigNumber from "bignumber.js"
import { BRIDGE_ADDRESS } from "../../constant/contracts"
import { useClaim, useDeposit, useGetNewClaim } from "../../hooks/useBridge"
import { NameChainId } from "../../constant/web3"
import "./bridge.css"
import { muonClient } from "../../constant/clients"

const Bridge = () => {
  const { validNetworks, chainId } = useCorrectChain()
  const [syncChainId, setSyncChainId] = useState(chainId)
  const { account } = useWeb3React()
  const [open, setOpen] = useState(false)
  const [claims, setClaims] = useState([])
  const [claimsLoading, setClaimsLoading] = useState(true)
  const [claimingIndex, setClaimingIndex] = useState(null)

  const [tokenId, setTokenId] = useState("")
  const [lock, setLock] = useState("")
  const [target, setTarget] = useState()
  const [selectedChain, setSelectedChain] = useState("")
  // const [fetch, setFetch] = useState('')

  const [fastUpdate, setFastUpdate] = useState(0)

  const tokensBalance = useTokenBalances(chains, tokens, fetch)

  const getAnotherChainId = (myChainId) => {
    let residualChains = validNetworks.filter((a) => a !== myChainId)
    return residualChains[0]
  }

  const tokenIndex = 0
  const [swapState, setSwapState] = useState({
    from: BridgeTokens[syncChainId][tokenIndex],
    to: BridgeTokens[getAnotherChainId(syncChainId)][tokenIndex],
  })

  const [amountIn, setAmountIn] = useState("")
  const debouncedAmountIn = useDebounce(amountIn, 500)

  const [amountOut, setAmountOut] = useState("")
  const contractAddress = BRIDGE_ADDRESS[syncChainId]
  const allowance = useAllowance(swapState.from, contractAddress, syncChainId)

  const [isApproved, setIsApproved] = useState(null)
  const [isPreApproved, setIsPreApproved] = useState(null)
  const [approveLoading, setApproveLoading] = useState(false)

  useEffect(() => {
    setAmountOut(debouncedAmountIn ?? "")
  }, [debouncedAmountIn])

  useEffect(() => {
    if (amountIn === "") setAmountOut("")
  }, [amountIn])

  useEffect(() => {
    if (syncChainId !== swapState.from.chainId)
      setSyncChainId(swapState.from.chainId)
  }, [swapState.from.chainId, syncChainId])

  useEffect(() => {
    setIsPreApproved(null)
    setIsApproved(null)
  }, [swapState.from])

  useEffect(() => {
    if (isPreApproved == null) {
      if (allowance.toString() === "-1") {
        setIsPreApproved(null) //doNothing
      } else {
        if (allowance.gt(0)) {
          setIsPreApproved(true)
        } else {
          setIsPreApproved(false)
        }
      }
    } else {
      if (allowance.gt(0)) {
        setIsApproved(true)
      }
    }
    //eslint-disable-next-line
  }, [allowance]) //isPreApproved ?

  const { onApprove } = useApprove(swapState.from, contractAddress, chainId)
  const { onDeposit } = useDeposit(amountIn, swapState)
  const { getClaim } = useGetNewClaim()
  const { handleClaim } = useClaim(muonClient, lock, setLock)

  useEffect(() => {
    setClaimsLoading(true)
    setClaims([])
  }, [account])

  useEffect(() => {
    const get = async () => {
      setClaimsLoading(true)
      const claims = await getClaim()
      setClaims(claims)
      setClaimsLoading(false)
    }
    if (account) {
      get()
    }
  }, [getClaim, fastUpdate, account])

  const handleOpenModal = (data, tokenId) => {
    setTarget(data)
    if (tokenId) {
      setTokenId(tokenId)
      setSelectedChain(swapState.from.chainId)
    }
    setOpen(true)
  }

  const changeToken = (token, chainId) => {
    const other = target === "from" ? "to" : "from"
    setSwapState((prev) => ({
      [target]: { ...token },
      [other]: BridgeTokens[
        prev[other].chainId === chainId
          ? getAnotherChainId(chainId)
          : prev[other].chainId
      ].filter((t) => t.id === token.id)[0],
    }))
  }

  const swapTokensPosition = () => {
    setSwapState({ from: swapState.to, to: swapState.from })
    setAmountOut("")
    setAmountIn("")
  }

  const handleApprove = useCallback(async () => {
    try {
      setApproveLoading(true)
      const tx = await onApprove()
      if (tx.status) {
        setIsApproved(new BigNumber(tx.events.Approval.raw.data, 16).gt(0))
      } else {
        console.log("Approved Failed")
      }
      setApproveLoading(false)
    } catch (e) {
      setApproveLoading(false)
      console.error(e)
    }
  }, [onApprove])

  const handleClaimToken = useCallback(
    async (claim, network) => {
      try {
        setApproveLoading(true)
        const tx = await handleClaim(claim, network)
        if (!tx.status) {
          console.log("Claim Failed")
        }
        setClaimingIndex(null)
      } catch (e) {
        setClaimingIndex(false)
        console.error(e)
      }
    },
    [handleClaim]
  )

  const handleSwap = useCallback(async () => {
    try {
      const tx = await onDeposit()
      if (tx.status) {
        // console.log("swap did");
        setAmountIn("")
        setFastUpdate((fastUpdate) => fastUpdate + 1)
      } else {
        console.log("Swap Failed")
      }
    } catch (e) {
      console.error(e)
    }
  }, [onDeposit])

  return (
    <div className="wrap-bridge">
      <div className="width-340">
        <Instruction />
      </div>

      <div className="container-bridge">
        <div className="bridge-title">
          <h1>DEUS Bridge</h1>
        </div>
        <h3>Secured by Muon</h3>

        <div className="wrap-bridge-box">
          <div className="relative">
            <BridgeBox
              title={
                <div>
                  From{" "}
                  <span
                    style={{ padding: "2px 4px", borderRadius: "4px" }}
                    className={`badge-${NameChainId[swapState.from.chainId]}`}
                  >
                    {NameChainId[swapState.from.chainId]}
                  </span>
                </div>
              }
              currency={swapState.from}
              {...swapState.from}
              amount={amountIn}
              setAmount={(data) => setAmountIn(data)}
              max={true}
              handleOpenModal={() => handleOpenModal("from")}
            />

            <div className="arrow pointer" onClick={() => swapTokensPosition()}>
              <img src="/img/swap/swap-arrow.svg" alt="arrow" />
            </div>

            <BridgeBox
              title={
                <div>
                  To{" "}
                  <span
                    style={{ padding: "2px 4px", borderRadius: "4px" }}
                    className={`badge-${NameChainId[swapState.to.chainId]}`}
                  >
                    {NameChainId[swapState.to.chainId]}
                  </span>
                </div>
              }
              currency={swapState.to}
              {...swapState.to}
              amount={amountOut}
              readonly={true}
              handleOpenModal={() =>
                handleOpenModal("to", swapState.from.tokenId)
              }
            />
          </div>
          <BridgeAction
            text="DEPOSIT"
            bgColor="bg_bridge"
            txColor="text1"
            isPreApproved={isPreApproved}
            validNetworks={validNetworks}
            validNetwork={syncChainId}
            isApproved={isApproved}
            loading={approveLoading}
            handleApprove={handleApprove}
            handleSwap={handleSwap}
            TokensMap={null}
            swapState={swapState}
            amountIn={amountIn}
            amountOut={amountOut}
          />
        </div>

        <TokenModal
          tokens={tokensBalance}
          open={open}
          tokenId={tokenId}
          selectedChain={selectedChain}
          hide={() => {
            setOpen(!open)
            setTokenId("")
            setSelectedChain("")
          }}
          changeToken={(token, chainId) => changeToken(token, chainId)}
        />
      </div>
      {account && (
        <div className="width-340">
          <ClaimToken
            claims={claims}
            chainId={chainId}
            claimsLoading={claimsLoading}
            // setFetch={(data) => setFetch(data)}
            handleClaim={(claim, network) => handleClaimToken(claim, network)}
            claimingIndex={claimingIndex}
            setClaimingIndex={setClaimingIndex}
          />
        </div>
      )}
    </div>
  )
}

export default Bridge
