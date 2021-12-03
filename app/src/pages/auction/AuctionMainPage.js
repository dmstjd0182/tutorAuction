import { useWeb3React } from "@web3-react/core";
import { useParams } from "react-router";
import React from "react";
import TutorAuction from '../../build/contracts/TutorAuction.json';
import BidComponent from "../../components/auction/BidComponent";

function AuctionMainPage(props) {
    const {library: web3} = useWeb3React();
    const { auctionAddress } = useParams();
    const auction = new web3.eth.Contract(TutorAuction.abi, auctionAddress);

    return (
        <>
        <BidComponent 
            auction={auction}
        />
        </>
    );
}

export default AuctionMainPage;