import React from 'react';

import './styles/success.scss';

const Success = () => {
    return (<div className="success-wrap">
        <div className="title">Success</div>
        <div className="about">
            You’ve made it through the tutorial.<br />
            You’re now ready to start trading stocks on L2.
        </div>
        <div className="grad-wrap">
            <div className="igrad">
                BACK TO THE SYNCHRONIZER
            </div>
        </div>
    </div>);
}

export default Success;