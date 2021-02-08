import React from 'react';
import './notification.scss';

const Notification = ({ type, msg }) => {
    return (<div>

    </div>);
}


export const MovableNotif = ({ text }) => {
    return (<div className="mov-notif">
        {text}
    </div>)
}

export default Notification;