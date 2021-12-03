import React, { useState } from "react";
import RenderingCardsComponent from "../../components/factory/RenderingCardsComponent";
import ToggleComponent from "../../components/factory/ToggleComponent";
import RegisterComponent from "../../components/factory/RegisterComponent";
import { EuiHorizontalRule } from "@elastic/eui/";

function FactoryMainPage(props) {
    const [toggleIdSelected, setToggleIdSelected] = useState('all');

    return(
        <>
        <RegisterComponent />
        <EuiHorizontalRule size="half" />
        <ToggleComponent 
            toggleIdSelected={toggleIdSelected}
            setToggleIdSelected={setToggleIdSelected}
        />
        <RenderingCardsComponent 
            option={toggleIdSelected}
        />
        </>
    );
}

export default FactoryMainPage;