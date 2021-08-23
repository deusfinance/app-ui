import { Type } from "../../components/App/Text";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MainWrapper, SwapWrapper } from "../../components/App/Swap";
import TokenBox from "../../components/App/NFT/TokenBox";
import SwapAction from "../../components/App/NFT/SwapAction";
import { MMDToken } from "../../constant/token";
import useChain from "../../hooks/useChain";
import { useSwap } from "../../hooks/useMigrator";
import { useApprove } from "../../hooks/useApprove";
import { useAllowance } from "../../hooks/useAllowance";
import { LOCKER_ADDRESS } from "../../constant/contracts";
import { useWeb3React } from "@web3-react/core";
// import { DefaultTokens } from '../../constant/token';
// import useTokenBalances from '../../hooks/useTokenBalances';
// import SearchBox from '../../components/App/Swap/SearchBox';

const Migrator = () => {
  const validNetworks = [4];
  const chainId = useChain(validNetworks);
  const contractAddress = LOCKER_ADDRESS[chainId];
  const allowance = useAllowance(MMDToken, contractAddress, chainId);
  const { account } = useWeb3React();
  const [activeSearchBox, setActiveSearchBox] = useState(false)

  const [amountIn, setAmountIn] = useState("");
  const [fastUpdate, setFastUpdate] = useState(0);
  const [focusType, setFocusType] = useState("from");
  const [isApproved, setIsApproved] = useState(null);
  const [isPreApproved, setIsPreApproved] = useState(null);
  const [approveLoading, setApproveLoading] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);

  useEffect(() => {
      setIsPreApproved(null)
      setIsApproved(null)
  }, [chainId, account, MMDToken]);

  useEffect(() => {
    if (isPreApproved == null) {
      if (allowance.toString() === "-1") {
        setIsPreApproved(null); //doNothing
      } else {
        if (allowance.gt(0)) {
          setIsPreApproved(true);
        } else {
          setIsPreApproved(false);
        }
      }
    } else {
      if (allowance.gt(0)) {
        setIsApproved(true);
      }
    }
    //eslint-disable-next-line
  }, [allowance]); //isPreApproved ?

  const { onApprove } = useApprove(MMDToken, contractAddress, chainId);
  const { onSwap } = useSwap(MMDToken, amountIn, chainId);

  const handleApprove = useCallback(async () => {
    try {
      setApproveLoading(true);
      const tx = await onApprove();
      if (tx.status) {
        console.log("Approved");
      } else {
        console.log("Approve Failed");
      }
      setApproveLoading(false);
    } catch (e) {
      setApproveLoading(false);
      console.error(e);
    }
  }, [onApprove]);

  const handleSwap = useCallback(async () => {
    setSwapLoading(true);
    try {
      const tx = await onSwap();
      setSwapLoading(false);
      if (tx.status) {
        console.log("swap did");
        setAmountIn("");
        setFastUpdate((fastUpdate) => fastUpdate + 1);
      } else {
        console.log("Swap Failed");
      }
    } catch (e) {
      console.error(e);
      setSwapLoading(false);
    }
  }, [onSwap]);

  return (<>
    <MainWrapper>
      <Type.XL fontWeight="300"> Migrator </Type.XL>

      <SwapWrapper style={{ marginTop: "25px" }}>
        <TokenBox
          type="from"
          hasMax={true}
          inputAmount={amountIn}
          setInputAmount={setAmountIn}
          focusType="from"
          setFocusType={setFocusType}
          currency={MMDToken}
          fastUpdate={fastUpdate}
        />

        <SwapAction
          bgColor={"grad_dei"}
          text="LOCK"
          isPreApproved={isPreApproved}
          validNetworks={validNetworks}
          isApproved={isApproved}
          targetToken={MMDToken}
          loading={approveLoading}
          swapLoading={swapLoading}
          handleApprove={handleApprove}
          handleSwap={handleSwap}
          amountIn={amountIn}
        />
      </SwapWrapper>
    </MainWrapper>
    </>
  );
};;

export default Migrator;
