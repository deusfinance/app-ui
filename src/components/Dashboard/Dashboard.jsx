import React from 'react';
import { Balance, Supply } from './Cards';

import "./dashboard.scss"


const Dashboard = () => {
    return (<div className="dashboard">
        <Balance />
        <Balance />
        <Supply />
        <Supply />
    </div>);
}

export default Dashboard;