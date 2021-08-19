import React, { useState } from 'react';

const SelectBox = ({ currRow, setCurrRow }) => {
    const rows = ["BSC", "ETH", "xDAI"]
    const [open, setOpen] = useState(false)

    return (
        <div className="select-items" onClick={() => setOpen(!open)}>
            <div className={`select-box ${open ? "select-open" : ""}`}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                    <img src={process.env.PUBLIC_URL + "/img/chains/bsc.png"} style={{ width: "25px", height: "25px", marginRight: "8px" }} alt="DEUS" />
                    {currRow}
                </div>
                <svg width={9} height={5} viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 0.5L4.3 4.3L8.1 0.5" stroke="white" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </div>
            <ul className={`${open ? "ul-open" : ""}`}>
                {rows.filter((row) => row !== currRow).map((row, id) => {
                    return <li key={id} onClick={() => setCurrRow(row === 'Max' ? 10000 : row)}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                            <img src={process.env.PUBLIC_URL + "/img/chains/bsc.png"} style={{ width: "25px", height: "25px", marginRight: "8px" }} alt="DEUS" />
                            {row}
                        </div>
                    </li>
                })}

            </ul>
        </div>);
}

export default SelectBox;