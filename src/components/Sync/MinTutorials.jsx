import React from 'react';
import './styles/min-tut.scss'


const MinToturial = ({ isOpen }) => {
    const text = {
        true: {
            title: <div>We automatically check xDAI balances  <br /> (checkers might fail) <br /> <br /> If you don't own any xDAI yet, we got a link to the bridge in the tutorial.</div>,
            button: "xDAI Setup Tutorial",
            link: "/crosschain/xdai/tutorial"
        },
        false: {
            button: "start trading (Synchronizer)",
            link: "/crosschain/xdai/synchronizer"
        }
    }

    return (<div className="min-tut-wrap">
        {text[isOpen].title && <div className="title">
            {text[isOpen].title}
        </div>}

        <a href={text[isOpen].link} className={`action-btn ${isOpen ? "xdai-button" : "sync-button"} `} style={{ marginTop: !text[isOpen].title && 0 }}>{text[isOpen].button}</a>
    </div>);
}

export default MinToturial;