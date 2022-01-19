import React from 'react';
import styled from "styled-components";
import ClaimButton from '../Dei/Staking/ClaimButton';
import { Base } from '../Button';


const Wrap = styled.div`
    background: #000000;
    background-image: linear-gradient(180deg, #232835 0%, #000000 74%);
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #4e4e4e;
    margin: 0 20px;
    width:270px;
    text-align:left;
    box-shadow: 0px 0px 7px 0px #7b7852;
`
const Label = styled.p`
    margin-top: 4px;
    color: bisque;
    font-family: 'Monument Grotesk Semi';
    font-size: 16px;
    /* font-weight:bold; */
`

const Value = styled.p`
    margin-top:20px;
    font-size:30px;
    font-weight:800;
`
const Button = styled(Base)`
    background:#7ae9ff;
    background:#ff9800;
    margin-top:20px;
    font-size:20px;
    /* color:#000f69; */
    color:#000000;
    padding:5px 10px;
    font-family: 'Monument Grotesk Semi';
    &:hover{
        filter:${({ active }) => active && "brightness(1.1)"};
    }
`



const ItemInfo = ({ Icon, label, value, onAction = undefined }) => {

    return (<Wrap>
        {Icon && <Icon color="#ffc178" />}<Label>{label}</Label>
        {onAction
            ? <Button onClick={onAction} active={true}>{value}</Button>
            : <Value>{value}</Value>}
    </Wrap >);
}

export default ItemInfo;