import { useWeb3React } from "@web3-react/core";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { EuiButton, EuiFlexGrid, EuiFlexItem } from "@elastic/eui/";
import { FactoryContext } from "../../components/contexts/ContextComponents";
import TutorAuction from '../../build/contracts/TutorAuction.json';
import ProfileCardComponent from "../../components/profile/ProfileCardComponent";
import TutorViewComponent from "../../components/auction/TutorViewComponent";
import GeneralViewComponent from "../../components/auction/GeneralViewComponent";
import EndAuctionComponent from "../../components/auction/EndAuctionComponent";

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
            <EuiFlexGrid columns={2}>
                <EuiFlexItem>
                    <ProfileCardComponent
                        isAuctionPage={true}
                        tutor={tutor}
                    />
                </EuiFlexItem>
            </EuiFlexGrid>
            {address === account 
            ?   //본인 프로필일 때
            <>
            <TutorViewComponent 
                auction={auction}
                inProgress={tutor.inProgress}
            />
            </>
            :   //본인 프로필이 아닐 때
            <>
            <GeneralViewComponent 
                auction={auction}
                inProgress={tutor.inProgress}
            />
            </>
            }
            {tutor.inProgress &&
            <EndAuctionComponent 
                inProgress={tutor.inProgress}
                auction={auction}
            />
            }
            </>
        );
    }
}

export default AuctionMainPage;