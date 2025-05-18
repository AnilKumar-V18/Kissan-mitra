import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
import "../styles.css";


const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signInForm = () => (
        <div className="auth-wrapper">
            <div className="auth-inner signin_form">
                <form>
                    <h3 className = "signin">Sign In</h3>
                    <div className="form-group">
                        <label >Email address</label>
                        <input
							onChange={handleChange("email")}
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
							value={email}
                        />
                    </div>

                    <div className="form-group">
                        <label >Password</label>
                        <input
							onChange={handleChange("password")}
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
							value={password}
                        />
                    </div>
                    <button onClick={clickSubmit} className="btn btn-info btn-lg btn-block">
                        Submit
                    </button>
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

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h3>Loading...</h3>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if(user && user.role ===1){
                return <Redirect to="/farmer/dashboard" />;
            }
            else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if(isAuthenticated())
        {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            title=" "
            className="container col-md-4 offset-md-4" >
			{showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}

        </Layout>
	);
};

export default Signin;
