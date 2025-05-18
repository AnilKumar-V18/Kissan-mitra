import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createVegetable } from "./apiFarmer";

const AddVegetable = () => {
    const [values, setValues] = useState({
        name: "",
        price: "",
        quantity: "",
        farmer_id:"",
        photo: "",
        loading: false,
        error: "",
        createdVegetable: "",
        redirectToProfile: false,
        formData: ""
    });

    const { user, token } = isAuthenticated();

    const {
        name,
        price,
        quantity,
        farmer_id,
        loading,
        error,
        createdVegetable,
        redirectToProfile,
        formData
    } = values;

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
    }, []);

    const handleChange = name => event => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        createVegetable(user._id, token, formData)
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    photo: "",
                    price: "",
                    quantity: "",
                    loading: false,
                    createdVegetable: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>


            <div className="form-group">
                <label>Item name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    placeholder="Item name"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label >Price</label>
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    value={price}
                />
            </div>

            <div className="form-group">
                <label >Quantity</label>
                <input
                    onChange={handleChange("quantity")}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            <h4>Upload Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>
            <div className="form-check">
                <input
                    onChange={handleChange("farmer_id")}
                    type="checkbox"
                    className="form-check-input"
                    value={`${user._id}`}
                />
                <label className="form-check-label" > Confirm</label>
            </div>

            <button className="btn btn-outline-secondary">Add Vegetable</button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: createdVegetable ? "" : "none" }}
        >
            <h2>{`${createdVegetable}`} is added!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return(
        <Layout
            title="Add a new vegetable"
            description={`Hello ${user.name}, ready to add a new vegetable?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddVegetable;
