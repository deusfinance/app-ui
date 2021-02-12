import React from 'react';

import './styles/under.scss'

const Under = () => {
    return (<div className="under-maintenance-wrap">
        <div className="maintenance">
            <img src={process.env.PUBLIC_URL + "/img/maintenance.png"} alt="" />
            <p>under maintenance</p>
            <div>We will be back shortly</div>
        </div>

    </div>);
}

export default Under;