import React from "react";
import AuthRouter from "./AuthRouter";
// import RedirectPath from "./RedirectPath";
import { DefaultConfig } from "../Config/Axios";
import { Route, Redirect, Switch } from "react-router-dom";
import ApplayoutContainer from "../AppLayout/ApplayoutContainer";
// // import CheckUserAuthentication from "../Utils/CheckUserAuthentication";
import PrivateRoute from "./PrivateRoute";
import Home from "../Home/Home";
// import PrivacyPolicy from "../Home/PrivacyPolicy";
// import TermsAndConditions from "../Home/TermsAndConditions";
// import Career from "../Home/Career";
import AboutUs from "../Home/AboutUs";
import Services from "../Home/Service";
import Products from "../Home/Products";
import Gallery from "../Home/Gallery";
// import Features from "../Home/HomeChunks/Features";
// import Track from "../Home/Track";


const AuthContainer = () => {
    DefaultConfig.setRequests();
    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={Home} />
                {/*<Route exact path="/PrivacyPolicy" component={PrivacyPolicy} />*/}
                {/*<Route exact path="/TermsAndConditions" component={TermsAndConditions} />*/}
                <Route exact path="/Service" component={Services} />
                <Route exact path="/AboutUs" component={AboutUs} />
                <Route exact path="/Products" component={Products} />
                <Route exact path="/Gallery" component={Gallery} />
                {/*<Route exact path="/Track" component={Track} />*/}
                <PrivateRoute path="/app/" component={ApplayoutContainer} />
                <AuthRouter />
                {/* <RedirectPath exact path="/" /> */}
                {/* <Route path='/app' component={ApplayoutContainer} /> */}
                {/* <Route
                    render={(props) => {
                        return CheckUserAuthentication() ? (
                            <ApplayoutContainer {...props} />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                }}
                            />
                        );
                    }}
                /> */}
            </Switch>
        </React.Fragment>
    );
};
export default AuthContainer;
