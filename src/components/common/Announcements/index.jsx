import React from 'react';
import { Link } from 'react-router-dom';
import Announce from './Announce';

const Announcements = () => {

    const messages = [
        {
            key: "coinbaseMigrator",
            text: <span> Migrating wCoinbase to dCOIN will be open until 03.06.2021 17:30 UTC+0 afterwards we will take down the migrator page in Order to clear the outstanding Synchronizer Debt positions.. <Link className="link" to="/migrator">Click here </Link>.</span>
        },
    ]

    return (<>
        {messages.map(message => {
            const isClose = localStorage.getItem(message.key) ? true : false
            return <Announce key={message.key} id={message.key} isClose={isClose} >{message.text}</Announce >
        })}
    </>);
}

export default Announcements;