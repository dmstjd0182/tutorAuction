import React, { useEffect, useState } from "react";
import { EuiButton, EuiText } from "@elastic/eui";
import { useWeb3React } from "@web3-react/core";

function EndAuctionComponent(props) {
    const {account} = useWeb3React();
    const auction = props.auction;
    const [remainedTime, setRemainedTime] = useState(0);

    async function getRemainedTime() {
        let startedTime = await auction.methods.startedTime().call();
        let endTime = await auction.methods.endTime().call();
        let now = Date.now() / 1000;

        setRemainedTime((+startedTime + +endTime) - now);
    }

    async function handleClick() {
        await auction.methods.endAuction().send({from: account});
    }
    
    useEffect(() => {
        getRemainedTime();
    })

    return (
        <>
        <EuiButton
            onClick={handleClick}
            isDisabled={remainedTime < 0 ? false : true}
        >
            경매 종료!
        </EuiButton>
        <EuiText size='s'>종료는 경매 시간이 만료된 후 가능합니다.</EuiText>
        </>
    );
}

export default EndAuctionComponent;