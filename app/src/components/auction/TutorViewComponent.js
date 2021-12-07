import React from "react";
import { EuiSpacer } from "@elastic/eui/";
import EditProfileComponent from "../../components/auction/EditProfileComponent";
import StartAuctionComponent from "../../components/auction/StartAuctionComponent";
import AbortAuctionComponent from "./AbortAuctionComponent";

function TutorViewComponent(props) {
    const auction = props.auction;
    const inProgress = props.inProgress;

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
        <StartAuctionComponent />
        }
        
        </>
    );
}

export default TutorViewComponent;