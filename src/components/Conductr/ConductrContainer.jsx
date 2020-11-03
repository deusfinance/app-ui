import React, { Component } from 'react'
import './conductr.scss'
import { Link } from 'react-router-dom';


class ConductrContainer extends Component {
    state = {}


    componentDidMount() {
        document.title = 'DEUS conductr';
    }

    render() {
        return (<div className="conductr-wrap">
            <div className="bg-conductr-wrap">
                <div className="bg-conductr ">
                    <div className="bg-left">
                        <img className="" src="img/right-conductr.svg" alt="" />
                    </div>
                    <div className="bg-right">
                        <img className="" src="img/right-conductr.svg" alt="" />
                    </div>
                </div>

                <div className="contr-btns">
                    <div className="connect">
                        Connected Wallet
                    </div>
                    <div className="learn-more-wrap">
                        <div className="learn-more">
                            Learn more
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="pilot-wrap">
                        <div className="pilot">
                            <div className="title">
                                conduct <img src={`${process.env.PUBLIC_URL}/img/conducr-icon.svg`} alt="" />

                            </div>
                            <div className="title-pilot">pilot</div>
                            <div className="btn-wrap">
                                <Link to="/conductr/buy" className="buy"> <div className="btn-txt">Buy mirrored asset</div></Link>
                                <Link to="/conductr/build" className="mirror"><div className="btn-txt" >Mirror an asset</div></Link>
                            </div>
                            <div className="create-text">Create your own Registrar with a few clicks</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>);
    }
}

export default ConductrContainer;