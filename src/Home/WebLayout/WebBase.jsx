import React, {createContext} from "react";

import Header from "./WebHeader";
import Footer from "./WebFooter";
import Helmet from 'react-helmet'

import ScrollToTop from '../../ScrollToTop'


const WebBase = ({children}) => {
    return (
        <div>
            <ScrollToTop>
                <Header />
                <div style={{paddingTop: 70}}>{children}</div>
                <Footer />
            <Helmet>
                <link href="/css/mainstyle.css" rel='stylesheet' type="text/css" />
                <link href="/css/991max.css" rel='stylesheet' type="text/css" />
                <link href="/css/767max.css" rel='stylesheet' type="text/css" />
                <link href="/css/575max.css" rel='stylesheet' type="text/css" />
              
            </Helmet>
            </ScrollToTop>
        </div>
    );

}

export default WebBase;
