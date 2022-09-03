import React from 'react'
import Slider from "react-slick";

const products = [
    'img/P7.jpeg',
    'img/P8.jpeg',
    'img/P6.jpeg',
    'img/P23.jpeg',
    'img/P11.jpeg',
    'img/P13.jpg',
    'img/P17.png',
    'img/P5.webp',
]


const Brand = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
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
            <section className="partnersbg bg-white pt-5" id={'products'}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center pt-4 pb-4">
                            <h5 className="heading_fs">Our Top Products</h5>
                        </div>
                        <div className="col-lg-12 text-center">
                            <Slider {...settings}>
                                {
                                    products.map(i=>{
                                            return (
                                                <div className="item client-carousel">
                                                    <div className="client-carousel-img">
                                                        <img style={{width: 200, height: 150}} src={i} alt=""/>
                                                    </div>
                                                </div>
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

export default Brand
