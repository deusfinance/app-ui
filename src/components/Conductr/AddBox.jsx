import React, { Component } from 'react';

class SearchBox extends Component {
    state = {
        query: "",
    }

    computeProfit = (prevPrice, newPrice) => {

        if (prevPrice === newPrice) {
            return { price: 0, percentage: 0, className: "profit-zero" }
        } else if (prevPrice > newPrice) {

            return { price: (newPrice - prevPrice).toFixed(2), percentage: (-1 * ((prevPrice - newPrice) / prevPrice) * 100).toFixed(2), className: "profit-down" }

        } else {
            return { price: '+' + (newPrice - prevPrice).toFixed(2), percentage: '+' + (((newPrice - prevPrice) / prevPrice) * 100).toFixed(2), className: "profit-up" }
        }
    }

    handleSearchInputChange = (query) => {
        this.setState({ query: query.toLocaleLowerCase() })
    }

    render() {
        const { assets } = this.props

        const { query } = this.state

        const filterdAssets = assets.filter(s => {
            if (s.real_name.toLocaleLowerCase().includes(query) || s.inc.toLocaleLowerCase().includes(query) || s.name.toLocaleLowerCase().includes(query)) {
                return true
            }
            return false
        })

        const seachClasses = filterdAssets.length < 5 ? "over-flow-y-hidden" : "over-flow-y-auto"
        console.log("comde");
        return (<>
            <div className="note">
                {`Note: for pilot puroses we’re only supporting tsla +/- and qqqq +/-`}
            </div>
            { <div className="addbox-wrap">
                <div className={`addbox-output ${seachClasses}`}>
                    <div className="name-asset">rTSLA</div>
                    <div className="allocation">
                        <div className="left-allocation">
                            <div className="added-list-wrap">
                                <div className="top">
                                    <p>assets</p>
                                    <p>allocation</p>
                                </div>
                                <div className="allocation-list">
                                    <div className="allocation-item">
                                        <div className="name">tsel</div>
                                        <div className="p-line-wrap">
                                            <div className="p-line"></div>
                                        </div>
                                        <div className="p-number grad-wrap">
                                            <div className=" grad">100</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-allocation"></div>
                    </div>
                    <div className="btns-wrap">
                        <div className="add-btn-wrap grad-wrap">
                            <div className="add-btn grad">Add more assets</div>
                        </div>
                    </div>
                </div>
            </div>}
        </>);
    }
}

export default SearchBox;