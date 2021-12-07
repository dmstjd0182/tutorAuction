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
        ?
        <AbortAuctionComponent 
            auction={auction}
        />
        :
        <>
        <StartAuctionComponent 
            totalBid={totalBid}
        />
        {totalBid !== '0' &&
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