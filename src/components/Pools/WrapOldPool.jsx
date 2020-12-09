import React from 'react';
import { useWeb3React } from '@web3-react/core';


const PoolsContainer = React.lazy(() => import('./PoolsContainer'));



const WrapOldPool = ({ cweb }) => {
    const Web3React = useWeb3React()
    const { account } = Web3React
    // const [temp, setter] = useState(account)
    // const [addr, setAddr] = useState(account)
    // setAccount(Web3React.account)

    console.log("current is ", account);

    // useEffect(() => {
    //     // console.log(account);
    //     setAddr(account)
    //     console.log("changed  ", account);
    // }, [account])

    return (<PoolsContainer account={account} />);
}

export default WrapOldPool;