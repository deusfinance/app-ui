import useWeb3 from "./useWeb3";
import { useSetRecoilState } from "recoil";
import { blockState } from "../store/wallet";

export const useBlock = () => {
    const setBlock = useSetRecoilState(blockState)
    const web3 = useWeb3()
    if (!web3 || !web3.eth.subscribe) return
    web3.eth.subscribe('newBlockHeaders', (error, result) => {
        if (error) {
            console.log(error)
        } else {
            setBlock(result)
        }
    }
    )
}

