import React, { useState } from 'react';
import { NameChainId } from '../../../constant/web3';
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
    background: #272727;
    padding: 8px 16px;
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

const SelectBox = ({ currRow, setCurrRow, validNetworks }) => {
    const rows = validNetworks
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
