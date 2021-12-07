import React, { useContext, useEffect, useState } from "react";
import { EuiButton, EuiText } from "@elastic/eui/";
import { FactoryContext } from "../contexts/ContextComponents";
import { useWeb3React } from "@web3-react/core";

function AbortAuctionComponent(props) {
    const { account } = useWeb3React();
    const auction = props.auction;
    const factory = useContext(FactoryContext);
    const [highestBid, setHighestBid] = useState('0');

    async function handleClick() {
        await factory.methods.abortAuction().send({from: account});
    }

    async function getHighestBid() {
        setHighestBid(await auction.methods.highestBid().call());
    }

    useEffect(() => {
        getHighestBid();
    }, []);

    return (
        <>
        <EuiButton 
            onClick={handleClick} 
            isDisabled={highestBid === '0' ? false : true}
            fill
        >
            경매 취소!
        </EuiButton>
        <EuiText size='s'>취소는 입찰이 이루어지기 전에만 가능합니다.</EuiText>
        </>
    );
}

export default AbortAuctionComponent;