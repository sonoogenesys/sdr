import React from 'react';
import WebBase from "./WebLayout/WebBase";
import Card from 'react-bootstrap/Card';
const P4= "img/P4.jpg"
const P5= "img/P5.webp"
const P6= "img/P6.jpeg"
const P7= "img/P7.jpeg"
const P8= "img/P8.jpeg"
const P9= "img/P9.jpeg"
const P10= "img/P10.jpeg"
const P11= "img/P11.jpeg"
const P12= "img/P12.jpeg"
const P13= "img/P13.jpg"
const P14= "img/P14.jpeg"
const P15= "img/P15.jpeg"
const P16= "img/P16.jpeg"
const P17= "img/P17.png"
const P19= "img/P19.jpeg"
const P20= "img/P20.jpeg"
const P21= "img/P21.png"
const P22= "img/P22.webp"
const P23= "img/P23.jpeg"
const P24= "img/P24.jpeg"
const P25= "img/P25.png"
const P26= "img/P26.jpeg"
const P27= "img/P27.jpeg"
const P28= "img/P28.jpeg"
const P29= "img/P29.png"
const P30= "img/P30.jpeg"
const P31= "img/P31.webp"
const P32= "img/P32.png"
const P33= "img/P33.jpeg"
const P34= "img/P34.jpeg"
const P35= "img/P35.webp"
const P36= "img/P36.jpeg"
const P37= "img/P37.webp"
const P38= "img/P38.jpeg"
const P39= "img/P39.png"
const P40= "img/P40.webp"
const P41= "img/P41.jpeg"
const P42= "img/P42.png"

const products = {
    "Transformer_and_AVR": [
        {
            image: P7,
            name: "Distribution Transformer",
            description: "",
            meta: {},
            alt: "transformer|distribution"
        },
        {
            image: P31,
            name: "HT Current Transformer",
            description: "Leveraging on our vast knowledge of this realm, we are betrothed in presenting an optimal quality series of Current Transformer.",
            meta: {},
            alt: "ht|current|transformer"
        },
        {
            image: P32,
            name: "Potential Transformer",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P33,
            name: "LT Current Transformer",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P34,
            name: "Dry Transformer",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P35,
            name: "Dry AVR",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P22,
            name: "AVR Servo",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        }
    ],
    "Panels": [
        {
            image: P8,
            name: "LT Panels",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P9,
            name: "HT VCB Panels",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P10,
            name: "HT CT PT Meter Panel Complete",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P36,
            name: "HT Load Break Switch",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P42,
            name: "Load Break SF6 RMU",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P37,
            name: "Capacitor Panel",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        }
    ],
    "Cables": [
        {
            image: P6,
            name: "Amoured Cable",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P38,
            name: "Flexible Wire",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P39,
            name: "Conductor",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P40,
            name: "Flexible PVC Insulted Cable",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P12,
            name: "HT/LT Cables",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        }
    ],
    "Meters": [
        {
            image: P23,
            name: "Ampere Meter",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P4,
            name: "AE Meter",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P24,
            name: "Volt Meter",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P25,
            name: "Dual Meter",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P26,
            name: "Kilowatt Meter",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P27,
            name: "Automatic Power Factor Relay",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P28,
            name: "ABT Meter",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P29,
            name: "ABT Meter",
            description: "",
            meta: {},
            alt: "Secure HT CT Net Meter 0.2S"
        },       {
            image: P30,
            name: "LT CT Meter",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
    ],
    "Kits": [
        {
            image: P11,
            name: "Heat Shrinkable joint kits",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P14,
            name: "Earthing Materials",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P19,
            name: "Electronic Testing Instrument",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P20,
            name: "Cable Lugs & Glands",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P21,
            name: "Electronic Controllers",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
    ],
    "Earthing": [
        {
            image: P13,
            name: "Chemical Earthing Electrode",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P41,
            name: "Plates",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        }
    ],
    "Cable_Trays": [
        {
            image: P17,
            name: "Cable Tray",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        }
    ],
    "Accessories": [
        {
            image: P5,
            name: "GI STRIP AND COPPER STRIP",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P16,
            name: "PCC Pole and Overhead Line Material",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        },
        {
            image: P15,
            name: "Earthing Copper Strip",
            description: "",
            meta: {},
            alt: "Potential|transformer"
        }
    ]

}

const Products = () => {
    return (
        <>
            <WebBase>
                    <section className="work-section pt-5 pb-5" id="products">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center text-white pt-3 pb-2">
                                    <h4 className="heading_fs mr-5">Our Top Products</h4>
                                </div>
                                <div className="col-lg-12">
                                    <div className="d-flex justify-content-center text-white left_wrapper">
                                        <div className="d-flex inner_left_wrapper">
                                            <div>
                                                <div className="com_css order-stroke position-relative">
                                                    <div className="d-flex align-items-center">
                                                        <h6 className="text-right mr-2">Panels</h6>
                                                        <div className="hex CreateOrder"></div>
                                                        <svg  style={{visibility: 'hidden', position: 'absolute'}} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                            <defs>
                                                                <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                                                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                                                    <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                                                                </filter>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="com_css product-stroke position-relative">
                                                    <div className="d-flex align-items-center">
                                                        <h6 className="text-right mr-2">Cables</h6>
                                                        <div className="hex product-detail"></div>
                                                        <svg  style={{visibility: 'hidden', position: 'absolute'}} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                            <defs>
                                                                <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                                                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                                                    <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                                                                </filter>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="position-relative">
                                                    <div className="hex large_hex">
                                                        <div className="large_hex_content">
                                                            <img src="img/P7.jpeg"  className="largeBox"  style={{width: 75, height: 75}}/>
                                                            <img src="img/P7.jpeg" className="largeBoxfff" style={{width: 150, height: 150, borderRadius: 50}}/>
                                                            <h5 className="mt-2">Transformer and AVR</h5>
                                                            <p>Something need to write here for broadcasting and attractive</p>
                                                        </div>
                                                    </div>
                                                    <svg  style={{visibility: 'hidden', position: 'absolute'}} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                        <defs>
                                                            <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                                                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                                                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                                                            </filter>
                                                        </defs>
                                                    </svg>
                                                </div>

                                            </div>

                                        </div>

                                        <div>
                                            <div className="track-stroke position-relative mobile-d-none">
                                                <div className="d-flex align-items-center">
                                                    <div className="hex tracking_hex"></div>
                                                    <svg  style={{visibility: 'hidden', position: 'absolute'}} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                        <defs>
                                                            <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                                                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                                                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                                                            </filter>
                                                        </defs>
                                                    </svg>
                                                    <h6 className="text-right ml-2">Accessories & Others</h6>
                                                </div>
                                            </div>
                                            <div className="com_css pick-stroke position-relative mobile-d-none">
                                                <div className="d-flex align-items-center">
                                                    <div className="hex pickup_hex"></div>
                                                    <svg  style={{visibility: 'hidden', position: 'absolute'}} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                        <defs>
                                                            <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                                                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                                                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                                                            </filter>
                                                        </defs>
                                                    </svg>
                                                    <h6 className="text-right ml-2">Cables Tray</h6>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center text-white left_wrapper">
                                        <div className="com_css compare-stroke position-relative">
                                            <div className="d-flex align-items-center">
                                                <h6 className="text-right mr-2">Meters</h6>
                                                <div className="hex compare_hex"></div>
                                                <svg  style={{visibility: 'hidden', position: 'absolute'}} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                    <defs>
                                                        <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                                                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                                            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                                                        </filter>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="com_css select-stroke position-relative">
                                            <div className="d-flex align-items-center flex-column-reverse">
                                                <h6 className="text-right select-desktop">Kits</h6>
                                                <div className="d-flex align-items-center">
                                                    <h6 className="text-right select-mobile d-none">Kits</h6>
                                                    <div className="hex select_hex"></div>
                                                    <svg  style={{visibility: 'hidden', position: 'absolute'}} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                        <defs>
                                                            <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                                                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                                                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                                                            </filter>
                                                        </defs>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="com_css pay-stroke position-relative">
                                            <div className="d-flex align-items-center">
                                                <div className="hex pay_hex"></div>
                                                <svg  style={{visibility: 'hidden', position: 'absolute'}} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                    <defs>
                                                        <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                                                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                                            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                                                        </filter>
                                                    </defs>
                                                </svg>
                                                <h6 className="text-right ml-2">Earthing</h6>
                                            </div>
                                        </div>
                                        <div className="track-stroke position-relative d-none">
                                            <div className="d-flex align-items-center">
                                                <div className="hex tracking_hex"></div>
                                                <svg  style={{visibility: 'hidden', position: 'absolute'}} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                    <defs>
                                                        <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                                                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                                            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                                                        </filter>
                                                    </defs>
                                                </svg>
                                                {/*<h6 className="text-right ml-2">Automated*/}
                                                {/*    Tracking</h6>*/}
                                            </div>
                                        </div>
                                        <div className="com_css pick-stroke position-relative d-none">
                                            <div className="d-flex align-items-center">
                                                <div className="hex pickup_hex"></div>
                                                <svg  style={{visibility: 'hidden', position: 'absolute'}} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                    <defs>
                                                        <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                                                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                                            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                                                        </filter>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                <div className={'mb-5'}>
                    {Object.keys(products).map(name=>{
                        let label = name.replace("_" , " ");
                        console.log(label)
                        return (<div className={'m-5'} style={{position: 'relative'}}>
                            <h1 className={'label'}>{label}</h1>
                                {
                                    products[name].map(o=>{
                                        return <ProductItemCard
                                                img={o.image}
                                                name={o.name}
                                                alt={o.alt}
                                        />
                                    })
                                }
                        </div>)
                    })}
                </div>
            </WebBase>
        </>
    )
}
export default Products

const ProductItemCard = ({ img, name, onClick }) => {
    return (
        <div className="projectlist-item-container">
            <Card onClick={onClick} className="projectlist-item-card">
                <img className="project-name"  src={img} alt={name} />
                <div className="project-action">
                    {name}
                </div>
            </Card>
        </div>
    )
}