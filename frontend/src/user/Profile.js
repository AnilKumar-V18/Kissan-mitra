import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        location:"",
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { name, email, password, location, error, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password, location }).then(
            data => {
                if (data.error) {
                    console.lgo(data.error);
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            name: data.name,
                            email: data.email,
                            location: data.location,
                            success: true
                        });
                    });
                }
            }
        );
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/" />;
        }
    };

    const profileUpdate = (name, email, password, location) => (
        <div className="auth-wrapper update_deets">
            <div className="auth-inner-left">
                <form>
                    <h3>Update Details</h3>
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
                            <label >Select State location</label>
                        <select 
                                onChange={handleChange("location")}
                                className="form-control"
                                placeholder="State Location" 
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
                    <button onClick={clickSubmit} className="btn btn-primary btn-lg btn-block">Submit</button>
                </form>
            </div>
        </div>
    );

    return (
        <Layout
            title="Profile Update"
            description=" "
            className="container-fluid"
        >
            <div className="col-4 ml-10">
                {profileUpdate(name, email, password, location)}
                {redirectUser(success)}
            </div>
        </Layout>
    );
};

export default Profile;
