import React from 'react';

import './styles/contucted-text.scss';

const ConductedText = () => {
    return (<p className="conducted-desc">
        <span style={{ textTransform: "uppercase", }}>conduct *  -{`>`} long/short  -{`>`} synchronize <br /></span>
        <span style={{ opacity: "0.8" }}>
            Synchronize your crypto portfolio with your favorite Stock or ETF <br />
            <br />
                            *Only if your desired asset was not “conducted” (deployed as an ERC-20 Token) yet.
                        </span>
    </p>);
}

export default ConductedText;