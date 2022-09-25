
import React from 'react';
import WebBase from "./WebLayout/WebBase";
import {connect} from "react-redux";
require('./aboutus.css');

const AboutUs = ({about}) => {
    return (
        <>
         <WebBase>
             <div className="about">
                 <div className="aboutBox">
                         <div
                             className="col-lg-12"
                             data-aos="fade-up"
                             data-aos-duration="3000"
                         >
                             <div className="bannerText" >
                                 <h1 style={{color:'#fff'}}>About us</h1>
                                 {/*<p>KCS Electrical is a complete Electrical Engineering firm. We are a brand which ensures inimitable*/}
                                 {/*    services to our clients. KCS Electrical strives for nothing but the best.<br/>*/}
                                 {/*    KCS Electrical came into existence in the year 2006. KCS Electrical is a brainchild of qualified engineers sharing*/}
                                 {/*    common goals and professional acumen in their respective domains. We work with our clients as partners*/}
                                 {/*    to cater all their requirements in a simple and cost effective manner.*/}
                                 {/*    <br/>*/}
                                 {/*    Our forte was in Electrical Engineering projects. We now provide a complete gamut of services for*/}
                                 {/*    Electrical Turnkey projects, Electrical Engineering consultancy.*/}
                                 {/*    Our personnel management strategies focus on building human resource and creating an environment*/}
                                 {/*    where talent can be procreated. Client satisfaction is our motto and we are a perfect blend of employee*/}
                                 {/*    talent, technical expertise and modern technology.*/}
                                 {/*</p>*/}
                                 <p className={'text-justify text-white'}>{about?.aboutUs}</p>
                             </div>
                         </div>
                     </div>
                 </div>
             <div className="vision">
                 <div className="visionBox">
                     <div
                         className="col-lg-12"
                         data-aos="fade-up"
                         data-aos-duration="3000"
                     >
                         <div className="bannerText">
                             <h1>Our Vision</h1>
                             {/*<p>To be the impeccable Electrical Engineering company in India.<br/>*/}
                             {/*    Our Vision is to deeply recognize the needs of our Clients who are constantly searching for the latest technologies and new ways of thinking to make the best*/}
                             {/*    project decisions. We continuously develop our knowledge and expertise and apply*/}
                             {/*    them in helping our Clients in their business activities. With wide experience,*/}
                             {/*    we also develop new, efficient software tools that enable our Clients to strengthen*/}
                             {/*    their business opportunities. And, above all, we work together with our Clients and*/}
                             {/*    transfer our knowledge and experience through comprehensive training courses.*/}
                             {/*</p>*/}
                             <p className={'text-justify'}>{about?.ourVision}</p>
                         </div>
                     </div>
                 </div>
             </div>
             <div className="satisfaction">
                 <div className="satisfactionBox">
                     <div
                         className="row"
                         data-aos="fade-up"
                         data-aos-duration="3000"
                     >
                         <div className="bannerText">
                             <h1 className={'text-justify text-white'}>Client Satisfaction</h1>
                             {/*<p>Your complete satisfaction is our mission. Our success will be measured in*/}
                             {/*    client satisfaction and in our ability to exceed our client&#39;s expectations. We*/}
                             {/*    strive to be a renowned name in the industry, through a continuous*/}
                             {/*    improvement program.<br/>*/}
                             {/*    Being a customer centric organization, we at KCS Electrical know that the client satisfaction*/}
                             {/*    is directly proportional to the quality of the products. Client satisfaction and quality,*/}
                             {/*    both are our specialty. We have stuck to the stringent quality policy and have never compromised*/}
                             {/*    with it. We have a separate quality team which performs the quality test during the procurement*/}
                             {/*    of electrical goods from renowned suppliers and manufacturers, just to ensure the reliability*/}
                             {/*    of our products and client satisfaction*/}
                             {/*</p>*/}
                             <p className={'text-justify text-white'}>{about?.clientSatisfaction}</p>
                         </div>
                     </div>
                 </div>
             </div>
             <div className="clientsLogo">
                 <div className="clientBox">
             {/*        <div*/}
             {/*            className="row"*/}
             {/*            data-aos="fade-up"*/}
             {/*            data-aos-duration="3000"*/}
             {/*        >*/}
             {/*            <div className="col-lg-5 col-md-5 col">*/}
             {/*                <div className="logo3 text-right">*/}
             {/*                    <img src="img/client-logo1.png" alt="logo1" />*/}
             {/*                </div>*/}
             {/*            </div>*/}
             {/*            <div className="col-lg-2 col-md-2 col">*/}
             {/*                <div className="logo3 text-center">*/}
             {/*                    <img src="img/client-logo2.png" alt="logo2"/>*/}
             {/*                </div>*/}
             {/*            </div>*/}
             {/*            <div className="col-lg-5 col-md-5 col">*/}
             {/*                <div className="logo3 text-left">*/}
             {/*                    <img src="img/client-logo3.png" alt="logo3"/>*/}
             {/*                </div>*/}
             {/*            </div>*/}
             {/*        </div>*/}
             {/*        <div*/}
             {/*            className="row"*/}
             {/*            data-aos="fade-up"*/}
             {/*            data-aos-duration="3000"*/}
             {/*        >*/}
             {/*            <div className="col-lg-4 col-md-4 col">*/}
             {/*                <div className="logo4 text-right">*/}
             {/*                    <img src="img/client-logo4.png" alt="logo4" />*/}
             {/*                </div>*/}
             {/*            </div>*/}
             {/*            <div className="col-lg-2 col-md-2 col">*/}
             {/*                <div className="logo4 text-center">*/}
             {/*                    <img src="img/client-logo5.png" alt="logo5" />*/}
             {/*                </div>*/}
             {/*            </div>*/}
             {/*            <div className="col-lg-2 col-md-2 col">*/}
             {/*                <div className="logo4 text-center">*/}
             {/*                    <img src="img/client-logo6.png" alt="logo6" />*/}
             {/*                </div>*/}
             {/*            </div>*/}
             {/*            <div className="col-lg-4 col-md-4 col">*/}
             {/*                <div className="logo4 text-left">*/}
             {/*                    <img src="img/client-logo7.png" alt="logo7" />*/}
             {/*                </div>*/}
             {/*            </div>*/}
             {/*        </div>*/}
             {/*        <div*/}
             {/*            className="row"*/}
             {/*            data-aos="fade-up"*/}
             {/*            data-aos-duration="3000"*/}
             {/*        >*/}
             {/*            <div className="col-lg-5 col-md-5 col">*/}
             {/*                <div className="logo3 text-right">*/}
             {/*                    <img src="img/client-logo8.png" alt="logo8"/>*/}
             {/*                </div>*/}
             {/*            </div>*/}
             {/*            <div className="col-lg-2 col-md-2 col">*/}
             {/*                <div className="logo3 text-center">*/}
             {/*                    <img src="img/client-logo9.png" alt="logo9" />*/}
             {/*                </div>*/}
             {/*            </div>*/}
             {/*            <div className="col-lg-5 col-md-5 col">*/}
             {/*                <div className="logo3 text-left">*/}
             {/*                    <img src="img/client-logo10.png" alt="logo10" />*/}
             {/*                </div>*/}
             {/*            </div>*/}
             {/*        </div>*/}
                 </div>
             </div>
         </WebBase>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        about: state?.about?.about,
        gallery: state?.gallery?.gallery,
        client: state?.client?.clients,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // aboutRequest: (params) => dispatch(fetchAboutRequest(params)),
        // clientRequest: (params) => dispatch(fetchAllClientsRequest(params)),
        // galleryRequest: (params) => dispatch(fetchAllGallerysRequest(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs)
