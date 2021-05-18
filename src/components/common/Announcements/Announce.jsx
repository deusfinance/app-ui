import React, { useState } from 'react';
import { X } from 'react-feather'
import styled from 'styled-components';
import './style.scss'

const StyledClose = styled(X)`
  /* float:right; */
  margin-left:10px;
  opacity:0.5;
  :hover {
    cursor: pointer;
    opacity:1;
}
`

const Announce = ({ id, children, isClose = false, style }) => {
    const [close, setClose] = useState(isClose)

    return (<>
        {!close &&
            <div className="annouce-notif-wrap" style={style}>
                <div className="content">
                    {children}
                    <StyledClose stroke="black" size="15" onClick={() => {
                        setClose(true)
                        localStorage.setItem(id, true)
                    }} />
                </div>
            </div>
        }
    </>);
}

export default Announce;