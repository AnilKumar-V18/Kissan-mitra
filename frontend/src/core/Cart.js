import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart} from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout"

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    console.log(items);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((vegetable, i) => (
                    <Card key={i} 
                        vegetable={vegetable} 
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveVegetableButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty....  <br /> <Link to="/buy"> Buy now</Link>
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid"
        >
            <div className="row">
                <div className="col-6 ml-5">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className="col-4">
                <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                    <Checkout vegetables={items} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;