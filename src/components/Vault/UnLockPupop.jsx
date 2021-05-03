import React, { Component } from 'react';
import { contractEndpoint } from '../../config';
import { withTranslation } from 'react-i18next'
import addrs from '../../services/addresses.json'
import InputBox from './Input';

class UnLockPupop extends Component {
    state = {
        tokenAmount: "",
        sandAmount: "",
        timeAmount: "",
        locked: "",
        oldApprove: this.props.approved,
        typingTimeout: null
    }

    componentDidMount() {
        this.setState({ locked: this.props.locked })
    }

    handleTyping = () => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }
    }

    handleChange = (typeAmount) => async (amount) => {
        this.handleTyping()
        const { getSandAndTime } = this.props
        this.setState({ [typeAmount]: amount ? amount.toString() : "" })

        this.setState({
            typingTimeout: setTimeout(async () => {
                try {
                    const data = await getSandAndTime(amount);
                    this.setState({
                        sandAmount: data[0], timeAmount: data[1]
                    })
                } catch (error) {

                }

            }, 750)
        })
    }

    handleToggle = () => {
        const { locked } = this.state
        this.setState({ locked: !locked, sandAmount: "", tokenAmount: "" })
    }

    render() {
        const { handleClose, token, sandToken, timeToken, approved, handleApprove, handleSwap, vault,t } = this.props
        const { tokenAmount, timeAmount, sandAmount, locked, oldApprove } = this.state

        const lockedClasses = !locked ? "unlocked" : "locked"
        const isActive = tokenAmount !== "" && tokenAmount !== "0"
        const swapLeftClasses = !approved && isActive ? "" : "disabled"
        const swapRightClasses = approved && isActive ? "" : "disabled"
        const approvedClasses = approved ? "approved" : ""


        return (<div className={`lock-swap ${lockedClasses}`} >
            <div className="top">
                <div className="close-btn" onClick={handleClose}>{t("close")}</div>
                <div className="time-vaults">{t("timeVaultsLocked")}</div>
                <div className="token" >{token.title}</div>
                {locked && <div className="locked-text" style={{ opacity: 0 }}> Your tokens will be locked until 01.06.2021 </div>}
                <a href={contractEndpoint + "/" + addrs["vaults"][vault.name]["1"]} className={`contract  ${lockedClasses}`} target="_blank" rel="noopener noreferrer"  >{t("showContract")}</a>

                {locked ? <InputBox
                    token={token}
                    amount={tokenAmount}
                    title={"From"}
                    handleChange={this.handleChange("tokenAmount")}
                    max={true}
                />
                    : <InputBox
                        token={sandToken}
                        amount={sandAmount}
                        title={"From"}
                        tokenTitle={"Sand Token"}
                        handleChange={this.handleChange("sandAmount")}
                        max={true}
                    />
                }

                <svg width={368} height={163} viewBox="0 20 368 170" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M367.699 14.5C367.699 6.5 363.643 5.20656 355.774 5.20656C315.106 5.20656 208.017 10.0107 193.963 10.0107C182.419 10.0107 155.315 7.86695 142.317 7.86695C132.466 12.27 4.7628 -8.52678 2.04796 4.15947C1.34174 7.45882 1.22251 9.59643 1.22251 9.59643C1.10328 11.5482 -0.562823 13.2806 0.198431 15C7.53582 31.4619 138.483 79.8254 150.663 95.2534L158.523 105.221C170.098 119.859 176.472 139.353 176.472 160.09C176.472 165.574 179.976 170 184.296 170C188.616 170 192.119 165.574 192.119 160.09C192.119 139.365 198.494 119.871 210.059 105.221L217.929 95.2418C219.864 92.8021 239.199 72.5 239.199 72.5C297.199 31 372.199 27 367.699 14.5Z" fill="currentColor" />
                    <path d="M184.667 65.4063L187.831 61.4808C188.416 60.7523 189.462 61.238 189.462 62.2497V62.2578C189.462 62.5492 189.365 62.8325 189.187 63.0429L184.398 68.6682C184.027 69.1052 183.428 69.1052 183.064 68.6682L178.275 63.0348C178.096 62.8244 178 62.5411 178 62.2497C178 61.2461 179.046 60.7523 179.631 61.4889L182.788 65.4063L182.761 53.117C182.761 52.5018 183.187 52 183.71 52H183.745C184.268 52 184.687 52.5018 184.687 53.117L184.667 65.4063Z" fill="white" />
                </svg>

            </div>

            <div className="bottom ">

                {locked ?
                    <InputBox
                        token={sandToken}
                        amount={sandAmount}
                        title={"To"}
                        disabled={true}
                        // tokenTitle={"Sand Token2"}
                        svg={<svg style={{ marginRight: "10px" }} width={25} height={26} viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12.3944" cy="12.8944" r="12.3944" fill="#CECECE" fillOpacity="0.5" />
                            <circle cx="12.3944" cy="12.8944" r="12.3944" fill="url(#paint0_linear)" />
                            <defs>
                                <linearGradient id="paint0_linear" x1="12.4119" y1="-11.675" x2="-12.2743" y2="13.2331" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.587669" stopColor="#5EC4D6" />
                                    <stop offset="1" stopColor="#F1FC68" />
                                </linearGradient>
                            </defs>
                        </svg>}
                        handleChange={this.handleChange("sandAmount")}
                    /> :
                    <InputBox
                        token={token}
                        amount={tokenAmount}
                        title={"To"}
                        disabled={true}
                        handleChange={this.handleChange("tokenAmount")}
                    />
                }

                {locked && <InputBox
                    token={timeToken}
                    amount={timeAmount}
                    disabled={true}
                    title={"And"}
                    tokenTitle={"Time"}
                    svg={<svg style={{ marginRight: "10px" }} width={25} height={26} viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12.3944" cy="12.8944" r="12.3944" fill="#CECECE" fillOpacity="0.5" />
                        <circle cx="12.3944" cy="12.8944" r="12.3944" fill="url(#paint1_linear)" />
                        <defs>
                            <linearGradient id="paint1_linear" x1="12.4119" y1="-11.675" x2="-12.2743" y2="13.2331" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00D9FF" />
                                <stop offset="1" stopColor="#F1FC68" />
                            </linearGradient>
                        </defs>
                    </svg>}
                    handleChange={this.handleChange("timeAmount")}
                />}

                {!locked &&
                    <div className="text">
                        Your tokens are still locked until block #11219221 which is roughly the 01.06.2021
                    </div>
                }



                {!oldApprove && <> <div className={`btns ${approvedClasses}`}>
                    <div className=" grad-wrap swap-btn-wrap ">
                        <div className={`swap-btn  ${swapLeftClasses}`} onClick={() => handleApprove(tokenAmount)}>{t("approve")}</div>
                    </div>

                    <div className=" grad-wrap swap-btn-wrap  ">
                        <div className={`swap-btn  ${swapRightClasses}`} onClick={() => handleSwap(tokenAmount)}>{locked ? t("lockAndMint") : "UnLock"}</div>
                    </div>
                </div>
                    <div className={`stepper ${approvedClasses}`}>
                        <div className="cyc">1</div>
                        <div className="line"></div>
                        <div className="cyc">2</div>
                    </div>

                </>}

                {oldApprove && <div className="btns">
                    <div className=" grad-wrap swap-btn-wrap " style={{ margin: "auto", marginTop: "15px" }} >
                        <div className={`swap-btn  ${swapRightClasses}`} onClick={() => handleSwap(tokenAmount)}>{locked ?t("lockAndMint")  : "UnLock"}</div>
                    </div>
                </div>
                }

            </div>
        </div>);
    }
}

export default withTranslation()(UnLockPupop);