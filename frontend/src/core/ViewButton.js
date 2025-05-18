import React, { useState, useEffect } from "react";
import {isAuthenticated} from "../auth";
import "./nav.css";
import View from "./viewVegetables";

const ViewButton = ({handleFilters }) => {

    const {user} = isAuthenticated();

    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return  (
            <li className="list-unstyled">
                <button 
                    type="button" 
                    className = "myButton"
                    onClick = {handleChange}
                    value = {`${user._id}`}
                    >View Items
                </button>
            </li>
    );
};

export default ViewButton;