import styled from "styled-components";



export const MainWrap = styled.div`
    font-family: "Monument Grotesk";
    position: relative;
    padding: 50px 0 92px;
    color: white;
    z-index: 2;    
`

export const IntroWrap = styled.div`
    width: 100%;
    padding: 35px 0;
    text-align: center;
`

export const MainTitle = styled.div`
    font-size: 50px;
    color: #ffc178;
`

export const Description = styled.div`
    font-family: Monument Grotesk Semi;
    font-size: 16px;
    margin: 15px auto;
    text-align: left;
    max-width: 800px;
`

export const ItemsWrap = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${({ mt }) => mt ?? "0"}px;
`
