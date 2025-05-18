import React, { Fragment, useState, useEffect } from "react";
import CarouselPage from "../core/Carousel"
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import {getVegetables} from './apiCore';
import Card from './Card'
import "./nav.css";

const Home = () => {

    const [VegetablesBySell, setVegetablesBySell] = useState([]);
    const [VegetablesByArrival, setVegetablesByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadVegetablesBySell = () => {
        getVegetables("sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setVegetablesBySell(data);
            }
        });
    };

    const loadVegetablesByArrival = () => {
        getVegetables("createdAt").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setVegetablesByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadVegetablesByArrival();
        loadVegetablesBySell();
    }, []);

	return (
        <Layout
            title="Welcome to Kisaan Mitra"
            description="A one stop solution to find the best veggies straight from the farmers."
            className="container-fluid" >
            
            <h3 className = "info_dashboard"> ಜೈ ಜವಾನ್ ! ಜೈ ಕಿಸಾನ್ ! </h3>
			{!isAuthenticated() && (
            <CarouselPage />
            )}

            {(!isAuthenticated() || isAuthenticated().user.role === 1) && (
  <CarouselPage />
)}

                
            {isAuthenticated() && isAuthenticated().user.role === 0 &&  (

                <Fragment>
                    <div className="ml-5 mr-5">
                        <h2 className="mb-4">New Arrivals</h2>
                        <div className="row">
                            {VegetablesByArrival.map((vegetable, i) => (
                                <Card key={i} vegetable={vegetable} />
                            ))}
                        </div>

                        <h2 className="mb-4">Best Sellers</h2>
                        <div className="row">
                            {VegetablesBySell.map((vegetable, i) => (
                                <Card key={i} vegetable={vegetable} />
                            ))}
                        </div>
                    </div>
                </Fragment>    

            )}
        </Layout>
	)
};


export default Home;
