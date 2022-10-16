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
                {/*<div className="featuresbg" style={{height: 1500, width:'100%'}}/>*/}
                <HomeBanner/>
                <LogisticSection aboutItem={aboutItem}/>
                <Features />
                <Partners  />
                <Brand/>
                <Warehouse/>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
