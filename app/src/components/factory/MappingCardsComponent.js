import { EuiHorizontalRule, EuiFlexItem, EuiFlexGrid } from "@elastic/eui/";
import React from "react";
import ProfileCardComponent from "../profile/ProfileCardComponent";

function MappingCardsComponent(props){
    const array = props.array;

    const result = array.map((tutor) => {
        return(
            <EuiFlexItem key={tutor.tutor}>
                <ProfileCardComponent
                    isAuctionPage={false}
                    tutor={tutor}
                />
            </EuiFlexItem>
        );
    })

    return (
        <>
        <EuiHorizontalRule size="full" />
        <EuiFlexGrid 
            gutterSize="s"
            columns={4}
        >
            {result}
        </EuiFlexGrid>
        </>
    );
}

export default MappingCardsComponent;