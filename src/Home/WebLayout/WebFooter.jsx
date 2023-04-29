import React,{useState} from 'react'
import {
    PhoneOutlined
} from '@ant-design/icons';


const WebFooter =  (props, ref) => {

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
                                                +91 9910367993
                                                <br></br>
                                                +91 9582647999
                                                <br></br>
                                                <span>(10:00 AM to 7:00 PM) - Monday to Saturday</span>
                                            </div>
                                        </div>

                                        <div className="col-sm-4 mb-sm-0 mb-2">
                                            <div className="phoneIcon whatsAppIcon">
                                                +91-9582647999<span> (24X7X365)</span>
                                                <br></br>
                                                <span>Call &amp; WhatsApp</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12 col-12 mt-3">
                                <div>
                                    <img src="../img/logo.png" alt="" style={{width: '250px'}} />
                                </div>

                                    <p className="pl-0 text-white">
                                        <strong>Services available in :</strong><br />
                                        Gurugram, Delhi, Ghaziabad, Faridabad, Noida
                                    </p>

                                {/*<h6 className="text-white">We offer complete electrical solution and coverage fully delhi ncr*/}
                                {/*</h6>*/}
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-3 col-5 mt-5">
                            </div>
                            <div className="col-lg-3 col-md-5 col-sm-5 col-7 mt-5">
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-12 mt-5 footer_add">
                                <p><a href="tel:09910367993" className="text-white"><PhoneOutlined/>+91 9910367993</a></p>
                                <p><a href="tel:09582647999" className="text-white"><PhoneOutlined/>+91 9582647999</a></p>
                                <p><a href="mailto:sales@sdrcoolingsysteml.com" className="text-white">sales@sdrcoolingsystem.com</a></p>
                                <div className="address text-white">
                                    <p>
                                        <strong>Office address :</strong><br />
                                        <span className="pl-0"> 12 BISWA, NEAR SHEETLA MATA MANDIR, SECTOR-6, GURUGRAM, HARYANA-122006</span>
                                    </p>

                                </div>
                                <div className="text-white" style={{cursor: "pointer"}}>
                                    <a href="https://www.facebook.com/" className="text-white" target="_blank">
                                    <span><i className="mdi mdi-facebook" aria-hidden="true"></i> &nbsp; &nbsp; </span>
                                    </a>
                                        <a href="https://twitter.com/" className="text-white" target="_blank">
                                    <span><i className="mdi mdi-twitter" aria-hidden="true"></i> &nbsp; &nbsp; </span>
                                    </a>
                                      <a href="https://www.instagram.com/" className="text-white" target="_blank">
                                    <span><i className="mdi mdi-instagram" aria-hidden="true"></i> &nbsp; &nbsp; </span>
                                    </a>
                                </div>
                                <div className="text-white mapicon mt-3">
                                    <a href="https://www.google.com/maps/dir//SDR+COOLING+SYSTEMS+12+Biswa+near,+Sheetla+Mata+Mandir+Rd,+Gurgaon+Village,+Sector+6+Gurugram,+Haryana+122015,+India/@28.4740347,77.026497,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x390d193d206429f9:0x7a8ec8907f1bba4f" target="_blank" className="text-white">
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
                            <p>Copyright 2023 © SDR Cooling System. All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </section>
            </>
        )
    }


export default WebFooter
