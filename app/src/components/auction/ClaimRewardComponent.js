import { EuiButton, EuiText } from "@elastic/eui";
import { useWeb3React } from "@web3-react/core";
import React, { useContext, useEffect, useState } from "react";
import { FactoryContext } from "../contexts/ContextComponents";

function ClaimRewardComponent(props) {
    const {account, library: web3} = useWeb3React();
    const auction = props.auction;
    const factory = useContext(FactoryContext);
    const [remainedPendingTime, setRemainedPendingTime] = useState(1);
    const [tutorShare, setTutorShare] = useState(0);

    async function handleClick() {
        await factory.methods.claimReward().send({from: account});
    }

    async function getRemainedPendingTime() {
        let rewardPendingUntil = await auction.methods.rewardPendingUntil().call();
        let now = Date.now() / 1000;
        
        setRemainedPendingTime(+rewardPendingUntil - now);
    }

    function getDateString(seconds) {
        const days = Math.floor(seconds / (60 * 60 * 24)); // 일
        const hour = String(Math.floor((seconds/ (60 * 60)) % 24 )).padStart(2, "0"); // 시
        const minutes = String(Math.floor((seconds  / 60) % 60 )).padStart(2, "0"); // 분
        const second = String(Math.floor(seconds % 60)).padStart(2, "0"); // 초

        return `${days}d ${hour}h ${minutes}m ${second}s `;
    }

    async function getTutorShare() {
        setTutorShare(await web3.eth.getBalance(auction._address));
    }

    useEffect(() => {
        setInterval(getRemainedPendingTime, 1000);
        getTutorShare();
    }, [])

    return (
        <>
        <EuiText>
            <h3>내 보상: {web3.utils.fromWei(tutorShare.toString(), 'ether')} ETH</h3>
        </EuiText>
        {remainedPendingTime > 0 &&
        <EuiText>
            <h3>보상 지급 대기시간: {getDateString(remainedPendingTime)}</h3>
        </EuiText>
        }

        <EuiButton 
        onClick={handleClick}
        isDisabled={remainedPendingTime > 0 ? true : false}
        >
            보상 출금하기!
        </EuiButton>
        </>
    );
}

export default ClaimRewardComponent;