import { 
    EuiFieldNumber, 
    EuiButton, 
    EuiFormRow, 
    EuiForm 
    } from "@elastic/eui";
import React, { useContext, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { FactoryContext } from "../contexts/ContextComponents";

function StartAuctionComponent(props) {
    const {account, library: web3} = useWeb3React();
    const DAY_TO_SECONDS = 24 * 60 * 60;
    const factory = useContext(FactoryContext);
    const [endPrice, setEndPrice] = useState('');
    const [endTime, setEndTime] = useState('');

    function endPriceChange(e) {
        setEndPrice(e.target.value);
    }

    function endTimeChange(e) {
        setEndTime(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await factory.methods.startAuction(web3.utils.toWei(endPrice, 'ether'), +endTime * DAY_TO_SECONDS).send({from: account});
    }

    return(
        <>
        <EuiForm>
            <EuiFormRow
                label="경매 종료 가격"
                helpText='ETH 단위로 입력해주세요.'
            >
                <EuiFieldNumber
                    placeholder="0.01 ETH ~ 1 ETH"
                    value={endPrice}
                    onChange={endPriceChange}
                    min={0.01}
                    step={0.01}
                />
            </EuiFormRow>
            <EuiFormRow
                label="경매 기간"
                helpText='일 단위로 입력해주세요.'
            >
                <EuiFieldNumber
                    placeholder="7일(1주) ~ 84일(12주)"
                    value={endTime}
                    onChange={endTimeChange}
                    min={7}
                    step={1}
                />
            </EuiFormRow>
            <EuiFormRow>
                <EuiButton onClick={handleSubmit} fill>
                    경매 시작!
                </EuiButton>
            </EuiFormRow>
        </EuiForm>
        </>
    );
}

export default StartAuctionComponent;