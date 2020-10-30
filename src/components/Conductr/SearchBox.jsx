import React, { Component } from 'react';
import SearchInput from './SearchInput';
import OutsideClickHandler from 'react-outside-click-handler';

class SearchBox extends Component {
    state = {
        query: ""
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
        const { onBlur, isFocus, onFocus, assets, added, handleAdd } = this.props

        const { query } = this.state



        const filterdAssets = assets.filter(s => {
            if (!added[s.id] && ((s.real_name.toLocaleLowerCase().includes(query) ||
                s.inc.toLocaleLowerCase().includes(query)) ||
                s.name.toLocaleLowerCase().includes(query)
            )) {
                return true
            }
            return false
        })

        const seachClasses = filterdAssets.length < 5 ? "over-flow-y-hidden" : "over-flow-y-auto"

        return (<>
            <OutsideClickHandler
                onOutsideClick={() => {
                    onBlur()
                }}
            >
                <SearchInput isFocus={isFocus} onFocus={onFocus} handleSearchInputChange={this.handleSearchInputChange} />

                {isFocus && <div className="search-wrap">
                    <div className={`search-output ${seachClasses}`}>
                        {
                            filterdAssets.map((s, index) => {
                                let profit = this.computeProfit(s.price, s.new_price)
                                return <div key={index} className="search-item">
                                    <div className="search-left">
                                        <div className="search-top">
                                            <div className="name">
                                                <span>{s.name}</span> <span>{s.real_name}</span>
                                            </div>

                                            <div className="price">{s.new_price}</div>
                                        </div>
                                        <div className="search-bottom">
                                            <div className="p1">{s.inc}</div>
                                            <div className={profit.className}>{profit.price} ({profit.percentage}%)</div>
                                        </div>
                                    </div>
                                    <div className="search-right">
                                        <div className="add-btn-wrap" onClick={() => handleAdd(s)}>
                                            <div className="add-btn">Add</div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>}
            </OutsideClickHandler>
        </>);
    }
}

export default SearchBox;