import React from 'react';
import { Link } from 'react-router-dom';

const ProvideButton = ({ token }) => {
    return (<div className="grad-wrap provide-more-wrap">
        <Link to="/vaults" className=" grad ">
            <div className="provide-more"><span>get s{token.title} </span><img src={process.env.PUBLIC_URL + "/vaults/sand-token.svg"} alt="uni" /></div>
        </Link>
    </div>);
}

export default ProvideButton;