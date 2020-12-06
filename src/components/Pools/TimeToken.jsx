import React, { Component } from 'react';
import Popup from '../common/Popup/Popup';
import { Link } from 'react-router-dom';
import { contractEndpoint } from '../../config'

import "./staking.scss"
import StakePopup from '../common/Popup/StakePopup';
import TopNotif from './TopNotif';

class TimeToken extends Component {
    state = {
        isPopup: false,
        isSelect: false,
        isStakePopup: false,
        tokenTypes: [
            { id: 1, name: "Sand Token", path: "/new-staking" },
            { id: 2, name: "Balancer Pool", path: "balancer" },
            { id: 3, name: "Time Token", path: "/timetoken" },
        ],
        selectedTokenID: 3,
        stakeAmount: undefined,
        currToken: {
            title: "TimeToken",
            balance: 10,
            stakingLink: "0x"
        }
    }

    handleOpenSelect = () => {
        this.setState({ isSelect: true })
    }

    handleScroller = () => {
        const width = (1900 - window.innerWidth) / 2
        if (this.scrollRef.current) {
            console.log(window.innerWidth);
            this.scrollRef.current.scrollLeft = width
        }
    }

    changeSelectToken = (t) => {
        this.setState({ selectedTokenID: t.id, isSelect: false })
    }


    handleStake = () => {
        const { isStakePopup } = this.state
        this.setState({ isStakePopup: !isStakePopup })
    }

    handlePopup = (key) => {
        const { isPopup } = this.state
        this.setState({ isPopup: !isPopup })
    }

    blurBG = () => {
        const { isPopup, isStakePopup } = this.state
        let blurPop = "blured"
        let hidden = "hidden"
        if (!(isPopup || isStakePopup)) {
            blurPop = "hidden";
            hidden = "blured"
        }
        document.getElementById("blur-pop").classList.remove(hidden)
        document.getElementById("blur-pop").classList.add(blurPop)
    }

    render() {
        const { isPopup, isSelect, isStakePopup, tokenTypes, selectedTokenID, currToken, stakeAmount } = this.state
        const selectedToken = tokenTypes.find(t => t.id === selectedTokenID)
        this.blurBG()
        const popupMsg = <div className="pop-timelock-wrap">
            <div className="pop-timelock">
                <pre>
                    {`In order to get Time token you need to lock assets in our Vaults.

For example:
You lock an equal $ amount of DEUS and DEA  to receive DEUS-DEA Sand Token. You can then stake your DEUS-DEA Sand Token to farm DEA.

And depending on hol long your tokens are locked up you will receive TIME tokens.`}
                </pre>
                <Link to="/vaults" className="btn-link">Vaults</Link>
            </div>
        </div>


        return (<>
            <Popup
                title="HOW  TO GET TIME TOKEN"
                close={true}
                show={isPopup}
                handlePopup={this.handlePopup}
                popBody={popupMsg} />

            {currToken && <StakePopup
                title={"STAKE TOKENS TO EARN " + "DEA"}
                close={true}
                isStakePopup={isStakePopup}
                handleStake={this.handleStake}
                token={currToken}
                isTimeToken={true}
            />
            }

            <div className="staking-wrap " >

                <TopNotif typeID={2} />

                <div className="time-token-wrap" >
                    <div className="bg-img">
                        <svg width={0} height={0} viewBox="5 22 570 860" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f)">
                                <path d="M534 865C537.314 865 540 862.314 540 859L540 617.703C540 565.417 476.706 516.872 372.765 489.435C350.838 483.648 331.573 476.192 315.897 467.439L292.926 454.609C291.107 453.593 288.892 453.593 287.074 454.609L264.103 467.439C248.441 476.192 229.162 483.648 207.235 489.435C103.294 516.872 40 565.417 40 617.703L40 859" fill="#242424" />
                            </g>
                            <path d="M46.0001 38.9999C42.6864 38.9999 40.0001 41.6862 40.0001 44.9999L40.0001 286.867C40.0001 339.273 103.294 387.93 207.235 415.43C229.162 421.23 248.427 428.703 264.103 437.477L287.069 450.334C288.89 451.353 291.11 451.353 292.931 450.334L315.897 437.477C331.559 428.703 350.838 421.23 372.765 415.43C476.706 387.93 540 339.273 540 286.867L540 44.9999" fill="black" />
                            <g filter="url(#filter1_f)">
                                <path d="M46.0001 39.9999C42.6864 39.9999 40.0001 42.6862 40.0001 45.9999L40.0001 287.867C40.0001 340.273 103.294 388.93 207.235 416.43C229.162 422.23 248.427 429.703 264.103 438.477L287.069 451.334C288.89 452.353 291.11 452.353 292.931 451.334L315.897 438.477C331.559 429.703 350.838 422.23 372.765 416.43C476.706 388.93 540 340.273 540 287.867L540 46" stroke="black" strokeWidth={10} strokeMiterlimit={10} />
                                <path d="M46.0001 39.9999C42.6864 39.9999 40.0001 42.6862 40.0001 45.9999L40.0001 287.867C40.0001 340.273 103.294 388.93 207.235 416.43C229.162 422.23 248.427 429.703 264.103 438.477L287.069 451.334C288.89 452.353 291.11 452.353 292.931 451.334L315.897 438.477C331.559 429.703 350.838 422.23 372.765 416.43C476.706 388.93 540 340.273 540 287.867L540 46" stroke="url(#paint0_linear)" strokeWidth={10} strokeMiterlimit={10} />
                            </g>
                            <g filter="url(#filter2_f)">
                                <path d="M534 865C537.314 865 540 862.314 540 859L540 617.703C540 565.417 476.706 516.872 372.765 489.435C350.838 483.648 331.573 476.192 315.897 467.439L292.926 454.609C291.107 453.593 288.892 453.593 287.074 454.609L264.103 467.439C248.441 476.192 229.162 483.648 207.235 489.435C103.294 516.872 40 565.417 40 617.703L40 859" stroke="black" strokeWidth={10} strokeMiterlimit={10} />
                                <path d="M534 865C537.314 865 540 862.314 540 859L540 617.703C540 565.417 476.706 516.872 372.765 489.435C350.838 483.648 331.573 476.192 315.897 467.439L292.926 454.609C291.107 453.593 288.892 453.593 287.074 454.609L264.103 467.439C248.441 476.192 229.162 483.648 207.235 489.435C103.294 516.872 40 565.417 40 617.703L40 859" stroke="url(#paint1_linear)" strokeWidth={10} strokeMiterlimit={10} />
                            </g>
                            <path d="M46.0001 38.9999C42.6864 38.9999 40.0001 41.6862 40.0001 44.9999L40.0001 286.867C40.0001 339.273 103.294 387.93 207.235 415.43C229.162 421.23 248.427 428.703 264.103 437.477L287.069 450.334C288.89 451.353 291.11 451.353 292.931 450.334L315.897 437.477C331.559 428.703 350.838 421.23 372.765 415.43C476.706 387.93 540 339.273 540 286.867L540 44.9999" fill="url(#paint2_linear)" />
                            <path d="M40.0001 286.867L40.0001 44.9999C40.0001 41.6862 42.6864 38.9999 46.0001 38.9999L534 39C537.314 39 540 41.6862 540 45L540 286.867C540 339.273 476.706 387.93 372.765 415.43C350.838 421.23 331.559 428.703 315.897 437.477L292.931 450.334C291.11 451.353 288.89 451.353 287.069 450.334L264.103 437.477C248.427 428.703 229.162 421.23 207.235 415.43C103.294 387.93 40.0001 339.273 40.0001 286.867Z" stroke="black" strokeWidth={10} strokeMiterlimit={10} />
                            <path d="M40.0001 286.867L40.0001 44.9999C40.0001 41.6862 42.6864 38.9999 46.0001 38.9999L534 39C537.314 39 540 41.6862 540 45L540 286.867C540 339.273 476.706 387.93 372.765 415.43C350.838 421.23 331.559 428.703 315.897 437.477L292.931 450.334C291.11 451.353 288.89 451.353 287.069 450.334L264.103 437.477C248.427 428.703 229.162 421.23 207.235 415.43C103.294 387.93 40.0001 339.273 40.0001 286.867Z" stroke="url(#paint3_linear)" strokeWidth={10} strokeMiterlimit={10} />
                            <path d="M534 864C537.314 864 540 861.314 540 858L540 616.703C540 564.417 476.706 515.872 372.765 488.435C350.838 482.648 331.573 475.192 315.897 466.439L292.926 453.609C291.107 452.593 288.892 452.593 287.074 453.609L264.103 466.439C248.441 475.192 229.162 482.648 207.235 488.435C103.294 515.872 40 564.417 40 616.703L40 858" fill="url(#paint4_linear)" />
                            <path d="M540 616.703L540 858C540 861.314 537.314 864 534 864H46C42.6863 864 40 861.314 40 858L40 616.703C40 564.417 103.294 515.872 207.235 488.435C229.162 482.648 248.441 475.192 264.103 466.439L287.074 453.609C288.892 452.593 291.107 452.593 292.926 453.609L315.897 466.439C331.573 475.192 350.838 482.648 372.765 488.435C476.706 515.872 540 564.417 540 616.703Z" stroke="black" strokeWidth={10} strokeMiterlimit={10} />
                            <path d="M540 616.703L540 858C540 861.314 537.314 864 534 864H46C42.6863 864 40 861.314 40 858L40 616.703C40 564.417 103.294 515.872 207.235 488.435C229.162 482.648 248.441 475.192 264.103 466.439L287.074 453.609C288.892 452.593 291.107 452.593 292.926 453.609L315.897 466.439C331.573 475.192 350.838 482.648 372.765 488.435C476.706 515.872 540 564.417 540 616.703Z" stroke="url(#paint5_linear)" strokeWidth={10} strokeMiterlimit={10} />
                            <path d="M529.074 859.072C532.358 859.032 535 856.357 535 853.072L535 650.13C535 606.027 557.442 540.171 371.837 541.788C371.37 541.792 370.873 541.738 370.415 541.646C349.268 537.432 333.077 561.325 317.88 554.011L295.104 543.047C293.459 542.256 291.543 542.256 289.899 543.047L267.122 554.011C252.038 561.277 231.114 537.741 210.001 541.568C209.267 541.701 208.508 541.737 207.77 541.628C115.829 528.13 33.5468 544.43 45.0003 650.13L45.0003 858.925" fill="#242424" />
                            <path d="M291.53 491C286.82 491 283 494.81 283 499.53V508.06C283 512.78 286.82 516.59 291.53 516.59C296.24 516.59 300.06 512.78 300.06 508.06V499.53C300.07 494.81 296.24 491 291.53 491Z" fill="#242424" />
                            <path d="M515.94 573.471C510.745 559.852 485.171 534.551 454 528C449.8 527.114 445.406 526.193 440.915 525.219C414.891 519.583 376.788 527.999 338.699 527.999H240.283C202.217 527.999 178.524 522.363 152.5 527.998C148.009 528.973 124.7 531.113 120.5 531.999C89.3049 538.555 68.2364 559.856 63.0655 573.476C62.6043 574.642 64.5949 575.794 68.5034 576.655C72.4362 577.512 77.9226 577.999 83.7004 577.999H495.281C501.034 577.999 506.545 577.512 510.478 576.651C514.411 575.794 516.377 574.637 515.94 573.471Z" fill="#242424" />
                            <path d="M535 45V286.87C535 296.6 532.6 306.33 527.88 315.89C525.75 320.2 522.02 323.52 517.46 325.05C494 332.91 439.77 342.52 381.5 372C381.5 372 342.92 389.96 329.78 400.72C320.28 408.5 315.87 415.22 315.87 415.22C310.38 422.16 306.07 430.2 303.05 438.94C301.55 443.26 300.37 447.76 299.52 452.38C298.47 458.12 297.93 464.05 297.93 470.09C297.93 475.57 294.42 480 290.1 480C285.78 480 282.28 475.57 282.28 470.09C282.28 464.09 281.75 458.2 280.71 452.5C279.87 447.88 278.7 443.39 277.21 439.08C274.19 430.28 276.23 425.01 256.47 405.25C237.38 386.16 127.33 371.58 75.17 343.67C71.58 341.75 68.39 339.17 65.73 336.09C52.09 320.27 45 303.57 45 286.87V45C45 44.45 45.45 44 46 44H534C534.55 44 535 44.45 535 45Z" fill="#242424" />
                            <path d="M35 40C35 36.6863 37.6863 34 41 34H539C542.314 34 545 36.6863 545 40V83H35V40Z" fill="#A2DEA4" />
                            <path d="M35 40C35 36.6863 37.6863 34 41 34H539C542.314 34 545 36.6863 545 40V83H35V40Z" fill="url(#paint6_linear)" />
                            <defs>
                                <filter id="filter0_f" x={5} y="418.848" width={570} height="481.153" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feGaussianBlur stdDeviation="17.5" result="effect1_foregroundBlur" />
                                </filter>
                                <filter id="filter1_f" x={0} y={0} width={580} height="492.098" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feGaussianBlur stdDeviation="17.5" result="effect1_foregroundBlur" />
                                </filter>
                                <filter id="filter2_f" x={0} y="413.848" width={580} height="491.153" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feGaussianBlur stdDeviation="17.5" result="effect1_foregroundBlur" />
                                </filter>
                                <linearGradient id="paint0_linear" x1="286.648" y1="671.265" x2="726.347" y2="178.097" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#F1FC68" />
                                    <stop offset={1} stopColor="#5EC4D6" />
                                </linearGradient>
                                <linearGradient id="paint1_linear" x1="293.352" y1="235.186" x2="-145.219" y2="728.223" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#F1FC68" />
                                    <stop offset={1} stopColor="#5EC4D6" />
                                </linearGradient>
                                <linearGradient id="paint2_linear" x1={790} y1="245.487" x2="384.462" y2="-245.508" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#5BCCBD" stopOpacity="0.14902" />
                                    <stop offset="0.333333" stopColor="#61C0BF" stopOpacity="0.14902" />
                                    <stop offset="0.744946" stopColor="#55BCC8" stopOpacity="0.14902" />
                                    <stop offset={1} stopColor="#69CFB8" stopOpacity="0.14902" />
                                </linearGradient>
                                <linearGradient id="paint3_linear" x1="286.648" y1="670.265" x2="726.347" y2="177.097" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#F1FC68" />
                                    <stop offset={1} stopColor="#5EC4D6" />
                                </linearGradient>
                                <linearGradient id="paint4_linear" x1={-210} y1="657.987" x2="194.428" y2="1148.77" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#5BCCBD" stopOpacity="0.14902" />
                                    <stop offset="0.333333" stopColor="#61C0BF" stopOpacity="0.14902" />
                                    <stop offset="0.744946" stopColor="#55BCC8" stopOpacity="0.14902" />
                                    <stop offset={1} stopColor="#69CFB8" stopOpacity="0.14902" />
                                </linearGradient>
                                <linearGradient id="paint5_linear" x1="293.352" y1="234.186" x2="-145.219" y2="727.223" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#F1FC68" />
                                    <stop offset={1} stopColor="#5EC4D6" />
                                </linearGradient>
                                <linearGradient id="paint6_linear" x1="290.36" y1="9.93359" x2="281.15" y2="106.655" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#5EC4D6" />
                                    <stop offset={1} stopColor="#C4EB89" />
                                    <stop offset={1} stopColor="#F1FC68" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="time-token" >
                        <div className="stake" onClick={this.handleStake}>stake here</div>
                        <div className="title">timetoken</div>
                        <div className="apy">30% apy</div>
                        <div className="grad-wrap get-timetoken" onClick={this.handlePopup}>
                            <div className="grad">
                                Get TimeToken
                        </div>
                        </div>
                        <div className="single">Single asset staking</div>
                        <div className="time-text">
                            Time is<br />
                        Too slow for those who wait,<br />
                        Too swift for those who fear,<br />
                        Too long for those who grieve,<br />
                        Too short for those who rejoice,<br />
                        But for DEUS , your time is<br />
                        Eternity.<br />
                        </div>
                    </div>
                </div>
            </div >
        </>);
    }
}

export default TimeToken;