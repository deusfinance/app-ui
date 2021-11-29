import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components'
import DefaultLogo from '../../.../../../assets/images/empty-token.svg'
import { Flex, Text } from 'rebass/styled-components';
import { Base } from '../Button/index'
import { useRecoilValue } from 'recoil';
import { husdPoolDataState } from '../../../store/dei'
import { isGt } from '../../../constant/number';
import { useClaimAll } from '../../../hooks/useDei';

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

const RedeemedToken = ({ title, currencies, chainId }) => {
  let poolData = useRecoilValue(husdPoolDataState)
  const redeemCollateralBalances = poolData ? poolData["redeemCollateralBalances"] : null
  const redeemDEUSBalances = poolData ? poolData["redeemDEUSBalances"] : null

  const { onClaimAll } = useClaimAll(chainId)

  const handleClaim = useCallback(async () => {
    try {
      const tx = await onClaimAll()
      if (tx.status) {
        console.log("claim did");
      } else {
        console.log("claim Failed");
      }
    } catch (e) {
      console.error(e)
    }
  }, [onClaimAll])

  return (
    useMemo(() => {
      return <>
        {(redeemCollateralBalances && redeemDEUSBalances && (isGt(redeemCollateralBalances, 0) || isGt(redeemDEUSBalances, 0))) && <SmallWrapper>
          <MyText> {title} </MyText>
          {currencies.map(({ symbol, logo }, index) => {
            return <TokenInfo key={index + logo}>
              <CurrencyLogo symbol={symbol} logo={logo} />

              <TextWrapper color="text1" ml="7px" mr="9px"> {symbol} </TextWrapper>

              <NumberWrapper color="text1" ml="7px" mr="9px">
                {index === 0 ? redeemCollateralBalances ? parseFloat(redeemCollateralBalances).toFixed(3) : IMG : redeemDEUSBalances ? parseFloat(redeemDEUSBalances).toFixed(3) : IMG}
              </NumberWrapper>

            </TokenInfo>
          })}

          <ButtonSwap active={true} bgColor={"grad_dei"} onClick={handleClaim}> CLAIM ALL </ButtonSwap>
        </SmallWrapper>}
      </>
    }, [title, currencies, redeemCollateralBalances, redeemDEUSBalances, handleClaim])
  );
}

export default RedeemedToken
