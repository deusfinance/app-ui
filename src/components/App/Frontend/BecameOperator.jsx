import React from 'react';
import styled from 'styled-components'
import Items from './Items';

const Wrap = styled.div`
    max-width:1200px;
    margin:auto;
    font-weight:300;
    margin-top: 70px;
    padding:70px 50px;
    border-radius: 16px;
    background-color: #0f0f0f;
    box-shadow: 0 4px 24px 0 rgb(0 0 0 / 7%);
    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
    transform-style: preserve-3d;
`
const Header = styled.div`
    text-align:center;
`

const Title = styled.p`
    margin:auto;
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    color: #ffffff;
`

const Description = styled.p`
    max-width: 550px;
    margin:auto;
    color: #545a6c;
    font-size: 24px;
    line-height: 1.3;
    color: #959595;
`

const BecameOperator = ({ data }) => {
    return (<Wrap>
        <Header>
            <Title>
                {data["header"]["title"]}
            </Title>
            <Description>
                {data["header"]["description"]}
            </Description>
        </Header>
        <Items data={data} />
    </Wrap>);
}

export default BecameOperator;