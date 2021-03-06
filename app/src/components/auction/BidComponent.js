import { EuiButton, EuiFieldNumber, EuiSpacer, EuiText } from "@elastic/eui/";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";

function BidComponent(props) {
    const auction = props.auction;
    const {account, library: web3} = useWeb3React();
    const [highestBid, setHighestBid] = useState(0);
    const [highestBidder, setHighestBidder] = useState('No Bidder!');
    const [bid, setBid] = useState(null);

    async function getHighestBid() {
        setHighestBid(await auction.methods.highestBid().call());
        let bidder = await auction.methods.highestBidder().call();
        if (bidder !== '0x0000000000000000000000000000000000000000') {
            setHighestBidder(bidder);
        }
    }

    function bidChange(e) {
        setBid(e.target.value);
    }

    async function handleClick() {
        await auction.methods.bid().send({from: account, value: web3.utils.toWei(bid, 'ether')});
    }

    useEffect(() => {
        getHighestBid();
    }, []);

    return(
        <>
        <EuiSpacer />
        <EuiText>
            <h3>현재 최고 입찰가: {web3.utils.fromWei(highestBid.toString(), 'ether')} ETH </h3>
            최고 입찰자: {highestBidder}
        </EuiText>
        <EuiFieldNumber
            placeholder="필수 입력"
            value={bid}
            onChange={bidChange}
            min={+web3.utils.fromWei(highestBid.toString(), 'ether')}
            step={0.001}
        />
        <EuiButton
            onClick={handleClick}
        >
            입찰하기!
        </EuiButton>
        </>
    );
}

export default BidComponent;