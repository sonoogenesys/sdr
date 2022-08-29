import React from 'react'
import Slider from "react-slick";

const products = [
    'img/2.jpeg',
    'img/3.jpeg',
    'img/4.jpeg',
    'img/5.jpeg',
    'img/6.jpeg',
    'img/7.jpeg',
    'img/8.jpeg',
    'img/9.jpeg',
    'img/10.jpeg',
    'img/12.jpeg',
    'img/13.jpeg',
    'img/14.jpeg',
    'img/16.jpeg',
    'img/18.jpeg',
    'img/19.jpeg',
    'img/20.jpeg',
    'img/21.jpeg',
    'img/22.jpeg',
    'img/23.jpeg',
    'img/24.jpeg',
    'img/25.jpeg',
    'img/26.jpeg',
    'img/27.jpeg',
    'img/28.jpeg',
    'img/29.jpeg',
    'img/30.jpeg',
    'img/31.jpeg',
    'img/32.jpeg',
    'img/33.jpeg',
    'img/34.jpeg',
    'img/35.jpeg',
    'img/36.jpeg',
    'img/37.jpeg',
    'img/38.jpeg',
    'img/39.jpeg',
    'img/40.jpeg',
    'img/41.jpeg',
    'img/42.jpeg',
    'img/43.jpeg',
    'img/44.jpeg',
    'img/45.jpeg',
    'img/46.jpeg',
    'img/47.jpeg',
    'img/48.jpeg',
]


const House = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
        cssEase: "linear",
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    };
    return (
        <>
            <section className="partnersbg pt-5 pb-5 bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center pt-4 pb-4">
                            <h5 className="heading_fs">Gallery</h5>
                        </div>
                        <div className="col-lg-12 text-center">
                            <Slider {...settings}>
                                {
                                    products.map(i=>{
                                        return (
                                            <>
                                            {/*<div className="item client-carousel">*/}
                                            {/*    <div className="client-carousel-img">*/}
                                                    <img style={{width: 200, height: 200}} src={i} alt=""/>
                                                {/*</div>*/}
                                            {/*</div>*/}
                                            </>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default House
