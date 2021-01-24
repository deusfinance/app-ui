import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { useWeb3React } from '@web3-react/core'

import { useMemo } from 'react'

export function useContract(address, ABI, withSigner = false) {
    const { library, account } = useWeb3React()
    return useMemo(
        () =>
            !!address && !!ABI && !!library
                ? new Contract(address, ABI, withSigner ? library.getSigner(account).connectUnchecked() : library)
                : undefined,
        [address, ABI, withSigner, library, account]
    )
}