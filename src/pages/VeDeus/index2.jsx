import React, { useState, useMemo, useEffect, useCallback } from 'react';
import DatePicker from "react-datepicker";
import { useWeb3React } from '@web3-react/core';
import { ZERO, isZero } from '../../constant/number';
import { useVeDEUSInfo } from '../../hooks/useVeDeus';
import useTokenBalance from '../../hooks/useTokenBalance';
import { DEUS_ADDRESS, VE_DEUS_ADDRESS } from '../../constant/contracts';
import { useApprove } from '../../hooks/useApprove';
import { useAllowance } from '../../hooks/useDei';
import BigNumber from 'bignumber.js';
import { useLock } from '../../hooks/useLock';
import styled from 'styled-components';
import { getFullDisplayBalance } from '../../helper/formatBalance';
import { formatBalance3 } from '../../utils/utils';
import { deusToken } from '../../constant/token';
import ItemInfo from '../../components/App/VeDeus/ItemInfo';
import { Lock, Clock, BarChart, Calendar, Star, User, ShoppingBag, Smile, Trello, BarChart2, Info } from 'react-feather';
import ReactTooltip from "react-tooltip";
import "./style.scss";
import "react-datepicker/dist/react-datepicker.css";

const minTimeStamp = 86400 * (7 * 1);
const ConnectWallet = styled.div`
`
const VeDeus = () => {
    const { account, chainId } = useWeb3React();
    const [deusAmount, setDeusAmount] = useState(ZERO);
    const [periodLevel, setPeriodLevel] = useState(0);

    const {
        veDeusBalance,
        veDeusTotalSupply,
        lockedDeus,
        totalDeus,
        lockedEnd,
        deus_amt
    } = useVeDEUSInfo();

    const minDate = useMemo(() => {
        if (lockedEnd === 0) {
            return new Date(new Date().getTime() + minTimeStamp * 1000);
        } else {
            return new Date(lockedEnd * 1000 + 86400 * 7 * 1000);
        }
    }, [lockedEnd]);

    const maxDate = new Date(
        Math.floor(new Date().getTime() / 86400 / 1000) * 86400 * 1000 +
        3600 * 24 * (365 * 4) * 1000
    );

    const [selectedDate, setSelectedDate] = useState(minDate);

    const unlockTime = useMemo(() => {
        return Math.floor(selectedDate.getTime() / 1000);
    }, [selectedDate]);

    const { onApprove } = useApprove(deusToken[chainId], VE_DEUS_ADDRESS[chainId], chainId);
    const allowance = useAllowance(deusToken[chainId], VE_DEUS_ADDRESS[chainId], chainId);
    let deusBalance = useTokenBalance(DEUS_ADDRESS[chainId]);
    deusBalance = getFullDisplayBalance(deusBalance, 18)

    const {
        onCreateLock,
        onIncreaseAmount,
        onIncreaseUnlockTime,
        onWithdraw,
        isLoading,
    } = useLock(deusAmount, unlockTime, lockedEnd);

    const handleApprove = useCallback(async () => {
        try {
            const tx = await onApprove()
            if (tx.status) {
                console.log("Approved");
            } else {
                console.log("Approve Failed");
            }
        } catch (e) {
            console.error(e)
        }
    }, [onApprove])


    const lockStatus = useMemo(() => {
        if (lockedEnd === 0) {
            return "create";
        } else if (lockedEnd * 1000 > new Date().getTime()) {
            return "increase";
        } else {
            return "withdraw";
        }
    }, [lockedEnd]);



    const onExchange = (e) => {
        setDeusAmount(BigNumber.min(new BigNumber(e.target.value), deusBalance));
    };

    const isWeekday = (date) => {
        return 4 === date.getDay(date);
    };

    useEffect(() => {
        let timestamp = 0;
        if (periodLevel < 0) return;
        switch (periodLevel) {
            case 0:
                timestamp = minTimeStamp;
                break;
            case 1:
                timestamp = 3600 * 24 * (30 * 2);
                break;
            case 2:
                timestamp = 3600 * 24 * 365;
                break;
            case 3:
                timestamp = 3600 * 24 * (365 * 2);
                break;
            case 4:
                timestamp = 3600 * 24 * (365 * 4);
                break;

            default:
                break;
        }
        let period;
        if (lockedEnd === 0) {
            period = new Date().getTime() + timestamp * 1000;
        } else {
            if (periodLevel === 3) {
                period = new Date().getTime() + timestamp * 1000;
            } else {
                period = lockedEnd * 1000 + timestamp * 1000;
            }
        }
        period = new Date(Math.floor(period / 86400 / 1000) * 86400 * 1000);
        setSelectedDate(period.getTime() > maxDate.getTime() ? maxDate : period);
    }, [periodLevel, lockedEnd]);

    let vv = new BigNumber(veDeusTotalSupply).minus(deus_amt)
    vv = vv.div(3)

    return (
        <>
            <div className="xlqdr-wrap">
                <div className="content-wrapper">
                    <div className="xlqdr-intro">
                        <div className="xlqdr-intro-left">
                            <div className="xlqdr-intro-title">veDEUS</div>
                            <div className="xlqdr-intro-para">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae voluptas libero veniam consequatur consectetur ex eos debitis. Accusantium, ipsa beatae alias, repudiandae illum repellat sunt error suscipit ducimus necessitatibus id.
                            </div>
                            <div className="xlqdr-total">
                                <ItemInfo Icon={Lock} label={"Total Locked DEUS"} value={totalDeus.toFormat(3)} />
                                <ItemInfo Icon={Clock} label={"Average Lock Time"} value={<div className="item-value">
                                    <span>
                                        {totalDeus.isZero()
                                            ? "0.00"
                                            : new BigNumber(4 * 365)
                                                .div(totalDeus)
                                                .times(vv)
                                                .toFormat(0)}
                                    </span>
                                    <span className="days-item" style={{ fontSize: "15px", marginLeft: "5px" }}>days</span>
                                </div>} />

                                <ItemInfo Icon={BarChart} label={"Total veDEUS"} value={veDeusTotalSupply.toFormat(6)} />
                            </div>
                        </div>

                    </div>
                    {!isZero(lockedDeus) && <div className="card-wrapper xlqdr-yours">
                        <div className="xlqdr-yours-body xlqdr-yours-refine">
                            <ItemInfo Icon={User} label={"Your Locked DEUS"} value={!account ? "-" : lockedDeus.toFormat(3)} />
                            <ItemInfo Icon={Calendar} label={"Locked Until"}
                                value={lockStatus === "increase" ? new Date(lockedEnd * 1000).toISOString().split("T")[0] : "-"}
                            />
                            <ItemInfo Icon={BarChart2} label={"Your veDEUS"} value={!account ? "-" : veDeusBalance.toFormat(6)} />
                        </div>
                    </div>}

                    <div className="xlqdr-action">
                        <div className="xlqdr-action-left-wrap">
                            <div className="xlqdr-action-generate card-wrapper">
                                <div className="card-wrapper-title">Generate veDEUS</div>
                                <div className="action-para-top">
                                    <div className="label">Your DEUS</div>
                                    <div className="value">
                                        {!account
                                            ? "-"
                                            : formatBalance3(deusBalance)
                                        }{" "}
                                        DEUS
                                    </div>
                                </div>
                                <div className="action-para">
                                    <div className="action-para-body">
                                        <input
                                            type="number"
                                            placeholder="0.0"
                                            value={deusAmount.toString(10)}
                                            onChange={(e) => onExchange(e)}
                                        />
                                        <div
                                            className="max-btn"
                                            onClick={() => setDeusAmount(deusBalance)}
                                        >
                                            Max
                                        </div>
                                    </div>
                                </div>

                                {lockStatus === "increase" &&
                                    (account ? (
                                        <div className="lock-btn">
                                            {allowance.gt(0) ? (
                                                <div
                                                    className={`lq-button ${isLoading ? "grey-button" : "blue-button"
                                                        }`}
                                                    onClick={() => onIncreaseAmount()}
                                                >
                                                    Increase Amount
                                                </div>
                                            ) : (
                                                <div
                                                    className="lq-button blue-button"
                                                    onClick={() => onApprove()}
                                                >
                                                    Approve
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="lock-btn">
                                            <ConnectWallet />
                                        </div>
                                    ))}
                                <div className="action-para-top">
                                    <div className="label">Lock until </div>
                                </div>
                                <div className="action-para">
                                    <div className="action-para-body" style={{ cursor: "pointer" }}>
                                        <DatePicker
                                            selected={selectedDate}
                                            dateFormat="yyyy/MM/dd"
                                            filterDate={isWeekday}
                                            onChange={(date) => {
                                                if (periodLevel >= 0) {
                                                    setPeriodLevel(-1);
                                                }
                                                if (date.getTime() === selectedDate.getTime()) {
                                                    return;
                                                }
                                                setSelectedDate(
                                                    new Date(Math.floor(date.getTime() / 1000 / 7 / 86400)
                                                        * 7 * 86400 * 1000)
                                                );
                                            }}
                                            minDate={minDate}
                                            maxDate={maxDate}
                                            showMonthDropdown
                                        />
                                        <div style={{ marginRight: "10px" }}>
                                            <Info size={25} data-tip data-for='happyFace' color="#ffffff" />
                                            <ReactTooltip id='happyFace' place="top" effect="solid" type="info">
                                                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis tenetur voluptas necessitatibus..</span>
                                            </ReactTooltip>
                                        </div>
                                    </div>
                                </div>
                                <div className="action-para-top">
                                    <div className="label">
                                        {lockStatus === "increase" ? "Extend" : "Lock"} for
                                    </div>
                                </div>
                                <div className="action-extend">
                                    <div
                                        className="extend-item"
                                        onClick={() => setPeriodLevel(0)}
                                    >
                                        2 Weeks
                                    </div>
                                    <div
                                        className="extend-item"
                                        onClick={() => setPeriodLevel(1)}
                                    >
                                        2 Months
                                    </div>
                                    <div
                                        className="extend-item"
                                        onClick={() => setPeriodLevel(2)}
                                    >
                                        1 Year
                                    </div>
                                    <div
                                        className="extend-item"
                                        onClick={() => setPeriodLevel(3)}
                                    >
                                        2 Years
                                    </div>
                                    <div
                                        className="extend-item"
                                        onClick={() => setPeriodLevel(4)}
                                    >
                                        4 Years
                                    </div>
                                </div>
                                <div className="bottom-btn">
                                    {lockStatus === "increase" &&
                                        (account ? (
                                            <>
                                                <div
                                                    className={`lq-button ${isLoading || lockedEnd >= unlockTime
                                                        ? "grey-button"
                                                        : "blue-button"
                                                        }`}
                                                    onClick={() => onIncreaseUnlockTime()}
                                                >
                                                    Extend Period
                                                </div>
                                                <div className="max-period">
                                                    DEUS lock can be 4 years max.
                                                </div>
                                            </>
                                        ) : (
                                            <ConnectWallet />
                                        ))}
                                    {lockStatus === "create" &&
                                        (account ? (
                                            allowance.gt(0) ? (
                                                <div
                                                    className={`lq-button ${isLoading ? "grey-button" : "blue-button"
                                                        }`}
                                                    onClick={() => onCreateLock()}
                                                >
                                                    Lock DEUS
                                                </div>
                                            ) : (
                                                <div
                                                    className="lq-button blue-button"
                                                    onClick={() => {
                                                        console.log("approve called");
                                                        handleApprove()
                                                    }}
                                                >
                                                    Approve
                                                </div>
                                            )
                                        ) : (
                                            <ConnectWallet />
                                        ))}
                                </div>
                            </div>

                        </div>

                        <div className="xlqdr-action-generate card-wrapper withdraw-wrapper ">
                            <div className="card-wrapper-title">Withdraw DEUS</div>
                            <div className="lqdr-label">Available DEUS</div>
                            <div className="lqdr-value">
                                {!account ? "-" : lockedDeus.toFormat(3)}
                            </div>
                            <div className="bottom-btn">
                                {account ? (
                                    lockStatus === "withdraw" ? (
                                        <div
                                            className={`lq-button ${isLoading ? "grey-button" : "blue-button"
                                                }`}
                                            onClick={() => onWithdraw()}
                                        >
                                            Withdraw
                                        </div>
                                    ) : (
                                        <div className={`lq-button ${"grey-button"}`}>
                                            Withdraw{" "}
                                        </div>
                                    )
                                ) : (
                                    <ConnectWallet />
                                )}
                            </div>
                            {account && lockStatus !== "withdraw" && (
                                <p className="withdraw-warning">
                                    Once your lock expired, you'll be able to claim your DEUS.
                                    {lockStatus === "increase" &&
                                        new Date(lockedEnd * 1000).toISOString().split("T")[0]}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default VeDeus;