import React, { Component } from 'react';
class SearchInput extends Component {
    state = {}
    render() {

        const { handleSearchInputChange, onFocus, isFocus } = this.props

        return (<>
            <div className="note">
                {isFocus ?
                    `Note: for pilot puroses we’re only supporting tsla +/- and qqqq +/-` :
                    <span style={{ opacity: 0 }}>empty</span>}
            </div>

            <div className="symbol-wrap">
                <input
                    className="symbol"
                    type="text"
                    id="symbol"
                    placeholder="Enter a symbol or keyword"
                    onChange={(e) => handleSearchInputChange(e.currentTarget.value)}
                    onFocus={onFocus}
                />
            </div>
        </>);
    }
}

export default SearchInput;