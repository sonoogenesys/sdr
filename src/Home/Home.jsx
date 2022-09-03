import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import WebBase from "./WebLayout/WebBase";
import HomeBanner from './HomeChunks/HomeBanner';
import LogisticSection from './HomeChunks/LogisticSection';
// import HowItWorks from './HomeChunks/HowItWorks';
// import FindOut from './HomeChunks/FindOut';
import Features from './HomeChunks/Features';
import Partners from './HomeChunks/Partners';
import Brand from './HomeChunks/Brand';
// import Franchise from './HomeChunks/Franchise';
// import PayOnly from './HomeChunks/PayOnly';
// import BusinessGrowth from './HomeChunks/BusinessGrowth';
// import Faqs from './HomeChunks/Faqs';
import Team from './HomeChunks/Team';
import Warehouse from './HomeChunks/Warehouse';

const Home = (props) => {
        return (
            <>
                <WebBase>
                    {/*<HowItWorks/>*/}
                    <HomeBanner/>
                    <LogisticSection/>
                    <Features />
                    <Partners />
                    <Brand />
                    <Warehouse />
                    <Team />
                </WebBase>
                
            </>
        )
    }


export default Home
