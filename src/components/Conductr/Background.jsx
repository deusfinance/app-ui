import React from 'react';

const Background = () => {
    return (<div className="bg-conductr ">
        <div className="bg-left">
            <img className="" src={process.env.PUBLIC_URL + "/img/right-conductr.svg"} alt="" />
        </div>
        <div className="bg-right">
            <img className="" src={process.env.PUBLIC_URL + "/img/right-conductr.svg"} alt="" />
        </div>
    </div>);
}

export default Background;