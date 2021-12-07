import React, { useEffect, useState } from "react";
import { EuiSpacer } from "@elastic/eui/";
import EditProfileComponent from "../../components/auction/EditProfileComponent";
import StartAuctionComponent from "../../components/auction/StartAuctionComponent";
import AbortAuctionComponent from "./AbortAuctionComponent";
import ClaimRewardComponent from "./ClaimRewardComponent";

function TutorViewComponent(props) {
    const auction = props.auction;
    const inProgress = props.inProgress;
    const [totalBid, setTotalBid] = useState('0');

    async function getTotalBid() {
        setTotalBid(await auction.methods.totalBid().call());
    }

    useEffect(() => {
        getTotalBid();
    }, []);

    return (
        <>
        <EditProfileComponent />
        <EuiSpacer />
        {inProgress
        ?   //경매 진행 중
        <AbortAuctionComponent 
            auction={auction}
        />
        :   //경매 종료 상황
        <>
        
        {totalBid === '0' 
        ?   //경매 리셋 후
            <StartAuctionComponent 
                totalBid={totalBid}
            />
        :   //경매 리셋 전
            <ClaimRewardComponent 
                auction={auction}
            />
        }
        </>
        }
        </>
    );
}

export default TutorViewComponent;