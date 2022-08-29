import React,{useState} from 'react'

import {NavLink} from 'react-router-dom';

import ShowContactUs from '../HomeChunks/ShowContactUs'

const WebFooter =  (props, ref) => {

    const [showContact, setshowContact] = useState(false)


    const showContactUs = () =>{
        setshowContact(!showContact)
    }

        return (
            <>
            <footer>
                    <div className="container">
                        <div className="row">
                            
                            <div className="col-12">
                                <div className="theme_bg_color p-sm-5 p-3 mb-3 contact_position">
                                    <div className="row">
                                        <div className="col-sm-4 mb-sm-0 mb-2">
                                                <h2>Contact Details</h2>
                                        </div>
                                        <div className="col-sm-4 mb-sm-0 mb-2">
                                            <div className="phoneIcon">
                                                0981-0959039
                                                <br></br>
                                                <span>(10:00 AM to 7:00 PM) - Monday to Saturday</span>
                                            </div>
                                        </div>

                                        <div className="col-sm-4 mb-sm-0 mb-2">
                                            <div className="phoneIcon whatsAppIcon">
                                                +91-9810959039<span> (24X7X365)</span>
                                                <br></br>
                                                <span>Call &amp; WhatsApp</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12 col-12 mt-3">
                                <div>
                                    <img src="../img/logo.jpeg" alt="" />
                                </div>

                                    <p className="pl-0 text-white">
                                        <strong>Services available in :</strong><br />
                                        Gurugram, Delhi, Ghaziabad, Faridabad, Noida
                                    </p>

                                {/*<h6 className="text-white">We offer complete electrical solution and coverage fully delhi ncr*/}
                                {/*</h6>*/}
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-3 col-5 mt-5">
                                <ul className="pl-0">
                                    <li>
                                        <NavLink to="/" target="_blank" rel="noopener noreferrer" className="text-white nav-link">Home</NavLink>

                                    </li>
                                    <li>
                                        <NavLink to="/AboutUs" rel="noopener noreferrer" className="text-white nav-link">About Us</NavLink>

                                    </li>
                                     <li>
                                        <NavLink to="#" rel="noopener noreferrer" className="text-white nav-link">Gallery</NavLink>

                                    </li> 
                                    <li>
                                        <a href="https://www.google.com/maps/dir//kcs+electrical/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x390d19129a8774a9:0xa89ae8c88974106f?sa=X&ved=2ahUKEwjygLrrzOn5AhUNR2wGHddODiYQ9Rd6BAgDEAQ" className="text-white nav-link">Get Direction</a>

                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-5 col-sm-5 col-7 mt-5">
                                <ul className="pl-0">
                                    <li>
                                        <NavLink to="#" rel="noopener noreferrer" className="text-white nav-link">Service</NavLink>

                                    </li>
                                    <li>
                                        <NavLink to="#" rel="noopener noreferrer" className="text-white nav-link">Products</NavLink>

                                    </li>
                                     <li>
                                        <NavLink to="#" rel="noopener noreferrer" className="text-white nav-link">Clients</NavLink>

                                    </li> 
                                    <li>
                                    <a href="#" onClick={showContactUs} rel="noopener noreferrer" className="text-white nav-link">Contact Us</a>

                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-12 mt-5 footer_add">
                                <p><a href="tel:09810959039" className="text-white">+91 9810959039</a></p>
                                <p><a href="mailto:sales@kcs-electrical.com" className="text-white">sales@kcs-electrical.com</a></p>
                                <div className="address text-white">
                                    <p>
                                        <strong>Office address :</strong><br />
                                        <span className="pl-0"> 360(old 79/4) 301-3rd Floor Anamica enclave, Near kalyani hospital, MG road, gurgaon-122001</span>
                                    </p>
                                    {/*<p>*/}
                                    {/*    <strong>Services available in :</strong><br />*/}
                                    {/*    <span className="pl-0">*/}
                                    {/*        Gurugram*/}
                                    {/*        Delhi*/}
                                    {/*        Ghaziabad*/}
                                    {/*        Faridabad*/}
                                    {/*        Noida</span>*/}
                                    {/*</p>*/}
                                </div>
                                <div className="text-white" style={{cursor: "pointer"}}>
                                    <a href="https://www.facebook.com/" className="text-white" target="_blank">
                                    <span><i className="mdi mdi-facebook" aria-hidden="true"></i> &nbsp; &nbsp; </span>
                                    </a>
                                      {/*<a href="https://www.linkedin.com/company/yolojet-internet-services-pvt-ltd/" className="text-white" target="_blank">
                                    <span><i className="mdi mdi-linkedin" aria-hidden="true"></i> &nbsp; &nbsp; </span>
                                    </a>*/}
                                      <a href="https://twitter.com/" className="text-white" target="_blank">
                                    <span><i className="mdi mdi-twitter" aria-hidden="true"></i> &nbsp; &nbsp; </span>
                                    </a>
                                      <a href="https://www.instagram.com/" className="text-white" target="_blank">
                                    <span><i className="mdi mdi-instagram" aria-hidden="true"></i> &nbsp; &nbsp; </span>
                                    </a>
                                </div>
                                <div className="text-white mapicon mt-3">
                                    <a href="https://www.google.com/maps/place/KCS+Electrical+Traders+%26+Engineering/@28.4651653,77.0353899,17z/data=!3m1!4b1!4m5!3m4!1s0x390d19129a8774a9:0xa89ae8c88974106f!8m2!3d28.4651333!4d77.0375253" target="_blank" className="text-white">
                                    <span className="bg-white"><img src="img/mapicon.png" alt="" /></span>  &nbsp; Visit our Office
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
            </footer>
            <section className="bg-black pt-4 pb-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-white text-center">
                            <p>Copyright 2022 © KCS Electrical Traders & Engineering. All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </section>

            <ShowContactUs
                show={showContact}
                handleClose={showContactUs}
            />
            </>
        )
    }


export default WebFooter
