import React from "react";
import AllTutorComponent from "./AllTutorComponent";

function RenderingCardsComponent(props) {
    let option = props.option;

    if (option === 'all') {
        return (
            <AllTutorComponent />
        );
    }
    // } else if (option === 'started') {
    //     return (
    //         <StartedTutorComponent 
    //         />
    //     );
    // } else {
    //     return (
    //         <StoppedTutorComponent
    //         />
    //     );
    // }
}

export default RenderingCardsComponent;