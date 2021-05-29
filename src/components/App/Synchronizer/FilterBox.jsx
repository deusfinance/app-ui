import React from 'react';

const FilterBox = ({ items }) => {
    return (
        <ul className="unstyled centered" style={{ listStyleType: "none", margin: "10px 0 20px 0 ", }}>
            {items.map((item, i) => <li key={i} style={{
                display: "inline-block",
                marginRight: "15px",
                marginBottom: "3px",
            }}>
                <input className="styled-checkbox" id="styled-checkbox-1" type="checkbox" value="value1"
                    style={{
                        background: "rgba(91, 204, 189, 0.14902)",
                        border: "1px solid #FFFFFF",
                        borderRadius: "2px"
                    }}
                />
                <label htmlFor="styled-checkbox-1" style={{
                    marginLeft: "4px",
                    fontSize: "15px"
                }}>{item}</label>
            </li>)}
        </ul>
    );
}

export default FilterBox;