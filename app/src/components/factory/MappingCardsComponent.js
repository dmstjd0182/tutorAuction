import { EuiCard, EuiText, EuiHorizontalRule, EuiFlexItem, EuiFlexGrid } from "@elastic/eui/";
import React from "react";

function MappingCardsComponent(props){
    const array = props.array;

    const imgLinks = [
        "https://lh3.googleusercontent.com/inXz00iNE9qtE3HzI5QNSZZTnatx5YBp1ERGE_aIU696o1q-qCnrH_PQ_nPYu9LsJeoCiq4UXbarOR1zLjhzITpQcJrUeBX9ZQn8MA=w600",
        "https://lh3.googleusercontent.com/lgA3SvXVh34Aww8pQJSx54IxscOLPO1byf8ztTSBVtBrn25iIoiT8Ez36oS0HbIbpBO_cRRvrmlATCPb2z9HzUW4Yiz8xN61inlmswA=w600",
        "https://lh3.googleusercontent.com/_Ak432GMMTodjihgWEoJ0ekpj1e5hJjaDhax6xTxjkUUuRFroOBeEfUxsKzBwiHbPy6GrVChgxED12Xs2NN5s4ZZsbs93gcCypRJ9Q=w600",
        "https://lh3.googleusercontent.com/5l8D4DkrtW-FFVd2WFeqMVs4n0L2W1NjqBWWtlJ_LOo3Edr0pBTycj70uG4MPF36M9DUc9eEkBDS17bMdogqBFRoMVAZ9mxKSkI6fg=w600",
        "https://lh3.googleusercontent.com/JGsqc3e68FVoePiqnPuSIN169wR8C4p8H5ARb58_PgsuWQAE0jdXjHsuy9FztqPkilkb9LwftjAg98MggdmpIS7WziDxvHPiQgIa=w600"
    ];

    const result = array.map((tutor) => {
        let [auctionAddress, address, averageRate, pay, , , education, career, description, inProgress] = tutor;
        return(
            <EuiFlexItem>
                <EuiCard
                    image={
                        <div>
                        <img
                            src={imgLinks[auctionAddress % imgLinks.length]}
                            height='300'
                            width='100'
                        />
                        </div>
                    }
                    titleSize='s'
                    title={address}
                    description={description}
                    href={`auction/${auctionAddress}`}
                    isDisabled={inProgress ? false : true}
                    paddingSize='l'
                >
                    <EuiText size="m">
                        <ul>
                            <li>{inProgress ? '경매 진행중!' : '경매 불가'}</li>
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