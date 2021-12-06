import React from "react";
import { EuiCard, EuiText } from "@elastic/eui/";

function ProfileCardComponent(props) {
    const { tutor, averageRate, pay, education, career, description, inProgress} = props.tutor;

    const imgLinks = [
        "https://lh3.googleusercontent.com/inXz00iNE9qtE3HzI5QNSZZTnatx5YBp1ERGE_aIU696o1q-qCnrH_PQ_nPYu9LsJeoCiq4UXbarOR1zLjhzITpQcJrUeBX9ZQn8MA=w600",
        "https://lh3.googleusercontent.com/lgA3SvXVh34Aww8pQJSx54IxscOLPO1byf8ztTSBVtBrn25iIoiT8Ez36oS0HbIbpBO_cRRvrmlATCPb2z9HzUW4Yiz8xN61inlmswA=w600",
        "https://lh3.googleusercontent.com/_Ak432GMMTodjihgWEoJ0ekpj1e5hJjaDhax6xTxjkUUuRFroOBeEfUxsKzBwiHbPy6GrVChgxED12Xs2NN5s4ZZsbs93gcCypRJ9Q=w600",
        "https://lh3.googleusercontent.com/5l8D4DkrtW-FFVd2WFeqMVs4n0L2W1NjqBWWtlJ_LOo3Edr0pBTycj70uG4MPF36M9DUc9eEkBDS17bMdogqBFRoMVAZ9mxKSkI6fg=w600",
        "https://lh3.googleusercontent.com/JGsqc3e68FVoePiqnPuSIN169wR8C4p8H5ARb58_PgsuWQAE0jdXjHsuy9FztqPkilkb9LwftjAg98MggdmpIS7WziDxvHPiQgIa=w600",
        "https://lh3.googleusercontent.com/TdNO2OqfLKMJXeIbDbDa12sSUPMPorUkOK86_xMsXlRKH9iQZTBKhNAVer_k5S2tBGLx8AHSu4p2rndBeiMmsPjGbg=w600",
        "https://lh3.googleusercontent.com/0Nyx04azp_PYHKlURDlB_rGxOWdgtmZ_q5ou5vJqavQBHf5y_6kAs8aw3G9NRVOz1LNUmYJEGAnX7a20BhyKQXqQXL3l9uHpva1FVw=w600"
    ];

    return(
        <EuiCard
            image={
                <div>
                <img
                    src={imgLinks[+tutor % imgLinks.length]}
                    height='300'
                    width='100'
                />
                </div>
            }
            titleSize='s'
            title={tutor}
            description={description}
            href={props.isAuctionPage ? null :`auction/${tutor}`}
            isDisabled={inProgress ? false : true}
            paddingSize='l'
        >
            <EuiText size="m">
                <ul>
                    <li>{inProgress ? '경매 진행중!' : '경매 불가'}</li>
                    <li>평점: {averageRate} / 100</li>
                    <li>시급: {(pay / 10 * 10000).toLocaleString()}원</li>
                    <li>학력: {education}</li>
                    <li>경력: {career}</li>
                </ul>
            </EuiText>
        </EuiCard>
    );
}

export default ProfileCardComponent;