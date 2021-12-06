import { useWeb3React } from "@web3-react/core";
import React, { useState, useEffect, useContext } from "react";
import { EuiButton, EuiSpacer } from "@elastic/eui/";
import { FactoryContext } from "../../components/contexts/ContextComponents";
import TutorAuction from '../../build/contracts/TutorAuction.json';
import BidComponent from "../../components/auction/BidComponent";
import ProfileCardComponent from "../../components/profile/ProfileCardComponent";
import EditProfileComponent from "../../components/auction/EditProfileComponent";
import StartAuctionComponent from "../../components/auction/StartAuctionComponent";
import { useParams } from "react-router";

function AuctionMainPage(props) {
    const { account, library: web3 } = useWeb3React();
    const [tutor, setTutor] = useState([]);
    const [auction, setAuction] = useState({});
    const { address } = useParams();

    const factory = useContext(FactoryContext);

    async function getData() {
        factory.methods.tutors(address).call().then((_tutor) => {
            setTutor(_tutor); 
            setAuction(new web3.eth.Contract(TutorAuction.abi, _tutor.auction));
        });
    }

    useEffect(() => {
        getData();
    }, []);

    if (tutor.length === 0 || Object.keys(auction).length === 0) {
        return (
            <>
            <EuiButton href="/">메인 페이지로 이동</EuiButton>
            <>Loading...</>
            </>
        );
    } else {
        return (
            <>
            <EuiButton href="/">메인 페이지로 이동</EuiButton>
            <ProfileCardComponent
                isAuctionPage={true}
                tutor={tutor}
            />
            {address === account 
            ?
            <>
            <EditProfileComponent />
            <EuiSpacer />
            <StartAuctionComponent />
            </>
            :   //본인 프로필이 아닐 때
                tutor.inProgress    
                ?   //경매 진행 중일 때
                    <BidComponent 
                    auction={auction}
                    inProgress={tutor.inProgress}
                    />
                :
                    <EuiButton isDisabled='true'>경매 종료!</EuiButton>
            }
            </>
        );
    }
}

export default AuctionMainPage;