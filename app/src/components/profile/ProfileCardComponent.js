import React, { useState, useEffect } from "react";
import { EuiCard, EuiText, EuiSpacer } from "@elastic/eui/";
import { useWeb3React } from "@web3-react/core";
import TutorAuction from "../../build/contracts/TutorAuction.json";

function ProfileCardComponent(props) {
    const {library: web3} = useWeb3React();
    const { auction:auctionAddress, tutor, averageRate, pay, education, career, description, inProgress} = props.tutor;
    const auction = new web3.eth.Contract(TutorAuction.abi, auctionAddress);
    const [highestBid, setHighestBid] = useState('');
    const [remainedTime, setRemainedTime] = useState('');

    const imgLinks = [
        "https://lh3.googleusercontent.com/inXz00iNE9qtE3HzI5QNSZZTnatx5YBp1ERGE_aIU696o1q-qCnrH_PQ_nPYu9LsJeoCiq4UXbarOR1zLjhzITpQcJrUeBX9ZQn8MA=w600",
        "https://lh3.googleusercontent.com/lgA3SvXVh34Aww8pQJSx54IxscOLPO1byf8ztTSBVtBrn25iIoiT8Ez36oS0HbIbpBO_cRRvrmlATCPb2z9HzUW4Yiz8xN61inlmswA=w600",
        "https://lh3.googleusercontent.com/_Ak432GMMTodjihgWEoJ0ekpj1e5hJjaDhax6xTxjkUUuRFroOBeEfUxsKzBwiHbPy6GrVChgxED12Xs2NN5s4ZZsbs93gcCypRJ9Q=w600",
        "https://lh3.googleusercontent.com/5l8D4DkrtW-FFVd2WFeqMVs4n0L2W1NjqBWWtlJ_LOo3Edr0pBTycj70uG4MPF36M9DUc9eEkBDS17bMdogqBFRoMVAZ9mxKSkI6fg=w600",
        "https://lh3.googleusercontent.com/JGsqc3e68FVoePiqnPuSIN169wR8C4p8H5ARb58_PgsuWQAE0jdXjHsuy9FztqPkilkb9LwftjAg98MggdmpIS7WziDxvHPiQgIa=w600",
        "https://lh3.googleusercontent.com/TdNO2OqfLKMJXeIbDbDa12sSUPMPorUkOK86_xMsXlRKH9iQZTBKhNAVer_k5S2tBGLx8AHSu4p2rndBeiMmsPjGbg=w600",
        "https://lh3.googleusercontent.com/0Nyx04azp_PYHKlURDlB_rGxOWdgtmZ_q5ou5vJqavQBHf5y_6kAs8aw3G9NRVOz1LNUmYJEGAnX7a20BhyKQXqQXL3l9uHpva1FVw=w600"
    ];

    async function getRemainedTime() {
        let startedTime = await auction.methods.startedTime().call();
        let endTime = await auction.methods.endTime().call();
        let endUnixTime = +startedTime + +endTime;
        let now = Date.now() / 1000;    //밀리초 -> 초

        let gap = endUnixTime - now;

        const days = Math.floor(gap / (60 * 60 * 24)); // 일
        const hour = String(Math.floor((gap/ (60 * 60)) % 24 )).padStart(2, "0"); // 시
        const minutes = String(Math.floor((gap  / 60) % 60 )).padStart(2, "0"); // 분
        const second = String(Math.floor(gap % 60)).padStart(2, "0"); // 초

        setRemainedTime(`${days}d ${hour}h ${minutes}m ${second}s `);
    }

    async function getData() {
        setHighestBid(await auction.methods.highestBid().call());
        setInterval(getRemainedTime, 1000);
    }

    useEffect(() => {
        if(inProgress){
        getData();
        }
    }, []);

    return(
        <EuiCard
            image={
                <div>
                <img
                    src={imgLinks[+tutor % imgLinks.length]}
                    height='300'
                    width='120'
                />
                </div>
            }
            titleSize='s'
            title={tutor}
            description={description}
            href={props.isAuctionPage ? false :`auction/${tutor}`}
            isDisabled={inProgress ? false : true}
            paddingSize='l'
        >
            {inProgress &&
            <EuiText size="l">
                <h3>
                <p> 남은 시간: {remainedTime} </p>
                최고 입찰가: {web3.utils.fromWei(highestBid, 'ether')} ETH 
                </h3>
            </EuiText>
            }
            <EuiSpacer />
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