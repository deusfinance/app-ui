import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next'

class TopNotif extends Component {
    state = {
        tokenTypes: [
            { id: 0, name: this.props.t("single"), path: "/staking/single" },
            { id: 1, name: this.props.t("liquidity"), path: "/staking/liquidity" },
            { id: 2, name: this.props.t("old"), path: "/staking/old" },
        ],
        show: false
    }

    handleToggleSelect = () => {
        const { show } = this.state
        this.setState({ show: !show })
    }



    componentDidUpdate(prevProps) {

        if (this.props.typeID !== prevProps.typeID)
            console.log(this.props.typeID);
        if(this.props.t!== prevProps.t){
                   this.setState({tokenTypes:[
            { id: 0, name: this.props.t("single"), path: "/staking/single" },
            { id: 1, name: this.props.t("liquidity"), path: "/staking/liquidity" },
            { id: 2, name: this.props.t("old"), path: "/staking/old" },
                ]})
        }
    }
    render() {

        const { show, tokenTypes } = this.state
        const { typeID } = this.props
        const selectedToken = tokenTypes[typeID]

        return (<>
            {/* <div className="grad-wrap notif-wrap">
            <div className=" notif">
                Only swap DEUS/DEA on Uniswap to avoid slippage. Swap DEUS/ETH on DEUS Swap.
            </div>
        </div> */}
            <div className="top-btns">
                <div className="select-group">
                    {!show && <div className="grad-wrap token-btn-wrap" onClick={this.handleToggleSelect}>
                        <div className=" grad token-btn">
                            <p>{selectedToken.name} </p>
                            <img className="arrow-nav" src={process.env.PUBLIC_URL + "/img/arrow-nav.svg"} alt="arrow" />
                        </div>
                    </div>}
                    {show && <div className="grad-wrap list-tokens-wrap ">
                        <div className="list-tokens">
                            <div to={selectedToken.path} className="token-item" onClick={this.handleToggleSelect}>
                                <div className=" grad token-btn">
                                    <p>{selectedToken.name}</p>
                                    <img className="arrow-nav" src={process.env.PUBLIC_URL + "/img/arrow-nav.svg"} alt="arrow" />
                                </div>
                            </div>
                            {tokenTypes.filter(t => t.id !== selectedToken.id).map((t, index) => {
                                return <Link to={t.path} key={index} className="token-item" >
                                    <div className=" grad token-btn">
                                        <p>{t.name}</p>
                                    </div>
                                </Link>
                            })}
                        </div>
                    </div>}
                </div>
                {/* 
                <div className="old-new-btn">
                    <div className="grad-wrap old-btn-wrap">
                        <p className="grad old-btn">Visit old Pools</p>
                    </div>
                    <p className="msg">*To unstake your old staked tokens <br /> just visit our old pools</p>
                </div> */}
            </div>
        </>);
    }
}

export default withTranslation()(TopNotif);