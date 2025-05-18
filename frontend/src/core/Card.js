import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import ShowImage from "./ShowImage"
import { addItem, updateItem, removeItem } from "./cartHelpers"
import "./nav.css"

const Card = ({ vegetable, showAddToCartButton = true, cartUpdate = false, showRemoveVegetableButton = false, setRun = f => f,
    run = undefined }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(vegetable.count);

    const addToCart = () => {
        addItem(vegetable, () => {
            setRedirect(true);
        });
    };


    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCart = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button
                    onClick={addToCart}
                    className="btn btn-outline-warning mb-2"
                >
                    Add to cart
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
          <span className="badge badge-primary badge-pill">In Stock </span>
        ) : (
          <span className="badge badge-primary badge-pill">Out of Stock </span>
        );
      };

    const showRemoveButton = showRemoveVegetableButton => {
        return (
            showRemoveVegetableButton && (
                <button
                    onClick={() => {removeItem(vegetable._id); setRun(!run);}}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Vegetable
                </button>
            )
        );
    };

    const handleChange = vegetableId => event => {
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(vegetableId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Quantity: &nbsp; <input
                            type="number"
                            className="form-control"
                            value={count}
                            onChange={handleChange(vegetable._id)}
                        />
                            </span>
                        </div>
                        
                    </div>
                </div>
            )
        );
    };

  //  const remain = vegetable.quantity-vegetable.sold;
    return (
        <div className="col-4 mb-4">
            <div className="card">
                <div className="card-header">{vegetable.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={vegetable} url="vegetables" />
                    <p className="black-10"> Rs. {vegetable.price} per kg</p>
                    
                    <p className="black-8">
                    Added on {moment(vegetable.createdAt).fromNow()}
                    </p>
                    {showStock(vegetable.quantity)}
                    <br />
                    {showAddToCart(showAddToCartButton)}

                    {showRemoveButton(showRemoveVegetableButton)}

                    {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>
        </div>
    );
};

export default Card;
