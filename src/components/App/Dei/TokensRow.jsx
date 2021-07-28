import React, { useMemo, Children } from 'react';
import styled from 'styled-components'
import { Type } from '../Text';
import { RowBetween } from '../Row';
import CircleToken from '../../../assets/images/circle-token.svg'
import { StyledLogo } from '../Currency';
import { FlexCenter } from '../Container';
import { formatBalance3 } from '../../../utils/utils';
import { isZero } from '../../../constant/number';


const TokenRow = styled(RowBetween)`
padding:0 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
     padding:0 10px;
  `}
`

const TokenRowContainer = styled.div`
  margin-top:22px;
    :hover{
        cursor:pointer;
        background : #292929;
    }
`
const TokenWrap = styled(FlexCenter)`
    margin:7.5px 0;
`

const TokensRow = ({ tokens, currencies, account, handleClick, disableLoading }) => {
    return (useMemo(() => {
        return <TokenRowContainer onClick={handleClick} >
            {Children.toArray(tokens.map((token, index) => {
                const address = token.address
                const addressBalance = address.length > 42 ? address.substring(0, 42) : address.length < 10 ? "0x" : address
                const isPlus = tokens.length > 1 && index !== tokens.length - 1
                const isConcat = tokens.length > 1 && index !== 0
                return <>
                    <TokenRow style={{ marginTop: isConcat ? "-15px" : "-20px" }}>
                        <TokenWrap>
                            <StyledLogo size="40px" src={token?.logo || CircleToken} alt={token?.symbol || "token"} />
                            <Type.LG style={{ marginLeft: "10px" }} >{token?.symbol}</Type.LG>
                        </TokenWrap>
                        {!account || disableLoading || currencies[addressBalance].balance || isZero(currencies[addressBalance].balance)
                            ? <Type.LG style={{ marginLeft: "10px", opacity: "0.75" }} >{formatBalance3(currencies[addressBalance]?.balance) || 0}</Type.LG>
                            : <img style={{ marginRight: "-15px" }} src="/img/spinner.svg" width="40" height="40" alt="sp" />
                        }
                    </TokenRow>
                    {isPlus && < img src="/img/dei/plus.svg" style={{ position: "absolute", marginTop: "-21px", paddingLeft: "27px", width: "53px" }} alt="plus" />}
                </>
            }))}
        </TokenRowContainer>
    }, [tokens, currencies, handleClick, account, disableLoading])
    );
}

export default TokensRow;