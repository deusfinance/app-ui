import React from 'react';
import styled from 'styled-components'
import { Text } from 'rebass/styled-components'
import CurrencyLogo from '../Currency';


export const InputAmount = styled.input.attrs({
    type: "number",
    autocomplete: "off",
    autocorrect: "off",
    spellcheck: "false"
})`
    /* padding-left: 14px; */
    /* padding-right: 8px; */
    font-weight: 400;
    flex: 1 1 auto;
    border: ${({ border }) => border || "none"};
    outline-style: none;
    width: ${({ width }) => width || "0px"};
    font-size: ${({ fontSize }) => fontSize || "28px"};
     color: ${({ theme }) => theme.text1};
    background: transparent;

`
const StyleTokenInfo = styled.div`

`
const StyleTokenBox = styled.div`

`

// export const TokenInfo = <StyleTokenInfo>
//     <Text >BUSD</Text>
//     <CurrencyLogo
//         currency={{ logo: "/tokens/usdc.svg" }}
//         size={"25px"}
//     />
// </StyleTokenInfo>


