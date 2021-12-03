import React from "react";
import { EuiButtonGroup } from '@elastic/eui';

function ToggleComponent(props) {
    const toggleButtons = [
        {id: 'started',
        label: 'Only started',},
        {id: 'all',
        label: 'All auctions',},
        {id: 'stopped',
        label: 'Only stopped',}
    ]

    const onChange = (optionId) => {
        props.setToggleIdSelected(optionId);
    }

    return(
        <>
        <EuiButtonGroup
            legend="View select"
            options={toggleButtons}
            idSelected={props.toggleIdSelected}
            onChange={(id) => onChange(id)}
        />
        </>
    );
}

export default ToggleComponent;