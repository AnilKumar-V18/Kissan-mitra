import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Search from "./Search";
import FCard from "./FarmerViewCard";
import {getFilteredVegetables} from "./apiCore";
import { prices } from "./fixedPrices";
import ViewButton from "./ViewButton";
import RadioBox from "./RadioBox";
import {isAuthenticated} from "../auth";

const View = () => {

    const {user} = isAuthenticated();
    const [myFilters, setMyFilters] = useState({
        filters: { farmer_id: [], price: [] }
    });

    
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [click, setClick] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    
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
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        console.log("SHOP", filters, filterBy);
        setClick(1);
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

    const noItemsMessage = () => (
        <h2>
            Click on View Items <br />
        </h2>
    );

    const showItems = () => {
        return (
            <div>
                <div className="row">
                        {filteredResults.map((vegetable, i) => (
                            <FCard key={i} 
                                vegetable={vegetable} 
                                showAddToCartButton={false}
                            />
                        ))}
                    </div>
                    <hr/>
                    {loadMoreButton()}
            </div>
        );
    };

    return (
        <Layout
            title="Your Vegetables"
            description=""
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">
                    <h4>Click here </h4>
                    <ul>
                        <ViewButton
                            handleFilters={filters =>
                                handleFilters(filters, "farmer_id")
                            }
                        />
                    </ul>

                    <h4>Filter (Price Range)</h4>
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
                    {/* <h2 className="mb-4">Vegetables</h2> */}
                    {click==1 ? showItems() : noItemsMessage()}
                </div>
            </div>
        </Layout>
    );
};

export default View;
