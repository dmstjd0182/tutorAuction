import { EuiButton } from "@elastic/eui";
import { useWeb3React } from "@web3-react/core";
import React, { useContext, useEffect, useState } from "react";
import { FactoryContext } from "../contexts/ContextComponents";

function ClaimRewardComponent(props) {
    const {account} = useWeb3React();
    const auction = props.auction;
    const factory = useContext(FactoryContext);
    const [remainedPendingTime, setRemainedPendingTime] = useState(1);

    async function handleClick() {
        await factory.methods.claimReward().send({from: account});
    }

    async function getRemainedPendingTime() {
        let rewardPendingUntil = await auction.methods.rewardPendingUntil().call();
        let now = Date.now() / 1000;
        
        setRemainedPendingTime(+rewardPendingUntil - now);
    }

    useEffect(() => {
        getRemainedPendingTime();
    })

    return (
        <>
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