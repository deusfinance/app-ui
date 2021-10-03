import React, { useState } from 'react';
import { NameChainId } from '../../../constant/web3';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components'
import { addRPC } from '../../../services/addRPC';

const MainItemsDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    /* align-items: left; */
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
    border: 1px solid ${({ row, currRow }) => (row === currRow) ? "black" : "transparent"};
    cursor: pointer;
    opacity: 0.5;
    background: ${({ row, currRow }) => (row === currRow) && "#7951DD"};
    opacity: ${({ row, currRow }) => (row === currRow) && "1"};
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
