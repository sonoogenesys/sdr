import React, {useEffect, useState} from 'react'
import Slider from "react-slick";
import {connect} from "react-redux";

// const products = [
//     'img/51.jpeg',
//     'img/75.jpeg',
//     'img/52.jpeg',
//     'img/53.jpeg',
//     'img/54.jpeg',
//     'img/55.jpeg',
//     'img/56.jpeg',
//     'img/57.jpeg',
//     'img/58.jpeg',
//     'img/59.jpeg',
//     'img/60.jpeg',
//     'img/61.jpeg',
//     'img/62.jpeg',
//     'img/63.jpeg',
//     'img/64.jpeg',
//     'img/65.jpeg',
//     'img/66.jpeg',
//     'img/67.jpeg',
//     'img/68.jpeg',
//     'img/69.jpeg',
//     'img/70.jpeg',
//     'img/71.jpeg',
//     'img/72.jpeg',
//     'img/73.jpeg',
//     'img/74.jpeg',
//     'img/2.jpeg',
//     'img/3.jpeg',
//     'img/4.jpeg',
//     'img/5.jpeg',
//     'img/6.jpeg',
//     'img/7.jpeg',
//     'img/8.jpeg',
//     'img/9.jpeg',
//     'img/10.jpeg',
//     'img/12.jpeg',
//     'img/13.jpeg',
//     'img/14.jpeg',
//     'img/16.jpeg',
//     'img/18.jpeg',
//     'img/19.jpeg',
//     'img/20.jpeg',
//     'img/21.jpeg',
//     'img/22.jpeg',
//     'img/23.jpeg',
//     'img/24.jpeg',
//     'img/25.jpeg',
//     'img/26.jpeg',
//     'img/27.jpeg',
//     'img/28.jpeg',
//     'img/29.jpeg',
//     'img/30.jpeg',
//     'img/31.jpeg',
//     'img/32.jpeg',
//     'img/33.jpeg',
//     'img/34.jpeg',
//     'img/35.jpeg',
//     'img/36.jpeg',
//     'img/37.jpeg',
//     'img/38.jpeg',
//     'img/39.jpeg',
//     'img/40.jpeg',
//     'img/41.jpeg',
//     'img/42.jpeg',
//     'img/43.jpeg',
//     'img/44.jpeg',
//     'img/45.jpeg',
//     'img/46.jpeg',
//     'img/47.jpeg',
//     'img/48.jpeg',
// ]

class House extends React.Component {

    render() {
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
        const {gallery} = this.props

        let images = Object.values(gallery).map(o=>o.logo);

        return (
            <>
                <section className="featuresbg pt-5" id={'gallery'}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center pt-4 pb-4">
                                <h5 className="heading_fs">Gallery</h5>
                            </div>
                            <div className="col-lg-12 text-center">
                                <Slider {...settings}>
                                    {
                                        images.map(i=>{
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
}


const mapStateToProps = (state) => {
    return {
        about: state?.about?.about,
        gallery: state?.gallery?.gallery,
        // client: state?.client?.clients,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // aboutRequest: (params) => dispatch(fetchAboutRequest(params)),
        // clientRequest: (params) => dispatch(fetchAllClientsRequest(params)),
        // galleryRequest: (params) => dispatch(fetchAllGallerysRequest(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(House)

