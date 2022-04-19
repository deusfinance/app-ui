import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components'
import DefaultLogo from '../../.../../../assets/images/empty-token.svg'
import {Flex, Text} from 'rebass/styled-components';
import {Base} from '../Button/index'
import {useRecoilValue} from 'recoil';
import {husdPoolDataState} from '../../../store/dei'
import {useClaimRedeemedTokens, useRedeemClaimTools} from '../../../hooks/useDei';
import useRefresh from "../../../hooks/useRefresh";
import {fromWei} from "../../../helper/formatBalance";
import {ToastTransaction} from "../../../utils/explorers";

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
  padding: 15px 0px;
  width: 100px;
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

const RedeemTokenRow = ({token, handleClaim, remainingWaitTime, amount}) => {
    return (
        <TokenInfo>
            <CurrencyLogo symbol={token.symbol} logo={token.logo}/>

            <TextWrapper color="text1" ml="7px" mr="9px"> {token.symbol} </TextWrapper>

            <NumberWrapper color="text1" ml="7px" mr="9px">
                {amount ? parseFloat(amount).toFixed(3) : IMG}
            </NumberWrapper>
            <ClaimButton onClick={handleClaim}>
                {remainingWaitTime ?? 'Claim'}</ClaimButton>

        </TokenInfo>
    )
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
  }, [onCollectCollateral, remainingWaitTime])

  useEffect(() => {
    if(poolData.allPositions?.length) {
      const lastReedemTimestamp = poolData.allPositions[poolData.allPositions.length - 1].timestamp.toNumber()
      setRemainingWaitTime(
          diffTimeStamp(poolData.collateralRedemptionDelay, lastReedemTimestamp)
      )
    }
  }, [poolData, fastRefresh, diffTimeStamp])

  return (
      <RedeemTokenRow
          token={theCollateralToken}
          handleClaim={handleClaim}
          remainingWaitTime={remainingWaitTime}
          amount={redeemCollateralBalances}
      />
  )
}

const PairRedeem = ({ pairToken, chainId, index, position }) => {
    const poolData = useRecoilValue(husdPoolDataState)
    const { fastRefresh } = useRefresh()
    const [remainingWaitTime, setRemainingWaitTime] = useState(null);
    const { onCollectDeus } = useClaimRedeemedTokens(chainId)
    const { diffTimeStamp, nextRedeemId } = useRedeemClaimTools()
    const handleClaim = useCallback(async () => {
        if(!remainingWaitTime) {
            if(index !== nextRedeemId) {
                ToastTransaction("info", "Redeem Failed.", "first claim previous ones")
                return
            }
            try {
                const tx = await onCollectDeus(index)
                if (tx.status) {
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
            diffTimeStamp(poolData.deusRedemptionDelay, position.timestamp.toNumber())
        )
    }, [poolData, fastRefresh, diffTimeStamp, position])
    const amount = useMemo(() => {
       return fromWei(position.amount.toString(), pairToken?.decimals)
    },
        [position, pairToken])
    return (
        <RedeemTokenRow
            token={pairToken}
            handleClaim={handleClaim}
            remainingWaitTime={remainingWaitTime}
            amount={amount}
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
                  <CollateralRedeem
                      chainId={chainId}
                      theCollateralToken={currencies[0]}
                  />
              }
                {
                    pairTokenPositions && pairTokenPositions.map(
                        (pos, index) => (
                            <>
                                {index >= nextRedeemId && <PairRedeem
                                    chainId={chainId}
                                    pairToken={currencies[1]}
                                    index={index}
                                    position={pos}
                                    />
                                }
                            </>
                        )
                    )
                }


            </SmallWrapper>
        }
      </>
  );
}

export default RedeemedToken
