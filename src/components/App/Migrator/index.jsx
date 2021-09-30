import styled from 'styled-components'

export const MainWrapper = styled.div`
   padding-top: 60px;
   padding-bottom: 30px;
   text-align:center;
   max-width: 95%;
   margin: auto;
`

export const MainDiv = styled.div`
    display: "flex";
    width: "100%";
    align-items: "center";
    margin: "auto";
    justify-content: "center";
    margin: 0 auto;
    ${({ theme }) => theme.mediaWidth.upToSmall`
        max-width: 450px;
    `}
`

export const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 845px;
    background: linear-gradient(180deg, #18191D 0%, #18191D 100%);
    border-radius: 15px;
    padding-bottom: ${({ pb }) => pb ?? "0"} ;
    overflow: hidden;

`

export const TokensContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 22px;
    height: 70px;
    border: 1px solid #000000;
`

export const Token = styled.div`
    background: #272727;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 15px;
    width: 160px;
    height: 100px;
`

export const Line = styled.div`
    background: ${({ theme, bgColor }) => bgColor ? theme[bgColor] : theme.grad3} ;
    height: 1px;
    width: 100%;
`

export const DesktopDiv = styled.div`
    display: block;
    ${({ theme }) => theme.mediaWidth.upToSmall`
        display: none;
    `}
`

export const MobileDiv = styled.div`
    display: none;
    ${({ theme }) => theme.mediaWidth.upToSmall`
        display: block;
    `}
`