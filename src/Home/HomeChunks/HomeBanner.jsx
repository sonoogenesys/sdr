

import React, { useState, useEffect } from "react";

import Slider from "react-slick";


const HomeBanner = () => {

	const settings = {
		dots: false,
		infinite: true,
        fade: true,
		autoplay: true,
		speed: 500,
		autoplaySpeed: 4000,
		cssEase: "linear",
		pauseOnHover: true,
		slidesToShow: 1,
        slidesToScroll: 1,
	  }

    return(
		<>
        <Slider {...settings}>
                <article className="home_banner common_banner banner1">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-7 col-md-12 col-sm-12 home_banner_text">
                        {/*<p className="text-white"><strong>YOLOJET</strong> is empowering <strong>sellers and Individuals</strong> <span className="theme_text_color">easy pickup and delivery services  along </span> with <strong>resolving the logistics pain points.</strong> Thus delivering flawless experience.</p>
			          */}        <h1 className="text-white display-4"><strong>Timely work completion services.</strong>
			                    </h1>
			                    <p className="text-white">
                                    We agrees to prosecute the Work and to require all trade contractors to prosecute the Work in a timely and proper method and manne
			                    </p>
                        </div>
                    </div>
                    </div>
                </article>
				<article className="home_banner common_banner banner2">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12 home_banner_text">
                        {/*<p className="text-white"><strong>YOLOJET</strong> is empowering <strong>sellers and Individuals</strong> <span className="theme_text_color">easy pickup and delivery services  along </span> with <strong>resolving the logistics pain points.</strong> Thus delivering flawless experience.</p>
			          */}        <h1 className="text-white display-4"><strong>Clients satisfaction</strong>
			                    </h1>
			                    <p className="text-white">
                                    Our client satisfaction that determines how happy customers are with our products, services, and capabilities</p>
                        </div>
                    </div>
                    </div>
                </article>
				<article className="home_banner common_banner banner3">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-7 col-md-12 col-sm-12 home_banner_text">
                        {/*<p className="text-white"><strong>YOLOJET</strong> is empowering <strong>sellers and Individuals</strong> <span className="theme_text_color">easy pickup and delivery services  along </span> with <strong>resolving the logistics pain points.</strong> Thus delivering flawless experience.</p>
			          */}        <h1 className="text-white display-4"><strong>Qualities assurance</strong>
			                    </h1>
			                    <p className="text-white">
                                    Maintenance of a desired level of quality in a service or product, especially by means of attention to every stage of the process of delivery or production.</p>
                        </div>
                    </div>
                    </div>
                </article>
				<article className="home_banner common_banner banner4">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-7 col-md-12 col-sm-12 home_banner_text">
                        {/*<p className="text-white"><strong>YOLOJET</strong> is empowering <strong>sellers and Individuals</strong> <span className="theme_text_color">easy pickup and delivery services  along </span> with <strong>resolving the logistics pain points.</strong> Thus delivering flawless experience.</p>
			          */}        <h1 className="text-white display-4"><strong>Our vision</strong>
			                    </h1>
			                    <p className="text-white">
                                    We deeply recognize the needs of our Clients who are constantly searching for the latest technologies and new ways of thinking to make the best project decisions</p>
                        </div>
                    </div>
                    </div>
                </article>
            </Slider>
	</>

)
}




export default HomeBanner;