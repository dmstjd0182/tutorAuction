import { injected } from "./Connectors";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from 'react';
import { EuiText, EuiButton } from "@elastic/eui/";

function ConnectorComponents(props) {
    const {active, account, activate, deactivate} = useWeb3React();
    const [isConnected, setIsConnected] = useState(false);

    async function connect() {
        try {
            await activate(injected);
            window.localStorage.setItem('active', true);
            setIsConnected(true);
        } catch(ex) {
            console.log(ex);
        }
    }

    function disconnect() {
        try {
            deactivate();
            window.localStorage.setItem('active', false);
            setIsConnected(false);
        } catch(ex) {
            console.log(ex);
        }
    }

    useEffect(() => {
        let active = JSON.parse(window.localStorage.getItem('active'));
        if(active) {
            connect();
        } else {
            disconnect();
        }
        setIsConnected(active);
    }, []);

    return (
        <>
        <EuiText>
            <h1>TUTOR AUCTION!</h1>
            {isConnected && active? 
            <span>
                <EuiButton fill onClick={disconnect}>Disconnect</EuiButton><br />
                내 주소: {account}
                {props.children}
            </span> : 
            <span>
                <EuiButton fill onClick={connect}>Connect to wallet</EuiButton><br />
                지갑을 연결하세요.
            </span>}
        </EuiText>
        </>
    )
}

export default ConnectorComponents;