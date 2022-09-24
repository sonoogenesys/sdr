

import React, {useState} from "react";
import {NavLink} from 'react-router-dom';
import ShowContactUs from "../HomeChunks/ShowContactUs";

const WebHeader = (props) => {

    const [showModal, setshowModal] = useState(false)
    const [showContact, setshowContact] = useState(false)


    const showContactUs = () =>{
        setshowContact(!showContact)
    }

    const GetinTouch = () =>{

        setshowModal(!showModal)
    }


  const [sideMenu, setSideMenu] = useState(false);

    const OpenMenu = () =>{
        setSideMenu(!sideMenu)
    }
    return (
        <>
            <header style={{zIndex: 10, height:70, width:'100%',position:'fixed',backgroundColor:'white'}}>
                <div className="container" >
                    <div className="row" >
                        <div className="col-lg-2">
                            <div className="logo">
                               <NavLink to="/">
                               <img
                                    src="/img/logo.png"
                                    alt="LOGO"
                                    className="mt-2"
                                />
                               </NavLink>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <nav className="navbar navbar-expand-lg navbar-light pl-0 pr-0">
                                <div className="row w-100 mobile_header_row">
                                    <div className="col-lg-10">
                                        <nav className="navbar text-uppercase pl-0 pr-0">
                                            <div
                                               className={`${
                                                    sideMenu
                                                      ? "navbar-collapse customcollapse"
                                                      : "navbar-collapse"
                                                   }`}
                                            >
                                                <ul className="navbar-nav">
                                                    <li className="nav-item">
                                                         <NavLink
                                                            className="nav-link"
                                                            to="/"
                                                            exact={true}
                                                        >
                                                            Home
                                                         </NavLink>
                                                    </li>
                                                    <li className="nav-item">
                                                         <NavLink
                                                            className="nav-link"
                                                            to="/AboutUs"
                                                            exact={true}
                                                        >
                                                             About Us
                                                         </NavLink>

                                                    </li>
                                                    <li className="nav-item mb-1">
                                                        <NavLink
                                                            className="nav-link"
                                                            to="/Service"
                                                            exact={true}
                                                        >
                                                            Services
                                                        </NavLink>
                                                        {/* <a*/}
                                                        {/*    className="nav-link"*/}
                                                        {/*    href="/#services"*/}
                                                        {/*>*/}
                                                        {/*    Services*/}
                                                        {/*</a>*/}
                                                    </li>
                                                    <li className="nav-item mb-1">
                                                        <NavLink
                                                            className="nav-link"
                                                            to="/Products"
                                                            exact={true}
                                                        >
                                                            Products
                                                        </NavLink>
                                                    </li>
                                                    <li className="nav-item">
                                                        {/* <NavLink*/}
                                                        {/*    className="nav-link"*/}
                                                        {/*    to="/Clients"*/}
                                                        {/*    exact={true}*/}
                                                        {/*>Clients</NavLink>*/}
                                                         <a
                                                            className="nav-link"
                                                            href="/#clients"
                                                        >
                                                            Clients
                                                        </a>
                                                    </li>
                                                    <li className="nav-item mb-1">
                                                        {/*<a*/}
                                                        {/*    className="nav-link"*/}
                                                        {/*    href="/#gallery"*/}
                                                        {/*>*/}
                                                        {/*    Gallery*/}
                                                        {/*</a>*/}
                                                        <NavLink
                                                            className="nav-link"
                                                            to="/Gallery"
                                                            exact={true}
                                                        >Gallery</NavLink>
                                                    </li>
                                                    <li className="nav-item mb-1">
                                                        <a
                                                            className="nav-link"
                                                            href="#webp"
                                                            // exact={true}
                                                            onClick={showContactUs}
                                                        >Contact Us</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="d-flex justify-content-between pt-2 align-items-center flex ">
                                            <div className="login_signup d-flex text-capitalize">
                                                {/* <NavLink*/}
                                                {/*    to="/app/dashboard"*/}
                                                {/*    className="theme_text_color nav-link"*/}
                                                {/*>*/}
                                                {/*    */}
                                                {/* </NavLink>*/}
                                                 <NavLink
                                                    to="/login"
                                                    className="theme_bg_color nav-link text-white"
                                                >
                                                    log in
                                                 </NavLink>
                                            </div>
                                            {/*<button*/}
                                            {/*onClick={OpenMenu}*/}
                                            {/*    className="navbar-toggler"*/}
                                            {/*    type="button"*/}
                                            {/*    data-toggle="collapse"*/}
                                            {/*    data-target="#navbarSupportedContent"*/}
                                            {/*    aria-controls="navbarSupportedContent"*/}
                                            {/*    aria-expanded="false"*/}
                                            {/*    aria-label="Toggle navigation"*/}
                                            {/*>*/}
                                            {/*    <span className="navbar-toggler-icon"></span>*/}
                                            {/*</button>*/}
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <ShowContactUs
                show={showContact}
                handleClose={showContactUs}
            />
        </>
    );
}

export default WebHeader;
