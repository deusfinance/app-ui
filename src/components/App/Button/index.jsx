import styled from 'styled-components'
import { Button as RebassButton } from 'rebass/styled-components'

export const Base = styled(RebassButton)`
  padding: ${({ padding }) => (padding ? padding : '0')};
  width: ${({ width }) => (width && width)};
  height: ${({ height }) => (height && height)};
  font-family: Monument Grotesk;
  font-weight: 400;
  text-align: center;
  border-radius: 6px;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  border: 0;
  color: ${({ theme }) => theme.text1};
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: all 0.35s;
  &:disabled {
    cursor: auto;
  }
  > * {
    user-select: none;
  }
`
export const ButtonMax = styled(Base)`
font-size: 12px;
padding: 3px 5px;
background: ${({ theme }) => theme.grad2};
border: 1px solid #ffffff;
transition: all 0.25s;
&:hover{
    background: #5bccbd;
    color: #0d0d0d;
}
`
const ButtonSync = styled(Base).attrs({
  width: "100%",
  height: "55px",
  borderRadius: "10px",
})`
  font-size:20px;
`

export const ButtonSyncDeactive = styled(ButtonSync)`
    box-shadow: none;
    background: ${({ theme }) => theme.sync_dactive};
    color: #8d8d8d;
    cursor: default;
`

export const ButtonSyncActice = styled(ButtonSync)`
  background: ${({ theme }) => theme.sync_active};
  box-shadow: 0px 2px 4px rgb(100 100 100 / 50%);
  cursor:pointer;
  font-size: 25px;
  &:hover{
    filter : brightness(1.2);
  }
`

export const ButtonSecondery = styled(Base)`
    padding: ${({ padding }) => (padding ? padding : '0 15px')};
    box-shadow: none;
    background: ${({ theme }) => theme.grad2};
    color:${({ theme }) => theme.text1};
    border: 1px solid rgba(97, 192, 191, 0.25);
    cursor: pointer;
    &:hover{
      filter : brightness(1.2);
  }
`
