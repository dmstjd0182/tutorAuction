import React from "react";
import { EuiButton } from "@elastic/eui/";
import BidComponent from "../../components/auction/BidComponent";

function GeneralViewComponent(props) {
    const auction = props.auction;
    const inProgress = props.inProgress;

    return (
        <>
        {
        inProgress    
        ?   //경매 진행 중일 때
            <BidComponent 
            auction={auction}
            inProgress={inProgress}
            />
        :
            <EuiButton isDisabled='true'>경매 종료!</EuiButton>
        }
        </>
    );
}

export default GeneralViewComponent;