import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import FarmerRoute from "./auth/FarmerRoute";
import Dashboard from "./user/UserDashboard";
import FarmerDashboard from "./user/FarmerDashboard";
import AddVegetable from "./farmer/AddVegetable";
import Buy from "./core/Buy"
import Cart from "./core/Cart"
import Profile from "./user/Profile";
import View from "./core/viewVegetables";
import Remove from "./core/removeVegetables";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/buy" exact component={Buy} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <FarmerRoute path="/farmer/dashboard" exact component={FarmerDashboard} />
                <FarmerRoute path="/add/vegetables" exact component={AddVegetable} />
                <FarmerRoute path="/view" exact component={View} />
                <FarmerRoute path="/remove" exact component={Remove} />

                <Route path="/cart" exact component={Cart} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
				<FarmerRoute path="/profile/:userId" exact component={Profile} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
