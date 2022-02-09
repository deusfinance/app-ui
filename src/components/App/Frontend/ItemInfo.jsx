import React from 'react';
import styled from 'styled-components'

const MainWrap = styled.div`
    font-weight:300;
    margin:20px;
`
const Title = styled.p`
    color: #afc4ff;
    font-size: 30px;
    margin-top: 20px;
    margin-bottom: 10px;
`

const Description = styled.p`
    max-width: 420px;   
    margin-bottom: 0px;
    color: #d7d9ff;
    font-size: 18px;
    line-height: 1.9;
    margin-top: 30px;
`


const ItemInfo = ({ title, description }) => {
    return (<MainWrap>
        <Title>{title}</Title>
        <Description>{description}</Description>
    </MainWrap>);
}

export default ItemInfo;