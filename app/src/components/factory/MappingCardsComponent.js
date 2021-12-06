import { EuiHorizontalRule, EuiFlexItem, EuiFlexGrid } from "@elastic/eui/";
import React from "react";
import ProfileCardComponent from "../auction/ProfileCardComponent";

function MappingCardsComponent(props){
    const array = props.array;

    const result = array.map((tutor) => {
        return(
            <EuiFlexItem>
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