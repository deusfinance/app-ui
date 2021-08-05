import { Interface } from '@ethersproject/abi'
import { getMultiCallContract } from './contractHelpers'

const multicall = async (web3, abi, calls, chainId) => {
    const multi = getMultiCallContract(web3, chainId)

    const itf = new Interface(abi)

    const calldata = calls.map((call) => [
        call.address.toLowerCase(),
        itf.encodeFunctionData(call.name, call.params),
    ])
    const { returnData } = await multi.methods.aggregate(calldata).call()
    const res = returnData.map((call, i) =>
        itf.decodeFunctionResult(calls[i].name, call)
    )

    return res
}

export { multicall }
export default multicall
