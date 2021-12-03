import { useWeb3React } from "@web3-react/core";
import React from "react";
import AuctionFactory from '../../build/contracts/AuctionFactory.json';

export const FactoryContext = React.createContext();

function ContextComponent(props) {
    const { library: web3 } = useWeb3React();
    const deployedNetwork = AuctionFactory.networks[5777];
    const factory = new web3.eth.Contract(AuctionFactory.abi, deployedNetwork.address);

    return(
        <FactoryContext.Provider value={factory}>
            {props.children}
        </FactoryContext.Provider>
    );
}

export default ContextComponent;