import React, { useContext, useEffect, useState } from "react";
import { FactoryContext } from "../contexts/ContextComponents";
import MappingCardsComponent from "./MappingCardsComponent";

function AllTutorComponent(props) {
    const [data, setData] = useState([]);
    const factory = useContext(FactoryContext);

    async function getData() {
        setData(await factory.methods.getAllTutorArray().call());
    }

    useEffect(() => {
        getData();
    });

    return (
        <>
        {data.length != 0
        ?<MappingCardsComponent 
            array={data}
        />
        :<><br />There is no tutor.</>
        }
        </>
    );
}

export default AllTutorComponent;