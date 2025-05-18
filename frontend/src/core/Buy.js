import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Search from "./Search";
import Card from "./Card";
import {getFarmers, getFilteredVegetables} from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Buy = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { farmer_id: [], price: [] }
    });

    const [farmers, setFarmers] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getFarmers().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFarmers(data);
            }
        });
    };
    const loadFilteredResults = newFilters => {
        console.log("New Filters ",newFilters);
        getFilteredVegetables(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);

                console.log("Results ", filteredResults);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredVegetables(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
                console.log("Results ",filteredResults);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
        console.log("New Filters ", newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout
            title="Buy now"
            description="Fresh Veggies and Fruits at your Door-Step"
            className="container-fluid"
        >
            {/* <Search />  */}
            <div className="row">
                <div className="col-3">
                    <h4>Filter by farmers</h4>
                    <ul>
                        <Checkbox
                            farmers={farmers}
                            handleFilters={filters =>
                                handleFilters(filters, "farmer_id")
                            }
                        />
                    </ul>

                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>
                </div>

                <div className="col-8">
                    <h2 className="mb-4">Vegetables</h2>
                    <div className="row">
                        {filteredResults.map((vegetable, i) => (
                            <Card key={i} vegetable={vegetable} />
                        ))}
                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    );
};

export default Buy;
