import { isAddress } from "@ethersproject/address";
import { useMemo } from "react";
import { getERC20Contract } from "../helper/contractHelpers";
import useWeb3 from "./useWeb3";

export const useERC20 = (address) => {
  const web3 = useWeb3();
  return useMemo(() => {
    if (!isAddress(address)) return null;
    return getERC20Contract(address, web3);
  }, [address, web3]);
};

export const useCrossERC20 = (address, web3) => {
  return useMemo(() => {
    if (!isAddress(address)) return null;
    return getERC20Contract(address, web3);
  }, [address, web3]);
};
