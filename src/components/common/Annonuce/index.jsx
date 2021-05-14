import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss'

const Announce = () => {
    return (<>
        <div className="annouce-notif-wrap" >
            <div className="content">
                Staking V2 (stake and yield) is now live. <Link className="link" to="/stake-and-yield">Click here </Link> to go to V2.
            </div>
        </div>
    </>);
}

export default Announce;