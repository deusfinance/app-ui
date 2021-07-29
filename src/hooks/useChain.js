import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

const useChain = (defaultChains = []) => {
    const { chainId } = useWeb3React()
    const isChain = defaultChains.indexOf(chainId) !== -1
    const [validChain, setValidChain] = useState(isChain ? chainId : defaultChains[0])
    useEffect(() => {
        if (!chainId) setValidChain(defaultChains[0])
        else {
            if (defaultChains.indexOf(chainId) !== -1) {
                setValidChain(chainId)
            } else {
                setValidChain(defaultChains[0])
            }
        }
    }, [chainId, defaultChains])

    return validChain
}

export default useChain