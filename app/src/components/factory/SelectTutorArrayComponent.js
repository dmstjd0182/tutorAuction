import React, { useEffect, useState, useContext } from "react";
import { FactoryContext } from "../contexts/ContextComponents";
import RenderingCardsComponent from "./RendringCardsComponent";

function SelectTutorArrayComponent(props) {
    let option = props.option;
    const [data, setData] = useState([]);
    const factory = useContext(FactoryContext);

    async function getData() {
        if (option == 'all') {
            setData(await factory.methods.getAllTutorArray().call());
        } else if (option == 'started') {
            setData(await factory.methods.getStartedTutorArray().call());
        } else {
            setData(await factory.methods.getStoppedTutorArray().call());
        }
    }

    useEffect(() => {
        getData();
    }, [option]);

    return (
        <>
        {data.length != 0
            ? <RenderingCardsComponent 
                data={data}
            />
            : <><br />There is no tutor.</>
        }
        </>
    );
}

export default SelectTutorArrayComponent;