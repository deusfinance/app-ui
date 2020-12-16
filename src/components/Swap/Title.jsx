import React from 'react';

const Title = () => {
    return ( <div className="title">
                <img src={process.env.PUBLIC_URL + "/img/DEUSName.svg"} alt="DEUS" />
                <div className="swap-wrap">
                    <div className="swap">
                        Swap
                </div>
                </div>
            </div>  );
}
 
export default Title;