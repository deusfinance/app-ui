import React, { Component } from 'react';
import './steps.scss'
import Slide from './Slide';
import Tools from './Tools';
import Background from './Background';

class BuildRegistrar extends Component {
    state = {

        isFocus: false,
        assets: [
            {
                id: 1,
                name: "tsla",
                real_name: "U.S.: NASDAQ",
                inc: "TESLA Inc.",
                price: "448.16",
                new_price: "468.18",
            },
            {
                id: 2,
                name: "tsla inverted ",
                real_name: "U.S.: NASDAQ",
                inc: "TESLA Inc.",
                price: "230.16",
                new_price: "220.73",
            },
            {
                id: 3,
                name: "qqq",
                real_name: "U.S.: NASDAQ",
                inc: "TESLA Inc.",
                price: "100.92",
                new_price: "100.92",
            },
            {
                id: 4,
                name: "qqq inverted",
                real_name: "U.S.: NASDAQ",
                inc: "TESLA Inc.",
                price: "120.92",
                new_price: "145.37",
            },
        ],
        added: []
    }


    onBlur = () => {
        this.setState({ isFocus: false })
    }
    onFocus = () => {
        this.setState({ isFocus: true })
    }

    handleAdd = (asset) => {
        let { added } = this.state
        const found = added.filter(s => s.id === asset.id)
        if (found.length > 0) {
            console.log(found);
            return
        }
        if (added.length < 2) {
            added = [...added, { ...asset, allocation: 0 }]
        }
        added = this.restricAllocation(added)
        this.setState({ added })
    }

    restricAllocation = (added) => {
        if (added.length === 1) {
            added[0].allocation = 100
        }
        if (added.length === 2) {
            added[0].allocation = 50
            added[1].allocation = 50
        }
        return added
    }

    handleRemove = (asset) => {
        const { added } = this.state
        let newAdded = added.filter(add => (add.id !== asset.id))
        if (added.length > 1)
            newAdded = this.restricAllocation(newAdded)
        this.setState({ added: newAdded })
    }

    render() {

        const { isFocus, assets, added } = this.state

        return (<>

            <div className="conductr-wrap">
                <div className="bg-conductr-wrap">

                    <Background />
                    <div className="container">
                        <div className="build-wrap">
                            <Slide isFocus={isFocus} />
                            <Tools
                                isFocus={isFocus}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                handleAdd={this.handleAdd}
                                handleRemove={this.handleRemove}
                                assets={assets}
                                added={added}

                            />
                        </div>
                    </div>

                </div>
            </div>

        </>);
    }
}

export default BuildRegistrar;