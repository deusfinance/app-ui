import { useContext } from 'react'
import { RefreshContext } from '../context/RefreshContext'

const useRefresh = () => {
    const { fast, slow, rapid } = useContext(RefreshContext)
    return { fastRefresh: fast, slowRefresh: slow, rapidRefresh: rapid }
}

export default useRefresh