import React from 'react'
import styled from 'styled-components'

import DefaultLogo from '../../.../../../assets/images/empty-token.svg'
// import EthereumLogo from '../../.../assets/images/ethereum-logo.svg'
// import useHttpLocations from '../../hooks/useHttpLocations'
// import { WrappedTokenInfo } from '../../state/lists/hooks'

// export const getTokenLogoURL = (address) =>
//     `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`

const StyledLogo = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
`


// const StyledLogo = styled(StyledDefaultLogo)`
//   background-color: ${({ theme }) => theme.white};
// `

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}) {
  // const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  // const srcs = useMemo(() => {
  //     if (currency === ETHER) return []

  //     if (currency instanceof Token) {
  //         if (currency instanceof WrappedTokenInfo) {
  //             return [...uriLocations, getTokenLogoURL(currency.address)]
  //         }
  //         return [getTokenLogoURL(currency.address)]
  //     }
  //     return []
  // }, [currency, uriLocations])

  // if (currency === ETHER) {
  //     return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  // }

  return <StyledLogo size={size} src={currency?.logo || DefaultLogo} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}