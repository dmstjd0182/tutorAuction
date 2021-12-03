import { EuiCard, EuiText, EuiButton, EuiFlexItem, EuiFlexGroup } from "@elastic/eui/";
import React from "react";

function MappingCardsComponent(props){
    const array = props.array;

    const result = array.map((tutor) => {
        let [auctionAddress, address, averageRate, pay, , , education, career, description] = tutor;
        return(
            <EuiFlexItem>
                <EuiCard
                    layout="horizontal"
                    title={address}
                    description={description}
                    href={`auction/${auctionAddress}`}
                >
                    <EuiText size="s">
                        <ul>
                            <li>평점: {averageRate} / 100</li>
                            <li>시급: {pay / 10}</li>
                            <li>학력: {education}</li>
                            <li>경력: {career}</li>
                        </ul>
                    </EuiText>
                </EuiCard>
            </EuiFlexItem>
        );
    })

    return (
        <>
        <EuiFlexGroup gutterSize="l">
            {result}
        </EuiFlexGroup>
        </>
    );
}

export default MappingCardsComponent;