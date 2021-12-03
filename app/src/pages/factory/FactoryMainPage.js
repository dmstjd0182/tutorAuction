import React, { useState } from "react";
import RenderingCardsComponent from "../../components/factory/RenderingCardsComponent";
import ToggleComponent from "../../components/factory/ToggleComponent";
import RegisterComponent from "../../components/factory/RegisterComponent";

function FactoryMainPage(props) {
    const [toggleIdSelected, setToggleIdSelected] = useState('all');

    return(
        <>
        <p>
        <RegisterComponent />
        </p>
        <p>
        <ToggleComponent 
            toggleIdSelected={toggleIdSelected}
            setToggleIdSelected={setToggleIdSelected}
        />
        </p>
        <RenderingCardsComponent 
            option={toggleIdSelected}
        />
        </>
    );
}

export default FactoryMainPage;