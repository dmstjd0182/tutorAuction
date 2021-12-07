import React from "react";
import BidComponent from "../../components/auction/BidComponent";
import RateComponent from "./RateComponent";

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
            <RateComponent
            auction={auction}
            />
        }
        </>
    );
}

export default GeneralViewComponent;