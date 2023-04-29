import React from 'react'
import { Card } from 'antd';

const Brand = () => {
    return (
        <>
            <section className="featuresbg bg-white pt-5" id={'products'}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center pt-4 pb-4">
                            <h5 className="heading_fs">Our Top Products</h5>
                        </div>
                        <div className="row text-center">
                            <Card
                                style={{
                                    width: 290,
                                }}
                                cover={
                                    <img
                                        alt="daikin"
                                        src="https://5.imimg.com/data5/SELLER/Default/2023/4/300672096/OX/JB/KS/54292667/daikin-cassette-air-conditioner-250x250.jpg"
                                    />
                                }
                            >
                                <h4>1.5 Ton Daikin FCMF50ARV16 Cassette AC</h4>
                            </Card>
                            <Card
                                style={{
                                    width: 290,
                                }}
                                cover={
                                    <img
                                        alt="daikin"
                                        src="https://5.imimg.com/data5/SELLER/Default/2023/4/300469874/HW/BC/VE/54292667/daikin-1-5-ton-3-star-inverter-window-ac-250x250.png"
                                    />
                                }
                            >
                                <h4>Daikin 1.5 Ton 3 Star Inverter Window AC</h4>
                            </Card>
                            <Card
                                style={{
                                    width: 290,
                                }}
                                cover={
                                    <img
                                        alt="blue star"
                                        src="https://5.imimg.com/data5/SELLER/Default/2023/4/300476895/AQ/AJ/PD/54292667/blue-star-1-ton-3-star-inverter-split-ac-250x250.jpg"
                                    />
                                }
                            >
                                <h4>Blue Star 1 Ton 3 Star Inverter Split AC</h4>

                            </Card>
                            <Card
                                style={{
                                    width: 290,
                                }}
                                cover={
                                    <img
                                        alt="blue star"
                                        src="https://5.imimg.com/data5/SELLER/Default/2023/4/300781409/ZB/QX/SU/54292667/50-ton-blue-star-process-chiller-250x250.jpg"
                                    />
                                }
                            >
                                <h4>50 Ton Blue Star Process Chiller</h4>
                            </Card>


                            <Card
                                style={{
                                    width: 290,
                                }}
                                cover={
                                    <img
                                        alt="blue star"
                                        src="https://5.imimg.com/data5/SELLER/Default/2023/4/300667789/BY/GH/UB/54292667/daikin-water-cooled-scroll-chiller-250x250.jpg"
                                    />
                                }
                            >
                                <h4>Daikin Make Water Cooled Screw Chiller</h4>
                            </Card>

                            <Card
                                style={{
                                    width: 290,
                                }}
                                cover={
                                    <img
                                        alt="blue star"
                                        src="https://5.imimg.com/data5/SELLER/Default/2023/4/300727920/ZS/WS/EJ/54292667/16-5-ton-dpa1983r1-bluestar-ductable-ac-250x250.jpg"
                                    />
                                }
                            >
                                <h4>16.5 Ton DPA1983R1 Bluestar Ductable AC</h4>
                            </Card><Card
                                style={{
                                    width: 290,
                                }}
                                cover={
                                    <img
                                        alt="blue star"
                                        src="https://5.imimg.com/data5/SELLER/Default/2023/4/300508597/VF/EA/KV/54292667/blue-star-air-cooled-scroll-chiller-250x250.jpg"
                                    />
                                }
                            >
                                <h4>Blue Star Air Cooled Scroll Chiller</h4>
                            </Card>
                            <Card
                                style={{
                                    width: 290,
                                }}
                                cover={
                                    <img
                                        alt="blue star"
                                        src="https://5.imimg.com/data5/SELLER/Default/2023/4/300493983/TJ/KV/SJ/54292667/bluestar-modular-cold-room-250x250.jpg"
                                    />
                                }
                            >
                                <h4>9 Ton Blue Star Meat Cold Storage Room</h4>
                            </Card>
                            <Card
                                style={{
                                    width: 290,
                                }}
                                cover={
                                    <img
                                        alt="blue star"
                                        src="https://5.imimg.com/data5/SELLER/Default/2023/4/300483206/NZ/GJ/WR/54292667/blue-star-window-ac-250x250.jpg"
                                    />
                                }
                            >
                                <h4>Blue Star 1.5 Ton 5 Star Window AC</h4>
                            </Card>


                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Brand
