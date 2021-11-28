import { useLocation } from 'react-router'
import { getCorrectChains } from '../constant/correctChain'
import useChain from './useChain'

const useCorrectChain = () => {
    const location = useLocation()
    const validNetworks = getCorrectChains(location.pathname)
    const chainId = useChain(validNetworks)
    return { validNetworks, chainId }
}

export default useCorrectChain