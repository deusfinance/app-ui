import React, { useState } from 'react';
import { ChainId, NameChainId } from '../../../constant/web3';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components'

const MainItemsDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`

const NameItemsDiv = styled.div`
    display: flex;
    justify-content: center;
    background: #1C1C1C;
    padding: 8px 16px;
    margin: 8px;
    margin-left: 0;
    font-size: 15px;
    border-radius: 6px;
    border: 1px solid black;
    cursor: pointer;
    opacity: 0.5;

    background: ${({ row, currRow }) => (row === currRow) && "#7951DD"};
    border: ${({ row, currRow }) => (row === currRow) && "0"};
    opacity: ${({ row, currRow }) => (row === currRow) && "1"};
`

const SelectBox = ({ currRow, setCurrRow }) => {
    const rows = [ChainId.ETH, ChainId.MATIC]
    const [open, setOpen] = useState(false)

    return (<OutsideClickHandler onOutsideClick={() => { setOpen(false) }}>
        <MainItemsDiv onClick={() => setOpen(!open)}>
            {rows.map((row, id) => {
                return <span key={id} onClick={() => setCurrRow(row)}>
                    <NameItemsDiv row={row} currRow={currRow}>
                        {NameChainId[row].toUpperCase()}
                    </NameItemsDiv>
                </span>
            })}
        </MainItemsDiv>
    </OutsideClickHandler>
    );
}

export default SelectBox;
