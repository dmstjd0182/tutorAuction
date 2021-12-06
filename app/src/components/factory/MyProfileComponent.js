import React, { useContext, useEffect, useState } from "react";
import { EuiButton } from '@elastic/eui'
import { FactoryContext } from "../contexts/ContextComponents";
import { useWeb3React } from "@web3-react/core";

function MyProfileComponent(props) {
    const {account} = useWeb3React();
    const factory = useContext(FactoryContext);
    const [isRegistered, setIsRegistered] = useState(false);

    async function getIsRegistered() {
        const tutor = await factory.methods.tutors(account).call()
        setIsRegistered(tutor.isRegistered);        //경매 컨트랙트 주소
    }

    useEffect(() => {
        getIsRegistered();
    }, []);

    return (
        <>
        <EuiButton 
            isDisabled={isRegistered ? false : true} 
            href={`/auction/${account}`}
        >
        내 프로필
        </EuiButton>
        </>
    );
}

export default MyProfileComponent;