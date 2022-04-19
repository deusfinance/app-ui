import React, {useMemo, useCallback, useState, useEffect} from 'react';
import styled from 'styled-components'
import DefaultLogo from '../../.../../../assets/images/empty-token.svg'
import { Flex, Text } from 'rebass/styled-components';
import { Base } from '../Button/index'
import { useRecoilValue } from 'recoil';
import { husdPoolDataState } from '../../../store/dei'
import { isGt } from '../../../constant/number';
import { useClaimRedeemedTokens } from '../../../hooks/useDei';
import {collateralToken, deusToken} from "../../../constant/token";
import useRefresh from "../../../hooks/useRefresh";
import timestamp from "muon";

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
    margin-top: 20px;
    box-sizing: border-box;
    font-size: 12px;
    opacity: 0.75;
    display: flex;
`

const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => (theme)[color]};
  font-size: 16px;
  opacity: 0.75;
`

const NumberWrapper = styled(Text)`
  color: ${({ color, theme }) => (theme)[color]};
  opacity: 0.75;
  font-size: 14px;
  margin-left: auto;
`

const TokenInfo = styled(Flex)`
    margin: 12px auto;
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
  margin: 15px 0 20px;
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
  padding: 0 3px;
  font-family: "Monument Grotesk Semi";
  font-size: 14px;
  line-height: 17px;
  background-color: #325cfe;
  color: #FFF;
  cursor: pointer;
  padding: 15px 20px;
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

const ButtonSwap = styled(ButtonSyncActive)`
  background: ${({ theme, bgColor }) => bgColor ? theme[bgColor] : theme.grad3};
  color: ${({ theme }) => theme.text1_2};
  font-size:${({ fontSize }) => fontSize || "15px"};
`

const IMG = <img src="/img/spinner.svg" width="20" height="20" alt="sp" />

const useRedeemClaimTools = () => {
  const poolData = useRecoilValue(husdPoolDataState)
  const redeemCollateralBalances = poolData ? poolData["redeemCollateralBalances"] : null

  const diffTimeStamp = useCallback(
      (redemptionDelay, timestampInSec) => {
        const timestamp = new Date() / 1000
        const diffInSec = redemptionDelay - (timestamp - timestampInSec)
        const toTwoDigitNumber = (num) => {
          let numStr = String(num)
          if(numStr.length >= 2) {
            return numStr
          }
          else return `0${numStr}`
        }
        if(diffInSec > 0) {
          const minutes = toTwoDigitNumber(Math.floor(diffInSec / 60))
          const seconds = toTwoDigitNumber(Math.ceil(diffInSec % 60))
          return toTwoDigitNumber(`${minutes}:${seconds}`)
        }
        return null
      },[],
  );

  const collateralRedeemAvailabe = useMemo(() => {
    return redeemCollateralBalances && isGt(redeemCollateralBalances, 0)
  }, [redeemCollateralBalances])

  const redeemAvailabe = useMemo(() => {
    return collateralRedeemAvailabe
  }, [collateralRedeemAvailabe])

  return {redeemCollateralBalances, diffTimeStamp, collateralRedeemAvailabe, redeemAvailabe  }
}

const CollateralRedeem = ({ theCollateralToken, chainId }) => {
  const poolData = useRecoilValue(husdPoolDataState)
  const { fastRefresh } = useRefresh()
  const [remainingWaitTime, setRemainingWaitTime] = useState(null);
  const { onCollectCollateral } = useClaimRedeemedTokens(chainId)
  const { redeemCollateralBalances, diffTimeStamp } = useRedeemClaimTools()
  const handleClaim = useCallback(async () => {
    if(!remainingWaitTime) {
      try {
        const tx = await onCollectCollateral()
        if (tx.status) {
          console.log("claim did");
        } else {
          console.log("claim Failed");
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [onCollectCollateral])

  useEffect(() => {
    if(poolData.allPositions?.length) {
      const lastReedemTimestamp = poolData.allPositions[poolData.allPositions.length - 1].timestamp.toNumber()
      setRemainingWaitTime(
          diffTimeStamp(poolData.collateralRedemptionDelay, lastReedemTimestamp)
      )
    }
  }, [poolData, fastRefresh])

  return (
      <TokenInfo>
        <CurrencyLogo symbol={theCollateralToken.symbol} logo={theCollateralToken.logo}/>

        <TextWrapper color="text1" ml="7px" mr="9px"> {theCollateralToken.symbol} </TextWrapper>

        <NumberWrapper color="text1" ml="7px" mr="9px">
          {redeemCollateralBalances ? parseFloat(redeemCollateralBalances).toFixed(3) : IMG}
        </NumberWrapper>
        <ClaimButton onClick={handleClaim}>
          {remainingWaitTime ?? 'Claim'}</ClaimButton>

      </TokenInfo>
  )
}

const RedeemedToken = ({ title, currencies, chainId }) => {
  const { collateralRedeemAvailabe, redeemAvailabe } = useRedeemClaimTools()


  return (
    useMemo(() => {
      return <>
        {redeemAvailabe &&
            <SmallWrapper>
              <MyText> {title} </MyText>
              {collateralRedeemAvailabe &&
                  <CollateralRedeem
                      chainId={chainId}
                      theCollateralToken={currencies[0]}
                  />
              }
            </SmallWrapper>
        }
      </>
    }, [title, currencies])
  );
}

export default RedeemedToken
