import React, { useState, useEffect } from "react";
import { getFarmers, list} from "./apiCore";
import Card from "./Card";

const Search = () => {
    const [data, setData] = useState({
        farmers: [],
        farmer_id: "All",
        name: "",
        results: [],
        searched: false
    });

    const { farmers, farmer_id, name, results, searched } = data;

    const loadFarmers = () => {
        getFarmers().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, farmers: data });
            }
        });
    };

    useEffect(() => {
        loadFarmers();
    }, []);

    const searchData = () => {
        console.log(name, farmer_id);
        if (name) {
            list({ name: name || undefined, farmer_id : farmer_id }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        } 
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} vegetables`;
        }
        if (searched && results.length < 1) {
            return `No vegetables found`;
        }
    };

    const searchedVegetables = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                    {results.map((vegetable, i) => (
                        <Card key={i} vegetable={vegetable} />
                    ))}
                </div>
            </div>
            
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                        <select
                            className="btn mr-2"
                            onChange={handleChange("farmer_id")}
                        >
                            <option value="All">Choose Farmer</option>
                            {farmers.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("name")}
                        placeholder="Search by name"
                    />
                </div>
                <div
                    className="btn input-group-append"
                    style={{ border: "none" }}
                >
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container mb-3"> {searchForm()} </div>
            <div className="container-fluid mb-3">
                {searchedVegetables(results)}
            </div>
        </div>
    );
};

export default Search;
