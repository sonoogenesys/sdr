


import React, {useState} from 'react';
import {NavLink} from 'react-router-dom'
import GetInTouch from './GetInTouch';


const LogisticSection = () => {


    const [showModal, setshowModal] = useState(false)


    const GetinTouch = () =>{

        setshowModal(!showModal)
    }

   
    return (
        <>
        <section className="pb-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 logistics_content mb-2">
                        <h4 className="heading_fs">KCS Introduction</h4>
                        <p>KCS Electrical Engineers is a complete Electrical Engineering firm. We are a brand which ensures inimitable services to our clients. KCS Electrical strives for nothing but the best.
                         </p><p>   KCS Electrical came into existence in the year 2006. KCS Electrical is a brainchild of qualified engineers sharing common goals and professional acumen in their respective domains. We work with our clients as partners to cater all their requirements in a simple and cost effective manner.
                        </p>
                        <p>
                            Our forte was in Electrical Engineering projects. We now provide a complete gamut of services for Electrical Turnkey projects, Electrical Engineering consultancy.
</p>
                        <p>
                            Our personnel management strategies focus on building human resource and creating an environment where talent can be procreated. Client satisfaction is our motto and we are a perfect blend of employee talent, technical expertise and modern technology.
                        </p>
                    </div>
                    {/*<div className="col-lg-5 col-md-5 col-sm-5 col-12">*/}
                    {/*    <p className="pt-4 text-center">*/}
                    {/*        <img src="img/weight-rate.png" alt="" height="300"/ >*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                   {/* <div className="col-lg-3 col-md-5 col-sm-5">
                        <div className="contact_parent">
                            <div className="contact_box">
                                <img src="img/diagnalbox.png" alt="" />
                            </div>
                            <div className="contact_content">
                                <p><a href="tel:07314970648" className="text-dark">073 1497 0648</a></p>
                                <p><a href="mailto:reachus@yolojet.com" className="text-dark">reachus@yolojet.com</a></p>
                                <button type="button" data-toggle="modal" data-target="#contactform" className="bg-black  pl-3 pr-3 pt-2 pb-2 mb-2 d-inline-block text-white border-0 getin_touch"
                                onClick={GetinTouch}
                                >GET IN TOUCH &nbsp; <i className="fa fa-chevron-right" aria-hidden="true"></i></button>
                            
                                <p><a href="https://api.whatsapp.com/send?phone=+919024557318&amp;text=Hi there!" target="_blank" className=" d-inline-block text-dark"><i className="mdi mdi-whatsapp" aria-hidden="true"></i> whatsapp</a></p>
                            </div>
                        </div>
                    </div>*/}
                    {/*<div className="col-lg-12 text-center mb-5">
                        <NavLink to="/login" className="d-inline-block theme_bg_color text-white pt-2 pb-2 pl-4 pr-4 text-decoration-none">CHECK BEST TIME AND RATE &nbsp; <i className="fa fa-chevron-down" aria-hidden="true"></i></NavLink>
                    </div>*/}
                </div>
            </div>
        </section>

        <GetInTouch 
        show={showModal}
        handleClose={GetinTouch}
        title="GET IN TOUCH"
        />
     
        </>

    )
}

export default LogisticSection
