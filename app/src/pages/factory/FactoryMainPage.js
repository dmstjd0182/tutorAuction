import React, { useState } from "react";
import ToggleComponent from "../../components/factory/ToggleComponent";
import RegisterComponent from "../../components/factory/RegisterComponent";
import { EuiHorizontalRule } from "@elastic/eui/";
import SelectTutorArrayComponent from "../../components/factory/SelectTutorArrayComponent";
import MyProfileComponent from "../../components/factory/MyProfileComponent";

function FactoryMainPage(props) {
    const [toggleIdSelected, setToggleIdSelected] = useState('all');

    return(
        <>
        <RegisterComponent />
        <MyProfileComponent />
        <EuiHorizontalRule size="half" />
        <ToggleComponent 
            toggleIdSelected={toggleIdSelected}
            setToggleIdSelected={setToggleIdSelected}
        />
        <SelectTutorArrayComponent 
            option={toggleIdSelected}
        />
        </>
    );
}

export default FactoryMainPage;