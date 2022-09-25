import React, {useEffect, useState} from 'react'
import Slider from "react-slick";
import axios from "axios";
import appUrl from "../../Constants/AppUrl";
const client = [
    "img/C1.png"
    ,"img/C3.png"
    ,"img/C4.png"
    ,"img/C23.svg"
    ,"img/C9.jpeg"
    ,"img/C18.jpeg"
    ,"img/C20.png"
    ,"img/C26.jpeg"
    ,"img/C28.png"
    ,"img/C7.jpeg"
    ,"img/C8.png"
    ,"img/C12.png"
    ,"img/C13.jpeg"
    ,"img/C10.webp"
    ,"img/C11.png"
    ,"img/C14.png"
    ,"img/C15.png"
    ,"img/C2.png"
    ,"img/C5.jpeg"
    ,"img/C6.jpeg"
    ,"img/C16.png"
    ,"img/C17.png"
    ,"img/C19.png"
    ,"img/C21.png"
    ,"img/C22.jpeg"
    ,"img/C24.png"
    ,"img/C25.png"
    ,"img/C27.png"
]
const Partners = () => {
    // const [client, setClient] = useState([])
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

    // function setImages() {
    //     axios.get(appUrl.CLIENT_URL+"/images").then(response=>{
    //         if(client.length <= 0 && response.data.clients){
    //             setClient(response.data.clients);
    //         }
    //     })
    // }
    // console.log('-----------------', client)
    // setImages()
    return (
        <>
            <section className="featuresbg pt-5" id={'clients'}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center pt-4 pb-4">
                            <h5 className="heading_fs">Our Clients</h5>
                        </div>

                        <div className="col-lg-12 text-center">
                                <Slider {...settings}>
                                    {
                                        client.map(i=>{
                                            return(
                                                <div className="item client-carousel">
                                                    <div className="client-carousel-img">
                                                        <img style={{height: 120, width: 200}} src={i} alt="" />
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
