import React, {useEffect, useState} from 'react'
import Slider from "react-slick";
import axios from "axios";
import appUrl from "../../Constants/AppUrl";

const Partners = () => {
    const [client, setClient] = useState([])
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
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

    function setImages() {
        axios.get(appUrl.CLIENT_URL+"/images").then(response=>{
            if(client.length <= 0 && response.data.clients){
                setClient(response.data.clients);
            }
        })
    }
    // console.log('-----------------', client)
    setImages()
    return (
        <>
            <section className="partnersbg pt-5" id={'clients'}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center pt-4 pb-4">
                            <h5 className="heading_fs">Our Clients</h5>
                        </div>

                        <div className="col-lg-12 text-center">
                                <Slider {...settings}>
                                    {
                                        client.map(i=>{
                                            console.log(i)
                                            return(
                                                <div className="item client-carousel">
                                                    <div className="client-carousel-img">
                                                        <img style={{height: 100, width: 200}} src={i} alt="" />
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

export default Partners
