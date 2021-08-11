import React, { useState, useCallback, useEffect } from 'react';
import { Type } from '../../Text';
import styled from 'styled-components'
import ClaimButton from './ClaimButton';
import Popup from './Popup';
import { useDeposit, useStakingInfo, useTokenInfo, useWithdraw } from '../../../../hooks/useDei';
import { isZero } from '../../../../constant/number';
import BigNumber from 'bignumber.js';
import { useApprove } from '../../../../hooks/useApprove';

const Wrapper = styled.div`
    display: inline-block;
    vertical-align: middle;
    font-family: Monument Grotesk;
    font-weight: 400;
    color: #ffffff;
    min-height: 350px;
    max-width: 450px;
    width: 100%;
    background: #0d0d0d;
    border-radius: 7px;
    box-shadow: 0px 0px 13px 1px #9be0fb;
`
const ActionWrap = styled.div`
    display: flex;
    justify-content: space-between;
    color: #fffefe;
`

const ActionContainer = styled.div`
    width: 49.8%;
    border-radius: 0;
    color:#fff;
    font-size: 18px;
    align-items: center;
    display: flex;
    justify-content: center;
    height: 48px;
    cursor: pointer;
    background: ${({ theme }) => theme.grad_dei};
    padding: 2px;
`
const Action = styled.div`
    width:100%;
    border-radius: 0;
    height: 100%;
    background: #111111;
    color:#fff;
    font-size: 18px;
    align-items: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
    :hover{
        color: #111111;
        background: transparent;
    }
    padding: 2px;
`
const Staking = ({ config }) => {

    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const [depositInput, setDepositInput] = useState("")
    const [withdrawAmount, setWithdrawAmount] = useState("")

    const [activeWithdraw, setActiveWithdraw] = useState(false)
    const [activeDeposit, setActiveDeposit] = useState(false)
    const stakingInfo = useStakingInfo(config)
    const { depositAmount, pendingReward } = stakingInfo
    const tokens = useTokenInfo(config)
    const { depositTokenWalletBalance, totalDepositBalance, allowance } = tokens

    useEffect(() => {
        const check = () => {
            if (isPreApproved == null) {
                if (allowance.toString() === "-1") {
                    setIsPreApproved(null) //doNothing
                } else {
                    if (allowance.gt(0)) {
                        setIsPreApproved(true)
                    } else {
                        setIsPreApproved(false)
                    }
                }
            } else {
                if (allowance.gt(0)) {
                    setIsApproved(true)
                }
            }
        }
        if (allowance)
            check()
        //eslint-disable-next-line 
    }, [allowance])


    const { onApprove } = useApprove(config.depositToken, config.stakingContract, 4)
    const { onDeposit } = useDeposit(config.depositToken, depositAmount, config.stakingContract, 4)
    const { onWithdraw } = useWithdraw(config.depositToken, withdrawAmount, config.stakingContract, 4)
    const { onWithdraw: onClaim } = useWithdraw(config.depositToken, "0", config.stakingContract, 4)

    const handleApprove = useCallback(async () => {
        try {
            setApproveLoading(true)
            const tx = await onApprove()
            if (tx.status) {
                setIsApproved(new BigNumber(tx.events.Approval.raw.data, 16).gt(0))
            } else {
                console.log("Approved Failed");
            }
            setApproveLoading(false)

        } catch (e) {
            setApproveLoading(false)
            console.error(e)
        }
    }, [onApprove])

    const handleWithdraw = useCallback(async () => {
        try {
            const tx = await onWithdraw()
            if (tx.status) {
                setWithdrawAmount("")
            } else {
                console.log("onWithdraw Failed");
            }
        } catch (e) {
            setWithdrawAmount("")
            console.error(e)
        }
    }, [onWithdraw])

    const handleClaim = useCallback(async () => {
        try {
            const tx = await onClaim()
            if (tx.status) {
            } else {
                console.log("onClaim Failed");
            }
        } catch (e) {
            console.error(e)
        }
    }, [onClaim])


    const handleDeposit = useCallback(async () => {
        try {
            const tx = await onDeposit()
            if (tx.status) {
                setDepositInput("")
                setActiveDeposit(false)
            } else {
                console.log("setDepositAmount Failed");
            }
        } catch (e) {
            setDepositInput("")
            console.error(e)
        }
    }, [onDeposit])


    const percent = isZero(totalDepositBalance) ?
        "0.0" :
        new BigNumber(depositAmount).div(totalDepositBalance).times(100).toFixed(2)

    //isPreApproved ?

    return (
        <Wrapper>
            <Popup
                active={activeWithdraw}
                setActive={setActiveWithdraw}
                amount={withdrawAmount}
                setAmount={setWithdrawAmount}
                title={"Withdraw " + stakingInfo.title}
                balance={depositAmount || "0"}
                buttonText="WITHDRAW"
                isPreApproved={true}
                isApproved={true}
                loading={false}
                handleApprove={undefined}
                handleAction={handleWithdraw}
            />
            <Popup
                active={activeDeposit}
                setActive={setActiveDeposit}
                title={"Stake " + stakingInfo.title}
                amount={depositInput}
                setAmount={setDepositInput}
                balance={depositTokenWalletBalance}
                buttonText="STAKE"
                isPreApproved={isPreApproved}
                isApproved={isApproved}
                loading={approveLoading}
                handleApprove={handleApprove}
                handleAction={handleDeposit}
            />
            <ActionWrap>
                <ActionContainer style={{ borderRadius: "6px 0 0 0" }} >
                    <Action style={{ borderRadius: "6px 0 0 0" }}>Mint</Action>
                </ActionContainer>
                <ActionContainer style={{ borderRadius: " 0  6px 0 0" }}>
                    <Action style={{ borderRadius: "0  6px 0 0" }} onClick={() => setActiveDeposit(true)}>Stake Here</Action>
                </ActionContainer>
            </ActionWrap>
            <Type.XXL mb="4" mt="4">{stakingInfo.title}</Type.XXL>
            <Type.LG mt="3" mb="3">0.00% APY</Type.LG>
            <Type.MD mt="2" mb="4" >you own {percent}% of the pool</Type.MD>
            <ClaimButton actionTitle="claim" symbol="DEUS" amountTitle="claimable" amount={pendingReward} onAction={handleClaim} />
            <ClaimButton actionTitle="withdraw & claim" symbol="DEI-HUSD-LP" amountTitle="deposited" amount={depositAmount} onAction={() => setActiveWithdraw(true)} />
        </Wrapper>
    );
}
export default Staking
