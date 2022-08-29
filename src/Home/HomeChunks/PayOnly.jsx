

import React from 'react'

const PayOnly = () => {
        return (
            <>
                <section className="pt-5 pb-5" style={{backgroundColor: '#a87410'}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 pl-5 pb-4">
                                <img src="img/payonly.png" alt="" height="360px" / >
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 text-white ">
                                        <h2 className=" heading_fs">
                                                Pay only for what you ship,<br></br>
                                                not a penny more.
                                        </h2>
                                        <p className="text-height-2 mb-3">Pay only for what you ship
                                        </p>
                                        <div>                                        
                                            {/*<p><span><img src="img/4.png" alt=""/></span>pay as you go model</p>
                                            <p><span><img src="img/4.png" alt=""/></span>Lowest rates starting at ₹25/0.500gms</p>
                                            <p><span><img src="img/4.png" alt=""/></span>Your account will always remain FREE</p>*/}
                                            <p style={{ backgroundImage: "url('img/4.png')", margin: '0 auto', backgroundSize: '30px 30px', backgroundRepeat:'no-repeat', paddingLeft: '50px',paddingBottom:'5px'}}>
                                                <span>Pay as you go model</span></p>
                                            <p style={{ backgroundImage: "url('img/4.png')", margin: '0 auto', backgroundSize: '30px 30px', backgroundRepeat:'no-repeat', paddingLeft: '50px',paddingBottom:'5px'}}>
                                                <span>Lowest rates starting at ₹25/0.500 kgs*</span></p>
                                            <p style={{ backgroundImage: "url('img/4.png')", margin: '0 auto', backgroundSize: '30px 30px', backgroundRepeat:'no-repeat', paddingLeft: '50px',paddingBottom:'5px'}}>
                                                <span>Your account will always remain FREE</span></p>        
                                        </div>
                                </div>
                            </div>
                        </div>    
                </section>    
            </>
        )
    }

export default PayOnly
