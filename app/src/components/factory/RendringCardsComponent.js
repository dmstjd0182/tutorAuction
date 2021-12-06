import React from "react";
import MappingCardsComponent from "./MappingCardsComponent";

function RendringCardsComponent(props) {
    const data = props.data;

    return (
        <>
        <MappingCardsComponent 
            array={data}
        />
        </>
    );
}

export default RendringCardsComponent;