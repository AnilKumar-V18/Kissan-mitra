import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";
import "../styles.css";

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
        role: "",
        error: "",
        success: false
    });

    const { name, email, password, location, role, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password, location, role }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    location: "",
                    role:"",
                    error: "",
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <div className="auth-wrapper-up">
            <div className="auth-inner-up signup_form">
                <form>
                    <h3 className = "signup">Sign Up</h3>
                    <div className="form-group">
                        <label >Name</label>
                        <input
                            onChange={handleChange("name")}
                            type="text"
                            className="form-control"
                            placeholder="Name" 
                            value={name}
                        />
                    </div>

                    <div className="form-group">
                        <label >Email</label>
                        <input
                            onChange={handleChange("email")}
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            onChange={handleChange("password")}
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label >Select User Type</label>
                    <select
                                    onChange={handleChange("role")}
                                    className="form-control"
                                    placeholder="Choose "
                                >
                        <option type="number" value={""}>Choose One</option>
                        <option type="number" value={"1"}>Farmer</option>
                        <option type="numer" value={"0"}>Customer</option>
                    </select>
                    </div>

                    <div className="form-group">
                            <label >Select State location</label>
                        <select 
                                onChange={handleChange("location")}
                                className="form-control"
                                placeholder="State Location"
                                value={location}
                            >
                            <option type="text" value={""}>Select State</option>
                            <option type="text" value={"Andhra Pradesh"}>Andhra Pradesh</option>
                            <option type="text" value={"Arunachal Pradesh"}>Arunachal Pradesh</option>
                            <option type="text" value={"Assam"}>Assam</option>
                            <option type="text" value={"Bihar"}>Bihar</option>
                            <option type="text" value={"Chhattisgarh"}>Chhattisgarh</option>
                            <option type="text" value={"Goa"}>Goa</option>
                            <option type="text" value={"Gujarat"}>Gujarat</option>
                            <option type="text" value={"Haryana"}>Haryana</option>
                            <option type="text" value={"Himachal Pradesh"}>Himachal Pradesh</option>
                            <option type="text" value={"Jharkhand"}>Jharkhand</option>
                            <option type="text" value={"Karnataka"}>Karnataka</option>
                            <option type="text" value={"Kerala"}>Kerala</option>
                            <option type="text" value={"Madhya Pradesh"}>Madhya Pradesh</option>
                            <option type="text" value={"Maharashtra"}>Maharashtra</option>
                            <option type="text" value={"Manipur"}>Manipur</option>
                            <option type="text" value={"Meghalaya"}>Meghalaya</option>
                            <option type="text" value={"Mizoram"}>Mizoram</option>
                            <option type="text" value={"Nagaland"}>Nagaland</option>
                            <option type="text" value={"Odisha"}>Odisha</option>
                            <option type="text" value={"Punjab"}>Punjab</option>
                            <option type="text" value={"Rajasthan"}>Rajasthan</option>
                            <option type="text" value={"Sikkim"}>Sikkim</option>
                            <option type="text" value={"Tamil Nadu"}>Tamil Nadu</option>
                            <option type="text" value={"Telangana"}>Telangana</option>
                            <option type="text" value={"Tripura"}>Tripura</option>
                            <option type="text" value={"Uttarakhand"}>Uttarakhand</option>
                            <option type="text" value={"Uttar Pradesh"}>Uttar Pradesh</option>
                            <option type="text" value={"West Bengal"}>West Bengal</option>
                        </select>

                    </div>
                    <button onClick={clickSubmit} className="btn btn-info btn-lg btn-block">Submit</button>
                </form>
            </div>
        </div>
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
            style={{ display: success ? "" : "none" }}
        >
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );


    return (
        <Layout
            title=" "
            description=" "
            className="container signup_card" >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
	);
};

export default Signup;
