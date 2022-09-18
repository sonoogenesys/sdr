import React, {useEffect} from "react";
import AuthRouter from "./AuthRouter";
import { DefaultConfig } from "../Config/Axios";
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import ApplayoutContainer from "../AppLayout/ApplayoutContainer";
import PrivateRoute from "./PrivateRoute";
import Home from "../Home/Home";
import AboutUs from "../Home/AboutUs";
import Services from "../Home/Service";
import Products from "../Home/Products";
import Gallery from "../Home/Gallery";
import {fetchAllGallerysRequest} from "../Gallery/Duck/GalleryActions";
import {fetchAboutRequest} from "../About/Duck/AboutActions";


const AuthContainer = (props) => {
    DefaultConfig.setRequests();

    const preload = ()=> {
        let {aboutRequest, galleryRequest, about} = props
        if(Object.keys(about).length === 0){
            aboutRequest();
            galleryRequest();
        }

    }
    useEffect(() => {
        preload();
    });

    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Service" component={Services} />
                <Route exact path="/AboutUs" component={AboutUs} />
                <Route exact path="/Products" component={Products} />
                <Route exact path="/Gallery" component={Gallery} />
                <PrivateRoute path="/app/" component={ApplayoutContainer} />
                <AuthRouter />
            </Switch>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        about: state?.about?.about,
        gallery: state?.gallery?.gallery,
        // client: state?.client?.clients,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        aboutRequest: (params) => dispatch(fetchAboutRequest(params)),
        // clientRequest: (params) => dispatch(fetchAllClientsRequest(params)),
        galleryRequest: (params) => dispatch(fetchAllGallerysRequest(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)