import { useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useVeDEUS } from "./useContract";
import BigNumber from "bignumber.js";
import { isZero } from "../constant/number";
import { getToWei } from '../helper/formatBalance';

export const useLock = (amount, unlockTime, lockedEnd) => {
    const { account } = useWeb3React();
    const xlqdrContract = useVeDEUS();
    const [isLoading, setIsLoading] = useState(false);

    const onCreateLock = useCallback(async () => {
        try {
            console.log({ amount, unlockTime });

            if (!amount || isZero(amount)) return;
            setIsLoading(true);
            const tx = await xlqdrContract.methods
                .create_lock(
                    getToWei(amount).toFixed(0),
                    unlockTime
                )
                .send({ from: account });
            setIsLoading(false);
            return tx;
        } catch (e) {
            console.log(e);
            setIsLoading(false);
            return false;
        }
    }, [account, xlqdrContract, amount, unlockTime]);

    const onIncreaseAmount = useCallback(async () => {
        try {
            if (!amount || amount.isZero()) return;
            setIsLoading(true);
            const tx = await xlqdrContract.methods
                .increase_amount(new BigNumber(amount).times(1e18).toString(10))
                .send({ from: account });
            setIsLoading(false);
            return tx;
        } catch (e) {
            setIsLoading(false);
            return false;
        }
    }, [account, xlqdrContract, amount]);

    const onIncreaseUnlockTime = useCallback(async () => {
        try {
            if (lockedEnd >= unlockTime) return;
            setIsLoading(true);
            console.log({ unlockTime });
            const tx = await xlqdrContract.methods
                .increase_unlock_time(unlockTime)
                .send({ from: account });
            setIsLoading(false);
            return tx;
        } catch (e) {
            setIsLoading(false);
            return false;
        }
    }, [account, xlqdrContract, unlockTime, lockedEnd]);

    const onWithdraw = useCallback(async () => {
        try {
            setIsLoading(true);
            const tx = await xlqdrContract.methods.withdraw().send({ from: account });
            setIsLoading(false);
            return tx;
        } catch (e) {
            setIsLoading(false);
            return false;
        }
    }, [account, xlqdrContract]);

    return {
        isLoading,
        onCreateLock,
        onIncreaseAmount,
        onIncreaseUnlockTime,
        onWithdraw,
    };
};
