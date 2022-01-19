import React from 'react';
import { NameChainId } from '../../../constant/web3';
import styled from 'styled-components'
import { addRPC } from '../../../services/addRPC';

const MainItemsDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
`

const NameItemsDiv = styled.div`
    display: flex;
    justify-content: center;
    background: #272727;
    padding: 6px 16px;
    margin: 8px;
    margin-left: 0;
    font-size: 15px;
    border-radius: 6px;
    cursor: pointer;
    opacity: ${({ chain, currRow }) => (chain === currRow) ? "1" : "0.5"};
    font-weight: ${({ chain, currRow }) => (chain === currRow) ? "400" : "normal"};
    background: ${({ theme, chain, currRow }) => (chain === currRow) && theme.ChainId[chain]};
    color: ${({ chain, currRow, theme }) => (chain === currRow) ? theme.ChainId_text[chain] : "#FFF"};
    border: 1px solid ${({ chain, currRow }) => (chain === currRow) ? "black" : "transparent"};
`

const SelectBox = ({ currRow, validNetworks, account, web3 }) => {
    const networks = validNetworks
    return (<MainItemsDiv>
        {networks.map((chain, id) => {
            return <span key={id} onClick={() => addRPC(account, chain, web3)}>
                <NameItemsDiv chain={chain} currRow={currRow}>
                    {NameChainId[chain].toUpperCase()}
                </NameItemsDiv>
            </span>
        })}
    </MainItemsDiv>
    );
}

export default SelectBox;
