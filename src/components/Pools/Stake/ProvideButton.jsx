import React from 'react';
import { Link } from 'react-router-dom';

const ProvideButton = ({ token, isSand }) => {
    return (<div className="grad-wrap provide-more-wrap">
        {token.inner_link ?
            <Link to="/vaults" className=" grad ">
                <div className="provide-more">
                    <span>get {isSand ? "s" : ""}{token.title} </span>
                    <img src={process.env.PUBLIC_URL + "/vaults/sand-token.svg"} alt="uni" />
                </div>
            </Link>
            : <a className=" grad provide-more " href={token.liqLink} target="_blank" rel="noopener noreferrer">provide Liquidity</a>}
    </div>);
}

export default ProvideButton;