import useWeb3, { useCrossWeb3 } from './useWeb3'
import { useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import useRefresh from './useRefresh'
import { deposit, getClaimTokens } from '../helper/bridgeHelper'
import { SendWithToast } from '../helper/deiHelper'
import { fromWei } from '../helper/formatBalance'
import BridgeABI from '../config/abi/NewBridgeABI.json'
import { BRIDGE_ADDRESS } from '../constant/contracts'
import { ChainId, NameChainId } from '../constant/web3'
import { getBridgeContract } from '../helper/contractHelpers'
import { formatBalance3 } from '../utils/utils'


export const useGetNewClaim = () => {
    const { account } = useWeb3React()
    const { fastRefresh } = useRefresh()
    //idk why but it tried to use the same state twice
    // const web3s = {
    //     4: useCrossWeb3(4),
    //     97: useCrossWeb3(97)
    // }
    const ethWeb3 = useCrossWeb3(ChainId.ETH)
    const bscWeb3 = useCrossWeb3(ChainId.BSC)
    const rinkebyWeb3 = useCrossWeb3(ChainId.RINKEBY)
    const bscTestWeb3 = useCrossWeb3(ChainId.BSC_TESTNET)
    const ftmWeb3 = useCrossWeb3(ChainId.FTM)
    const polygonWeb3 = useCrossWeb3(ChainId.MATIC)
    const metisWeb3 = useCrossWeb3(ChainId.METIS)
    const arbiWeb3 = useCrossWeb3(ChainId.ARBITRUM)


    const web3s = {
        [ChainId.ETH]: ethWeb3,
        [ChainId.FTM]: ftmWeb3,
        [ChainId.MATIC]: polygonWeb3,
        [ChainId.BSC]: bscWeb3,
        [ChainId.METIS]: metisWeb3,
        [ChainId.ARBITRUM]: arbiWeb3,
        // [ChainId.RINKEBY]: rinkebyWeb3,
        // [ChainId.BSC_TESTNET]: bscTestWeb3,
    }

    const getClaim = useCallback(async () => {
        const networks = Object.keys(web3s)
        if (account && ethWeb3 && bscWeb3 && polygonWeb3 && ftmWeb3 && rinkebyWeb3 && bscTestWeb3) {
            try {
                return await getClaimTokens(networks, account, web3s)
            } catch (error) {
                console.log(error, 'getClaimTokens');
                return []
            }
        }
    }, [account, ethWeb3, bscWeb3, ftmWeb3, polygonWeb3, rinkebyWeb3, bscTestWeb3, fastRefresh]) // eslint-disable-line
    return { getClaim }
}


export const useClaim = (muon, lock, setLock, setFetch) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()

    const handleClaim = useCallback(async (claimTemp, network) => {
        const claim = {
            fromChain: claimTemp.fromChain.toString(),
            toChain: claimTemp.toChain.toString(),
            txId: claimTemp.txId.toString(),
            amount: claimTemp.amount.toString(),
            // txBlockNo: claimTemp.txBlockNo.toString(),
            tokenId: claimTemp.tokenId.toString(),
        }

        // console.log("claim = ", claim);

        if (
            chainId !== network || (lock &&
                lock.fromChain === claim.fromChain &&
                lock.toChain === claim.toChain &&
                lock.txId === claim.txId)
        ) {
            return
        }

        let amount = fromWei(claim.amount)
        let abi = [BridgeABI.find(({ name, type }) => name === 'getTx' && type === 'function')]
        const networkName = NameChainId[claim.fromChain].toLowerCase()
        console.log({
            address: BRIDGE_ADDRESS[Number(claim.fromChain)],
            method: 'getTx',
            params: [claim.txId],
            abi,
            network: networkName
        })

        try {
            // const muonResponse = await muon
            //     .app('eth')
            //     .method('call', {
            //         address: BRIDGE_ADDRESS[Number(claim.fromChain)],
            //         method: 'getTx',
            //         params: [claim.txId],
            //         abi,
            //         network: networkName,
            //         hashTimestamp: false
            //     })
            //     .call()
            const muonResponse = await muon
                .app('deus_bridge')
                .method('claim', {
                    depositAddress: BRIDGE_ADDRESS[Number(claim.fromChain)],
                    depositTxId: claim.txId,
                    depositNetwork: networkName
                })
                .call()
            console.log("muonResponse", muonResponse)
            console.log("res", muonResponse.data.result)
            let { sigs, reqId } = muonResponse
            // let currentBlockNo = muonResponse.data.result.currentBlockNo
            setLock(claim)
            console.log(account,
                claim.amount,
                Number(claim.fromChain),
                Number(claim.toChain),
                claim.tokenId,
                claim.txId,
                reqId,
                sigs);
            const fn = getBridgeContract(web3, chainId).methods.claim(
                account,
                claim.amount,
                Number(claim.fromChain),
                Number(claim.toChain),
                claim.tokenId,
                // currentBlockNo,
                // claim.txBlockNo,
                claim.txId,
                reqId,
                sigs
            )
            //TODO find token with id
            SendWithToast(fn, account, chainId, `Claim ${formatBalance3(amount)}`).then(() => {
                setFetch(claim)
                setLock('')
            })
        } catch (error) {
            console.log('error happened in Claim', error)
        }

    }, [lock, setLock, setFetch, muon, account, web3, chainId])
    return { handleClaim }
}

export const useDeposit = (amount, swapState) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()
    const onDeposit = useCallback(async () => {
        // console.log(amount, swapState);
        if (chainId !== swapState.from.chainId || !swapState.to.chainId || !account || amount === '0' || amount === '') return

        try {
            const fn = deposit(amount, swapState.from, swapState.to, web3, account)
            return await SendWithToast(fn, account, chainId, `Deposit ${amount} ${swapState.from.symbol}`)
        } catch (error) {
            console.log("error happened at useDeposit");
        }
    }, [amount, swapState, web3, account, chainId])
    return { onDeposit }
}
