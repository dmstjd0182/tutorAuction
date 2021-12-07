import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { EuiButton, EuiFieldNumber } from "@elastic/eui";

function RateComponent(props) {
    const {account} = useWeb3React();
    const auction = props.auction;
    const [_rate, _setRate] = useState(null);
    const [highestBidder, setHighestBidder] = useState('');

    function handleChange(e) {
        _setRate(e.target.value);
    }

    async function handleClick() {
        await auction.methods.setRate(_rate).send({from: account});
    }

    async function getHighestBidder() {
        setHighestBidder(await auction.methods.highestBidder().call());
    }

    useEffect(() => {
        getHighestBidder();
    })

    return(
        <>
        <EuiFieldNumber 
            placeholder="0 ~ 100"
            value={_rate}
            onChange={handleChange}
            min={0}
            max={100}
            step={1}
            prepend='평점'
        />
        <EuiButton
            onClick={handleClick}
            isDisabled={highestBidder === account ? false : true}
        >
            평가하기!
        </EuiButton>
        </>
    );
}

export default RateComponent;