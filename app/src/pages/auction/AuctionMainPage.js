import { useWeb3React } from "@web3-react/core";
import React, { useState, useEffect, useContext } from "react";
import { EuiButton } from "@elastic/eui/";
import { FactoryContext } from "../../components/contexts/ContextComponents";
import TutorAuction from '../../build/contracts/TutorAuction.json';
import BidComponent from "../../components/auction/BidComponent";
import ProfileCardComponent from "../../components/profile/ProfileCardComponent";
import EditProfileComponent from "../../components/auction/EditProfileComponent";

function AuctionMainPage(props) {
    const { account, library: web3 } = useWeb3React();
    const [tutor, setTutor] = useState([]);
    const [auction, setAuction] = useState({});

    const factory = useContext(FactoryContext);

    async function getData() {
        factory.methods.tutors(account).call().then((_tutor) => {
            setTutor(_tutor); 
            setAuction(new web3.eth.Contract(TutorAuction.abi, _tutor.auction));
        });
    }

    useEffect(() => {
        getData();
    }, []);

    if (tutor.length === 0 || Object.keys(auction).length === 0) {
        return (
            <>Loading...</>
        );
    } else {
        return (
            <>
            <EuiButton href="/">메인 페이지로 이동</EuiButton>
            <ProfileCardComponent
                isAuction={true}
                tutor={tutor}
            />
            {tutor.inProgress 
            ? 
                <BidComponent 
                auction={auction}
                inProgress={tutor.inProgress}
                />
            :
                <EuiButton isDisabled='true'>경매 종료!</EuiButton>
            }
            {tutor.tutor === account &&     //본인 프로필일 때
            <EditProfileComponent />
            }
            </>
        );
    }
}

export default AuctionMainPage;