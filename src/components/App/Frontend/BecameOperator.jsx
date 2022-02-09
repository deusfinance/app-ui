import React from 'react';
import styled from 'styled-components'
import { RowCenter } from '../Row';
import ItemInfo from './ItemInfo';

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



const BecameOperator = () => {
    return (<Wrap>
        <Header>
            <Title>
                Become a Frontend Operator
            </Title>
            <Description>
                Anybody with some web space and technical understanding can become a Frontend Operator.
            </Description>
        </Header>
        <RowCenter style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
            <ItemInfo title={"Launch kit"} description={"You can download the launch kit from GitHub. This can be done by cloning the repository or using Docker. This will typically be spun up by power users and or users looking for a good starting point for their frontend."} />
            <ItemInfo title={"SDK"} description={"You use our technical documentation (SDK) and the middleware library we provide to create your own front end application. We assume that wallet and integrator services will use this and integrate our protocol in their existing platform."} />
        </RowCenter>
    </Wrap>);
}

export default BecameOperator;