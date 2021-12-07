import { useLocation } from 'react-router'
import { getCorrectChains } from '../constant/correctChain'
import useChain from './useChain'

const useCorrectChain = () => {
    const location = useLocation()
    let validNetworks = getCorrectChains(location.pathname)
    validNetworks = validNetworks.filter((a) => a);
    const chainId = useChain(validNetworks)
    return { validNetworks, chainId }
}

export default useCorrectChain