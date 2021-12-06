import React from "react";
import MappingCardsComponent from "./MappingCardsComponent";

function AllTutorComponent(props) {
    const data = props.data;

    return (
        <>
        <MappingCardsComponent 
            array={data}
        />
        </>
    );
}

export default AllTutorComponent;