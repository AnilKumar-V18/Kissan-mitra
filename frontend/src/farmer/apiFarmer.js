import { API } from "../config";

export const createVegetable = (userId, token, vegetable) => {
    return fetch(`${API}/vegetables/add/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: vegetable
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const removeVegetable = (vegetableId, userId, token) => {
    return fetch(`${API}/vegetables/${vegetableId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
