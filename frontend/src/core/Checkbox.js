import React, { useState, useEffect } from "react";
import "./nav.css";

const Checkbox = ({ farmers, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return farmers.map((c, i) => (
        <li key={i} className="list-unstyled">
            <button 
                type="button" 
                className = "myButton"
                onClick = {handleChange}
                value = {`${c._id}`}
                >{c.name}
            </button>
        </li>
    ));
};

export default Checkbox;