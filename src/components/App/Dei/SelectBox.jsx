import React from 'react';
import { NameChainId } from '../../../constant/web3';
import styled from 'styled-components'
import { addRPC } from '../../../services/addRPC';

const MainItemsDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
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
    opacity: 0.5;
    border: 1px solid ${({ row, currRow }) => (row === currRow) ? "black" : "transparent"};
    opacity: ${({ row, currRow }) => (row === currRow) && "1"};
    background: ${({ theme, row, currRow }) => (row === currRow) && theme.ChainId[row]};
`

const SelectBox = ({ currRow, validNetworks, account, web3 }) => {
    const rows = validNetworks
    return (<MainItemsDiv>
        {rows.map((row, id) => {
            return <span key={id} onClick={() => addRPC(account, row, web3)}>
                <NameItemsDiv row={row} currRow={currRow}>
                    {NameChainId[row].toUpperCase()}
                </NameItemsDiv>
            </span>
        })}
    </MainItemsDiv>

    );
}

export default SelectBox;
