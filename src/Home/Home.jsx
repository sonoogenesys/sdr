import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WebBase from "./WebLayout/WebBase";
import HomeBanner from './HomeChunks/HomeBanner';
import LogisticSection from './HomeChunks/LogisticSection';
import Features from './HomeChunks/Features';
import Partners from './HomeChunks/Partners';
import Brand from './HomeChunks/Brand';
import Team from './HomeChunks/Team';
import Warehouse from './HomeChunks/Warehouse';
import {connect} from "react-redux";

const Home = (props) => {
    // const clientItem = props.client;
    const galleryItem = props.gallery;
    const aboutItem = props.about;

    return (
        <>
            <WebBase>
                <HomeBanner/>
                <LogisticSection aboutItem={aboutItem}/>
                <Features />
                <Partners  />
                <Brand/>
                <Warehouse galleryItem={galleryItem}/>
                <Team />
            </WebBase>

        </>
    )
    }

const mapStateToProps = (state) => {
    return {
        about: state?.about?.about,
        gallery: state?.gallery?.gallery,
        // client: state?.client?.clients,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // aboutRequest: (params) => dispatch(fetchAboutRequest(params)),
        // clientRequest: (params) => dispatch(fetchAllClientsRequest(params)),
        // galleryRequest: (params) => dispatch(fetchAllGallerysRequest(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
