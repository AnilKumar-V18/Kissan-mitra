import { API } from "../config";
import queryString from "query-string"

export const getVegetables = (sortBy) => {
    return fetch(`${API}/vegetables?sortBy=${sortBy}&order=desc&limit6`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getFarmers = () => {
    return fetch(`${API}/farmers`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = params => {
    const query = queryString.stringify(params);
    console.log(query);
    return fetch(`${API}/vegetables/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const getFilteredVegetables = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${API}/vegetables/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
