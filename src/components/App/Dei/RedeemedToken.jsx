import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components'
import ReactTooltip from "react-tooltip";
import {useRecoilValue} from 'recoil';
import {Flex, Text} from 'rebass/styled-components';
import { AlertCircle } from 'react-feather';
import DefaultLogo from '../../.../../../assets/images/empty-token.svg'
import {Base} from '../Button/index'
import {husdPoolDataState} from '../../../store/dei'
import {useClaimRedeemedTokens, useRedeemClaimTools} from '../../../hooks/useDei';
import useRefresh from "../../../hooks/useRefresh";
import {fromWei} from "../../../helper/formatBalance";
import {formatUnitAmount, handleSmallBalance} from "../../../utils/utils";

const SmallWrapper = styled.div`
    padding:0 20px;
    width: 560px;
    background: #0D0D0D;
    border: 1px solid #1C1C1C;
    border-radius: 15px;
    min-height: 85px;
    text-align:center;
    margin: 0 auto;
    width:100%;
    max-width:500px;
`

const MyText = styled(Text)`
    margin: 20px 0px;
    box-sizing: border-box;
    font-size: 12px;
    opacity: 0.75;
    display: flex;
`

const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => (theme)[color]};
  font-size: 16px;
  opacity: 0.75;
  text-align: left;
  margin-left: 7px;
`

const NumberWrapper = styled(Text)`
  color: ${({ color, theme }) => (theme)[color]};
  opacity: 0.75;
  font-size: 14px;
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TokenInfo = styled(Flex)`
  border-top: 1px solid ${({ theme }) => theme.bg5};
  padding: 12px 0px;
  align-items:center;
  background-color: #0D0D0D;
`

const StyledLogo = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  vertical-align: "middle";
`

const ClaimButton = styled.div`
  max-width: 297px;
  height: 24px;
  border-radius: 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 6px;
  line-height: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Monument Grotesk Semi";
  font-size: 14px;
  line-height: 17px;
  background-color: ${({ disabled }) => disabled ? "#333333" : "#325cfe" };
  color: #FFF;
  cursor: ${({ disabled }) => disabled ? null : "pointer" };
  padding: 15px 0px;
  width: 100px;
  margin-left: auto;
`

function CurrencyLogo({
  symbol,
  logo,
  size = '25px',
}) {
  return <StyledLogo size={size} src={logo || DefaultLogo} alt={`${symbol ?? 'token'} logo`} />
}

const ButtonSync = styled(Base).attrs({
  width: "100%",
  height: "36px",
  borderRadius: "10px",
  marginBottom: "20px",
})`
  font-size:20px;
`

const ButtonSyncActive = styled(ButtonSync)`
  background: ${({ theme }) => theme.sync_active};
  font-size: 25px;
  &:hover{
    filter:${({ active }) => active && "brightness(1.2)"};
  }
`

const IMG = <img src="/img/spinner.svg" width="20" height="20" alt="sp" />

const ClaimTokenRow = ({token, handleClaim, remainingWaitTime, amount, disabledTip, tipId, amountError}) => {

    const amountDisplay = useMemo(() => {
        if(!amount) return IMG
        return handleSmallBalance(amount, 3)
    }, [amount])

    return (
        <TokenInfo>

            <CurrencyLogo symbol={token.symbol} logo={token.logo}/>

            <TextWrapper color="text1"> {token.symbol} </TextWrapper>

            <NumberWrapper>
                {amountError ?
                    <AlertCircle color={"#ffe7a1"} size={'15px'} data-tip data-for={'amount-error-' + tipId} /> : amountDisplay}
            </NumberWrapper>
            <ClaimButton data-tip data-for={'disabled-tip-' + tipId} onClick={handleClaim} disabled={disabledTip}>
                {remainingWaitTime ?? 'Claim'}</ClaimButton>


            {amountError && <ReactTooltip id={'amount-error-' + tipId} place="bottom" effect="solid" type="info">
                <div>{amountError}</div>
            </ReactTooltip>}

            {disabledTip && <ReactTooltip id={'disabled-tip-' + tipId} place="bottom" effect="solid" type="info">
                <div>{disabledTip}</div>
            </ReactTooltip>}
        </TokenInfo>
    )
}

const CollateralClaim = ({ theCollateralToken, chainId }) => {
  const poolData = useRecoilValue(husdPoolDataState)
  const { fastRefresh } = useRefresh()
  const [remainingWaitTime, setRemainingWaitTime] = useState(null);
  const { onCollectCollateral } = useClaimRedeemedTokens(chainId)
  const { redeemCollateralBalances, diffTimeStampStr } = useRedeemClaimTools()
  const handleClaim = useCallback(async () => {
    if(!remainingWaitTime) {
      try {
        const tx = await onCollectCollateral()
        if (tx && tx.status) {
          console.log("claim did");
        } else {
          console.log("claim Failed");
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [onCollectCollateral, remainingWaitTime])

  useEffect(() => {
    if(poolData.allPositions?.length) {
      const lastReedemTimestamp = poolData.allPositions[poolData.allPositions.length - 1].timestamp.toNumber()
      setRemainingWaitTime(
          diffTimeStampStr(poolData.collateralRedemptionDelay, lastReedemTimestamp)
      )
    }
  }, [poolData, fastRefresh, diffTimeStampStr])

  const disabledTip = useMemo(() => {
      if(!!remainingWaitTime) {
          return "Wait until this time"
      }
      return ""
  }, [remainingWaitTime])

  return (
      <ClaimTokenRow
          disabledTip={disabledTip}
          token={theCollateralToken}
          handleClaim={handleClaim}
          remainingWaitTime={remainingWaitTime}
          amount={redeemCollateralBalances}
          amountError={null}
          tipId={0}
      />
  )
}

const PairClaim = ({ pairToken, chainId, index, position }) => {
    const poolData = useRecoilValue(husdPoolDataState)
    const { fastRefresh } = useRefresh()
    const [remainingWaitTime, setRemainingWaitTime] = useState(null);
    const { onCollectDeus } = useClaimRedeemedTokens(chainId)
    const { diffTimeStamp, diffTimeStampStr, nextRedeemId, getDeusTwapPrice } = useRedeemClaimTools()
    const handleClaim = useCallback(async () => {
        if(!remainingWaitTime && index === nextRedeemId) {
            try {
                const tx = await onCollectDeus(index)
                if (tx && tx.status) {
                    console.log("claim did");
                } else {
                    console.log("claim Failed");
                }
            } catch (e) {
                console.error(e)
            }
        }
    }, [onCollectDeus, remainingWaitTime])

    useEffect(() => {
        setRemainingWaitTime(
            diffTimeStampStr(poolData.deusRedemptionDelay, position.timestamp.toNumber())
        )
    }, [poolData, fastRefresh, diffTimeStampStr, position])

    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState("");
    useEffect(() => {
        let mounted = true
        const fun = async () => {
            const dollarAmount = fromWei(position.amount.toString(), pairToken?.decimals)

            const diffInSeconds = diffTimeStamp(poolData.deusRedemptionDelay, position.timestamp.toNumber())
            if(diffInSeconds > 0) {
                const dollarAmountString = handleSmallBalance(dollarAmount, 3, "$")
                if(mounted){
                    setAmountError(`${dollarAmountString} DEUS at claim time`)
                }
                return
            }

            if(mounted) {
                setAmountError("")
            }
            const deusTwapPrice = await getDeusTwapPrice(position.timestamp.toNumber())
            if(mounted) {
                setAmount(dollarAmount / deusTwapPrice)
            }
        }
        fun()
        return () => {
            mounted = false;
        };
    },[position, pairToken, fastRefresh])



    const disabledTip = useMemo(() => {
        if(!!remainingWaitTime) {
            return "Wait until this time"
        }
        if(index !== nextRedeemId) {
            return "First claim previous ones"
        }
        return ""
    }, [remainingWaitTime, nextRedeemId, index])

    return (
        <ClaimTokenRow
            disabledTip={disabledTip}
            token={pairToken}
            handleClaim={handleClaim}
            remainingWaitTime={remainingWaitTime}
            amount={amount}
            tipId={index + 1}
            amountError={amountError}
        />
    )
}

const RedeemedToken = ({ title, currencies, chainId }) => {
  const { collateralRedeemAvailable, redeemAvailable, pairTokenPositions, nextRedeemId } = useRedeemClaimTools()

  return (
      <>
        {redeemAvailable &&
            <SmallWrapper>
              <MyText> {title} </MyText>
              {collateralRedeemAvailable &&
                  <CollateralClaim
                      chainId={chainId}
                      theCollateralToken={currencies[0]}
                  />
              }
                {
                    pairTokenPositions && pairTokenPositions
                        .slice(nextRedeemId)
                        .map(
                            (pos, index) => (
                                <PairClaim
                                    key={index}
                                    chainId={chainId}
                                    pairToken={currencies[1]}
                                    index={index + nextRedeemId}
                                    position={pos}
                                />
                            )
                        )
                }


            </SmallWrapper>
        }
      </>
  );
}

export default RedeemedToken
