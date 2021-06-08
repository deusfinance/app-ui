import React from 'react';
// import { Link } from 'react-router-dom';
import Announce from './Announce';

const Announcements = () => {

    const messages = [

    ]

    return (<>
        {messages.map(message => {
            const isClose = localStorage.getItem(message.key) ? true : false
            return <Announce key={message.key} id={message.key} isClose={isClose} >{message.text}</Announce >
        })}
    </>);
}

export default Announcements;