import { EuiButton } from '@elastic/eui';
import { useWeb3React } from '@web3-react/core';
import React from "react";

function EditProfileComponent(props) {
    const {account} = useWeb3React();
    
    return (
          <>
          <EuiButton href={`/profile/${account}`}>프로필 수정</EuiButton>
          </>
      );
}

export default EditProfileComponent;