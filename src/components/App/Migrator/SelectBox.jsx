import React, { useState } from 'react';
import { ChainId, NameChainId } from '../../../constant/web3';
import OutsideClickHandler from 'react-outside-click-handler';

const SelectBox = ({ currRow, setCurrRow }) => {
    const rows = [ChainId.ETH, ChainId.MATIC]
    const [open, setOpen] = useState(false)

    return (<OutsideClickHandler onOutsideClick={() => { setOpen(false) }}>
        <div className="select-items-flat" onClick={() => setOpen(!open)}>
            {rows.map((row, id) => {
                return <span key={id} onClick={() => setCurrRow(row)}>
                    <div className={`select-box-item ${(row === currRow) && "select-box-item-chosen"}`}>
                        {NameChainId[row].toUpperCase()}
                    </div>
                </span>
            })}
        </div>
    </OutsideClickHandler>
    );
}

export default SelectBox;
