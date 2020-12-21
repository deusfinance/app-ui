import React from 'react';
import { Link } from 'react-router-dom';

const ProvideButton = ({ staking, isSand }) => {
    return (<div className="grad-wrap provide-more-wrap">
        {staking.innerLink ?
            <Link to={staking.provideLink} className=" grad ">
                <div className="provide-more">
                    <span>get {staking.title} </span>
                    {/* <img src={process.env.PUBLIC_URL + "/img/staking/swap.svg"} alt="vaults" /> */}
                </div>
            </Link>
            : <a className=" grad provide-more " href={staking.liqLink} target="_blank" rel="noopener noreferrer">provide Liquidity</a>}
    </div>);
}

export default ProvideButton;