import styled, { css } from 'styled-components'
import { FlexCenter } from '../Container';

export const InputAmount = styled.input.attrs({
    type: "number",
    autocomplete: "off",
    autocorrect: "off",
    spellcheck: "false"
})`
    font-weight: 400;
    flex: 1 1 auto;
    border: ${({ border }) => border || "none"};
    outline-style: none;
    width: ${({ width }) => width || "0px"};
    font-size: ${({ fontSize }) => fontSize || "25px"};
     color: ${({ theme }) => theme.text1};
    background: transparent;

`
export const SwapTitle = styled(FlexCenter)`
    display: inline-flex;
    font-family:"Monument Grotesk Semi";
    padding:7px 20px 4px 20px;
    border-radius: 15px 1px;
    font-size:25px;
    color:#000;
    background:${({ theme, bgColor }) => bgColor ? theme[bgColor] : theme.grad3}
`

export const StyleSwapBase = css`
    background: ${({ theme }) => theme.bg3};
    border: 1px solid ${({ theme }) => theme.border1};
    border-radius: 15px;
    text-align:center;
    margin:auto;
    width:100%;
    max-width:500px;
    /* ${({ theme }) => theme.mediaWidth.upToLarge`
        background: ${({ theme }) => theme.bg7};
    `} */
`

export const StyleTitles = css`
    font-family:"Monument Grotesk Semi";
   .inner-title{
        opacity:0.75;
    }
`
export const SwapArrow = styled(FlexCenter)`
    display:inline-flex;
    cursor:pointer;
    &:hover{
        filter:brightness(0.8)
    }
`
export const MainWrapper = styled.div`
   padding-top: 60px;
   padding-bottom: 30px;
   text-align:center;
   max-width: 95%;
   margin:auto;

`
export const SwapWrapper = styled.div`
${StyleSwapBase}
border-color:#000;
padding:20px 15px;
margin-top:30px;
`

export const SmallWrapper = styled(FlexCenter)`
    ${StyleSwapBase}
    ${StyleTitles}
    justify-content:space-between;
    height:50px;
    /* margin-top:${({ mt }) => mt || "-1px"}; */
    margin-top: -1px;
    padding:0 20px;
`