import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchBox extends Component {
    state = {
        query: "",
    }

    render() {
        const { added, handleRemove } = this.props
        const nextClass = added.length > 0 ? "" : "disabledButton"

        console.log(added);
        return (<div className="search-step" style={{ position: "relative", height: "calc(100% - 40px)", }}>
            <div className="note">
                {`Note: for pilot puroses we’re only supporting tsla +/- and qqqq +/-`}
            </div>
            { <div className="addbox-wrap">
                <div className={`addbox-output over-flow-y-auto`}>
                    <div className="name-asset">rTSLA</div>
                    <div className="allocation">
                        <table className="allocation-table">
                            <thead>
                                <tr>
                                    <th>assets</th>
                                    <th></th>
                                    <th>allocation</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    added.map((tk, key) => {
                                        return <tr key={key}>
                                            <td>{tk.name}</td>
                                            <td>
                                                <div className="p-line-wrap">
                                                    <div className="p-line"></div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="p-number-wrap grad-wrap">
                                                    <div className="p-number locked">{tk.allocation}%</div>
                                                </div>
                                            </td>
                                            <td onClick={() => handleRemove(tk)}>remove</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="right-allocation"></div>
                    </div>

                    {/*                     <div className="allocation">
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
                                    <div className="div remove-btn">remove</div>
                                </div>
                            </div>
                        </div>
                        <div className="right-allocation"></div>
                    </div> */}


                    <div className="btns-wrap">
                        <div className="add-btn-wrap grad-wrap">
                            <Link to="/conductr/build" className="add-btn grad">Add more assets</Link>
                        </div>
                    </div>

                </div>

            </div>}

            <div className="next-btn-wrap grad-wrap">
                {added.length > 0 ? <Link to="/conductr/build/timelock" className={`next-btn grad ${nextClass}`} >
                    Next
                    </Link> : <div className="disabledButton grad">Next</div>}
            </div>

        </div>);
    }
}

export default SearchBox;