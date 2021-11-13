import React, { useState, useEffect, useCallback } from 'react';
import BridgeBox from '../../components/Bridge/BridgeBox';
import ClaimToken from '../../components/Bridge/ClaimToken';
import Instruction from '../../components/Bridge/Instruction';
import BridgeAction from '../../components/App/Swap/SwapAction';
import { chains, tokens } from '../../components/Bridge/data'
import useTokenBalances from './../../components/Bridge/getBalances'
import TokenModal from '../../components/Bridge/TokenModal';
import { useWeb3React } from '@web3-react/core';
import { useDebounce } from '../../hooks/useDebounce';
import { useAllowance } from '../../hooks/useAllowance';
import useCorrectChain from '../../hooks/useCorrectChain';
import { BridgeTokens } from '../../constant/token'
import { useApprove } from '../../hooks/useApprove';
import BigNumber from 'bignumber.js';
import { BRIDGE_ADDRESS } from '../../constant/contracts';
import './bridge.css'
import Muon from 'muon'
import { handleClaim, useDeposit, useClaim } from '../../hooks/useBridge';
import { ChainId, NameChainId } from '../../constant/web3';
import { fromWei } from '../../helper/formatBalance';
import { getBridgeContract } from '../../helper/contractHelpers';
import { SendWithToast } from '../../helper/deiHelper';
import BridgeABI from '../../config/abi/BridgeABI.json'
import useWeb3 from '../../hooks/useWeb3';
import { formatBalance3 } from '../../utils/utils';


const Bridge = () => {
    const muon = new Muon(process.env.REACT_APP_MUON_NODE_GATEWAY)
    const { validNetworks, chainId } = useCorrectChain()
    const [syncChainId, setSyncChainId] = useState(chainId)
    const { account } = useWeb3React()
    const [open, setOpen] = useState(false)
    const [claims, setClaims] = useState([])
    const [tokenId, setTokenId] = useState('')
    const [tokenIndex, setTokenIndex] = useState(0)
    const [lock, setLock] = useState('')
    const [target, setTarget] = useState()
    const [selectedChain, setSelectedChain] = useState('')
    const [fetch, setFetch] = useState('')

    const [fastUpdate, setFastUpdate] = useState(0)

    const tokensBalance = useTokenBalances(chains, tokens, fetch)

    const [swapState, setSwapState] = useState({
        from: BridgeTokens[syncChainId][tokenIndex],
        to: BridgeTokens[syncChainId === ChainId.ETH ? ChainId.MATIC : ChainId.ETH][tokenIndex],
    })

    const [amountIn, setAmountIn] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500);

    const [amountOut, setAmountOut] = useState("")
    const contractAddress = BRIDGE_ADDRESS[syncChainId]
    // console.log(contractAddress, chainId, swapState);
    const allowance = useAllowance(swapState.from, contractAddress, syncChainId)


    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)

    useEffect(() => {
        setAmountOut(debouncedAmountIn ?? "")
    }, [debouncedAmountIn])

    useEffect(() => {
        if (amountIn === "")
            setAmountOut("")
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
    const { onClaim } = useClaim()

    useEffect(() => {
        const get = async () => {
            const claims = await onClaim()
            console.log("claims", claims);
            setClaims(claims)
        }
        get()
    }, [onClaim])

    const web3 = useWeb3()
    const handleClaim = async (claimTemp, network) => {
        const claim = {
            fromChain: claimTemp.fromChain.toString(),
            toChain: claimTemp.toChain.toString(),
            txId: claimTemp.txId.toString(),
            amount: claimTemp.amount.toString(),
            txBlockNo: claimTemp.txBlockNo.toString(),
            tokenId: claimTemp.tokenId.toString(),
        }

        console.log("claim = ", claim);

        try {
            if (
                chainId !== network ||
                (lock &&
                    lock.fromChain === claim.fromChain &&
                    lock.toChain === claim.toChain &&
                    lock.txId === claim.txId)
            ) {
                return
            }

            let amount = fromWei(claim.amount)
            let abi = [BridgeABI.find(({ name, type }) => name === 'getTx' && type === 'function')]
            let networkName = chains.find((item) => item.network === Number(claim.fromChain)).networkName
            console.log({
                address: BRIDGE_ADDRESS[Number(claim.fromChain)],
                method: 'getTx',
                params: [claim.txId],
                abi,
                network: networkName
            })
            const muonResponse = await muon
                .app('eth')
                .method('call', {
                    address: BRIDGE_ADDRESS[Number(claim.fromChain)],
                    method: 'getTx',
                    params: [claim.txId],
                    abi,
                    network: networkName,
                    hashTimestamp: false
                })
                .call()
            // console.log("muonResponse", muonResponse)
            let { sigs, reqId } = muonResponse
            let currentBlockNo = muonResponse.data.result.currentBlockNo
            setLock(claim)
            console.log("chainId = ", getBridgeContract[chainId]);
            const fn = getBridgeContract(web3, chainId).methods.claim(
                account,
                claim.amount,
                Number(claim.fromChain),
                Number(claim.toChain),
                claim.tokenId,
                currentBlockNo,
                claim.txBlockNo,
                claim.txId,
                reqId,
                sigs
            )
            SendWithToast(fn, account, chainId, `Claim ${formatBalance3(amount)}`).then(() => {
                setFetch(claim)
                setLock('')
            })
        } catch (error) {
            console.log('error happened in Claim', error)
        }
    }

    const handleOpenModal = (data, tokenId) => {
        setTarget(data)
        if (tokenId) {
            setTokenId(tokenId)
            setSelectedChain(swapState.from.chainId)
        }
        setOpen(true)
    }

    //TODO
    const changeToken = (token, chainId) => {
        const other = target === "from" ? "to" : "from"
        // console.log("changeToken ", target, token, chainId, token.Id);
        // console.log(BridgeTokens[swapState[other].chainId !== chainId ? chainId].filter((t) => t.id === token.id));
        setSwapState((prev) => ({
            [other]: BridgeTokens[prev[other].chainId === chainId ? chainId === 1 ? 137 : 1 : prev[other].chainId].filter(t => t.id === token.id)[0],
            [target]: { ...token }
        }))
    }


    const handleApprove = useCallback(async () => {
        try {
            setApproveLoading(true)
            const tx = await onApprove()
            if (tx.status) {
                setIsApproved(new BigNumber(tx.events.Approval.raw.data, 16).gt(0))
            } else {
                console.log("Approved Failed");
            }
            setApproveLoading(false)

        } catch (e) {
            setApproveLoading(false)
            console.error(e)
        }
    }, [onApprove])


    const handleSwap = useCallback(async () => {
        try {
            const tx = await onDeposit()
            if (tx.status) {
                console.log("swap did");
                setAmountIn("")
                setFastUpdate(fastUpdate => fastUpdate + 1)
            } else {
                console.log("Swap Failed");
            }
        } catch (e) {
            console.error(e)
        }
    }, [onDeposit])


    return (<div className="wrap-bridge">
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
                        title={"From " + NameChainId[swapState.from.chainId]}
                        currency={swapState.from}
                        {...swapState.from}
                        amount={amountIn}
                        setAmount={(data) => setAmountIn(data)}
                        max={true}
                        handleOpenModal={() => handleOpenModal('from')}
                    />

                    <div className="arrow pointer" onClick={undefined}>
                        <img src="/img/swap/swap-arrow.svg" alt="arrow" />
                    </div>
                    <BridgeBox
                        title={"To " + NameChainId[swapState.to.chainId]}
                        currency={swapState.to}
                        {...swapState.to}
                        amount={amountOut}
                        readonly={true}
                        handleOpenModal={() => handleOpenModal('to', swapState.from.tokenId)}
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
                    setTokenId('')
                    setSelectedChain('')
                }}
                changeToken={(token, chainId) => changeToken(token, chainId)}
            />
        </div>
        <div className="width-340">
            <ClaimToken
                claims={claims}
                chainId={chainId}
                setFetch={(data) => setFetch(data)}
                handleClaim={(claim, network) => handleClaim(claim, network)}
            />
        </div>
    </div>);
}

export default Bridge;