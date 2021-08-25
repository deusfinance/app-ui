import React, { useMemo } from 'react'
import { urls } from './data'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'

const MainWrapper = styled.div`
    font-family: 'Monument Grotesk';
    width: 100%;
    padding: 20px 25px;
    background: #0d0d0d;
    border: 1px solid #1c1c1c;
    border-radius: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 18px;
    font-weight: 300;
`

const FlexDiv = styled.div`
    display: flex;
`

const TitleImage = styled.img`
    margin-right: 9px;
`

const TitleText = styled.span`
    font-weight: bold;
    font-size: 15px;
`

const Line = styled.div`
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    margin-bottom: 20px;
    margin-top: 10px;
`

const Line2 = styled.div`
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    margin-top: 20px;
`

const WikiLink = styled.a`
    color: rgb(251, 178, 174);
    text-decoration: underline;
`

const BottomTextDiv = styled.div`
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 10px;
`

const EachUrl = styled.span`
    display: block;
    font-size: 20px;
    margin-top: 22px;
    margin-bottom: 22px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.5);
    .active {
        color: #0DB0F4;
    }
`

const LinkBox = () => {
    return (
        useMemo(() => {
            return <MainWrapper>
                <FlexDiv>
                    <TitleImage src={"/img/Dei_logo.svg"} alt="Dei_logo" />
                    <TitleText > DEI Stable Coin </TitleText>
                </FlexDiv>

                <Line />

                {urls.map((url, index) => {
                    return <EachUrl key={index + "url"}>
                        <NavLink to={url.link}> {url.name} </NavLink>
                    </EachUrl>
                })}

                <Line2 />

                <BottomTextDiv>
                    If you need more help visit the{' '}
                    <WikiLink href="https://wiki.deus.finance/docs/" target="_blank">wiki</WikiLink>.
                </BottomTextDiv>
            </MainWrapper>
        })
    )
}

export default LinkBox