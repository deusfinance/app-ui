import { useEffect, useState, useRef } from 'react'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { getWeb3NoAccount, getWeb3CrossChainNoAccount } from './web3'

const useWeb3 = () => {
    const { library } = useWeb3React()
    const refEth = useRef(library)
    const [web3, setweb3] = useState(library ? new Web3(library) : getWeb3NoAccount())

    useEffect(() => {
        if (library !== refEth.current) {
            setweb3(library ? new Web3(library) : getWeb3NoAccount())
            refEth.current = library
        }
    }, [library])

    return web3
}

export const useCrossWeb3 = (targetChainId) => {
    const { library, chainId } = useWeb3React()
    const [web3, setweb3] = useState(library && chainId === targetChainId ? new Web3(library) : getWeb3CrossChainNoAccount(targetChainId))

    useEffect(() => {
        setweb3(library && chainId === targetChainId ? new Web3(library) : getWeb3CrossChainNoAccount(targetChainId))
    }, [chainId, library, targetChainId])

    return web3
}

export default useWeb3