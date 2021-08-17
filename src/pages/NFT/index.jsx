import { Type } from "../../components/App/Text";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MainWrapper, SwapWrapper } from "../../components/App/Swap";
import TokenBox from "../../components/App/NFT/TokenBox";
import SwapAction from "../../components/App/NFT/SwapAction";
import { MainTokens } from "../../constant/token";
import useChain from "../../hooks/useChain";
import { useMint } from "../../hooks/useDei";
import { useApprove } from "../../hooks/useApprove";
import { useAllowance } from "../../hooks/useDei";
import { HUSD_POOL_ADDRESS } from "../../constant/contracts";

const NFT = () => {
  const deaToken = MainTokens[1];
  const validNetworks = [1];
  const chainId = useChain(validNetworks);
  const contractAddress = HUSD_POOL_ADDRESS[chainId];

  const [amountIn, setAmountIn] = useState("");
  const [fastUpdate, setFastUpdate] = useState(0);
  const [focusType, setFocusType] = useState("from");
  const [isApproved, setIsApproved] = useState(null);
  const [isPreApproved, setIsPreApproved] = useState(null);
  const [approveLoading, setApproveLoading] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);

    const { onApprove } = useApprove(deaToken, contractAddress, chainId);
    const { onMint } = useMint();

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
      const tx = await onMint();
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
  }, [onMint]);

  return (
    <MainWrapper>
      <Type.XL fontWeight="300"> NFT </Type.XL>
      <Type.MD fontWeight="300"> Place you bid here </Type.MD>

      <SwapWrapper style={{ marginTop: "25px" }}>
        <TokenBox
          type="from"
          hasMax={true}
          inputAmount={amountIn}
          setInputAmount={setAmountIn}
          focusType="from"
          setFocusType={setFocusType}
          currency={deaToken}
          fastUpdate={fastUpdate}
        />

        <SwapAction
          bgColor={"grad_dei"}
          text="PLACE BID"
          isPreApproved={isPreApproved}
          validNetworks={validNetworks}
          isApproved={isApproved}
          targetToken={deaToken}
          loading={approveLoading}
          swapLoading={swapLoading}
          handleApprove={handleApprove}
          handleSwap={handleSwap}
        //   TokensMap={TokensMap}
        //   swapState={swapState}
          amountIn={amountIn}
        //   amountOut={amountOut}
        />
      </SwapWrapper>
    </MainWrapper>
  );
};

export default NFT;
