import { EuiButton } from '@elastic/eui'
import { useWeb3React } from '@web3-react/core';
import React from 'react';

function RegisterComponent(props) {
    const {account} = useWeb3React();
    
    return (
        <>
        <EuiButton href={`/profile/${account}`}>선생님 등록하러 가기</EuiButton>
        </>
    );
}

export default RegisterComponent;