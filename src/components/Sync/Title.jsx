import React from 'react';

import './styles/title.scss';
import { useTranslation } from 'react-i18next'

const Title = ({ isStock }) => {
    const { t} = useTranslation()

    return (<>
        <div className="swap-title">
            {isStock && <> <img src={process.env.PUBLIC_URL + "/img/sync-logo.svg"} alt="DEUS" />
                <div className="sync-wrap" >
                    <div className="sync" style={{ textTransform: "uppercase" }}>
                        {t("synchronizer")}
                    </div>
                </div>
            </>}
        </div>
    </>);
}

export default Title;