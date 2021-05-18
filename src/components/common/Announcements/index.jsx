import React from 'react';
import { Link } from 'react-router-dom';
import Announce from './Announce';

const Announcements = () => {

    const messages = [
        {
            key: "stakingV2",
            text: <span> Staking V2 (stake and yield + vault exit system) is now live. <Link className="link" to="/stake-and-yield">Click here </Link>.</span>
        },
        {
            key: "sync50BSC",
            text: <span> 50 Stocks on BSC are now Live <Link className="link" to="/crosschain/bsc/synchronizer">Click here </Link>.</span>
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