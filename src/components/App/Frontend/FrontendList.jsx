import React from 'react';
import styled from 'styled-components'
import { RowBetween } from '../Row';
import ListItem from './ListItem';

const Wrap = styled.div`
    margin:auto;
    max-width:1200px;
    font-weight:300;
    margin-top: 70px;
`

const ChooseText = styled.p`
    max-width: 800px;
    margin-top: 0px;
    margin-bottom: 0px;
    flex: 1;
    color: #ffffff;
    font-size: 40px;
`

const ChooseButton = styled.p`
    padding: 11px 16px;
    border: 1px solid #293147;
    border-radius: 8px;
    background-color: #fff;
    transition: all 200ms ease;
    color: #293147;
    font-size: 18px;
    line-height: 1.4;
    cursor:pointer;
`

const Header = styled.div`
    margin-top:20px;
    display: flex;
    height: 60px;
    padding-right: 100px;
    padding-left: 25px;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    background-color: #293147;
    `
const HeaderTitle = styled.p`
    font-size:18px;
`

const ListContent = styled.div`
    display: flex;
    /* height: 60px; */
    /* padding-right: 200px; */
    padding-left: 25px;
    justify-content: space-between;
    align-items: center;
    background-color: #e7e7e7;
    `

const FrontendList = ({ data }) => {
    return (<Wrap>
        <RowBetween>
            <ChooseText>
                Choose a DEUS Frontend
            </ChooseText>
            <ChooseButton>
                Submit your frontend
            </ChooseButton>
        </RowBetween>
        <Header>
            <HeaderTitle>
                Frontend Operator
            </HeaderTitle>
            <HeaderTitle>
                Kickback rate
            </HeaderTitle>
        </Header>
        <ListContent>
            {React.Children.toArray(data.map(item => (<ListItem data={item} />)))}
        </ListContent>
    </Wrap>);
}

export default FrontendList;