import React from 'react';
// import { Link } from 'react-router-dom';
import Announce from './Announce';

const Announcements = () => {

    const messages = [
        // {
        //     key: "muon-presale",
        //     text: <span>EXCLUSIVE: Presale of <span style={{ color: "#fff" }}>$MUON</span> for DEUS long term supporters/stakers.<Link to="/muon-presale" style={{ color: "#0099ff", textDecoration: "underline", marginLeft: "10px" }} >{`click here ↗`}</Link>
        //     </span>
        // }
    ]

    return (<>
        {messages.map(message => {
            const isClose = localStorage.getItem(message.key) ? true : false
            return <Announce key={message.key} id={message.key} isClose={isClose} >{message.text}</Announce >
        })}
    </>);
}

export default Announcements;