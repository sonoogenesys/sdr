import React, { Component } from 'react';

const Year = (props) => {
    return(
            <select value={props.value} onChange={props.onChange} className={"form-control"} style={{width: 200}}>
                <option value={"2022"}>2022-2023</option>
                <option value={"2023"}>2023-2024</option>
                <option value={"2024"}>2024-2025</option>
                <option value={"2025"}>2025-2026</option>
                <option value={"2026"}>2026-2027</option>
            </select>

    )
}

export default Year;