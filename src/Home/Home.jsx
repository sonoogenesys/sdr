import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WebBase from "./WebLayout/WebBase";
import HomeBanner from './HomeChunks/HomeBanner';
import LogisticSection from './HomeChunks/LogisticSection';
import Features from './HomeChunks/Features';
import Brand from './HomeChunks/Brand';
import Team from './HomeChunks/Team';

const Home = () => {

    return (
        <>
            <WebBase>
                <HomeBanner/>
                <LogisticSection/>
                <Features />
                <Brand/>
                <Team />
            </WebBase>

        </>
    )
    }

export default Home;
