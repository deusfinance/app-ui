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

                                                    <div className="p-line" style={{ width: tk.allocation + "%" }}>

                                                        <svg style={{ color: "#fff", position: "absolute", right: 0 }} width={24} height={30} viewBox="0 0 24 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <g filter="url(#filter0_d)">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M6.19888 8.79972V5.50014C6.19888 2.4625 8.66138 0 11.699 0C14.7367 0 17.1992 2.4625 17.1992 5.50014V8.79972H17.4753C18.5037 8.79972 19.4004 9.65375 19.4004 10.8164V19.9833C19.4004 21.146 18.5037 22.0001 17.4753 22.0001H5.92505C4.89673 22.0001 4 21.146 4 19.9833V10.8164C4 9.65375 4.89673 8.79972 5.92505 8.79972H6.19888ZM14.9991 8.79972V5.50014C14.9991 3.67755 13.5216 2.20006 11.699 2.20006C9.87643 2.20006 8.39893 3.67755 8.39893 5.50014V8.79972H14.9991Z" fill="white" />
                                                            </g>
                                                            <defs>
                                                                <filter id="filter0_d" x={0} y={0} width="23.4004" height="30.0001" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                                    <feOffset dy={4} />
                                                                    <feGaussianBlur stdDeviation={2} />
                                                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                                                </filter>
                                                            </defs>
                                                        </svg>
                                                    </div>



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