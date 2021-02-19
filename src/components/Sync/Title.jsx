import React from 'react';

import './styles/title.scss';

const Title = ({ isStock }) => {
    return (<>
        <div className="swap-title">
            {isStock && <> <img src={process.env.PUBLIC_URL + "/img/sync-logo.svg"} alt="DEUS" />
                <div className="sync-wrap" >
                    <div className="sync" style={{ textTransform: "uppercase" }}>
                        synchronizer
                    </div>
                </div>
            </>}
        </div>
    </>);
}

export default Title;