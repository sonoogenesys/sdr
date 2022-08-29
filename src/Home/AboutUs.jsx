
import React from 'react';
import WebBase from "./WebLayout/WebBase";
import {NavLink} from 'react-router-dom'
const AboutUs = () => {
    return (
        <>
         <WebBase>
          <section className="career-pg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 pt-5 pb-3">
                            <p>Yolojet is an innovative technology powered, automated shipping solution for sellers.Our solution enables you tocompare among leading logistic companies with regards to their price and time of delivery between specified source and destination pin codes. You can Select the best for you based on your preferences ofshipment costor the time of delivery for your shipment, in just a click.  Yolojet’s free to use platform comes with host of benefits along with following services/solutions, to ensure that your shipments issues are the last thing to worry about for you.</p>
                            <ul>
                                <li>27000+ Serviceable Pin Codes</li>
                                <li>More than 12 leading logistic companies to choose from</li>
                                <li>Discounted Shipping Rates</li>
                                <li>Freedom to compare and choose basis your preference of price and TAT</li>
                                <li>Dashboard to give you unified view of your shipment</li>
                                <li>Dedicated account manager</li>
                                <li>Hyper-local Delivery</li>
                                <li>Our analytics powered Recommendation Engine to help you choose the best</li>
                                <li>Flexibility of shipping your consignment on both Prepaid &amp; Cash on Delivery modes</li>
                                <li>Option of both individual and Bulk order upload</li>
                                <li>Tracking of your shipment</li>
                                <li>Multiple Pickup Locations</li>
                                <li>Professional customer service and dedicated NDR and Dispute management team</li>
                                <li>Quick and easy onboarding process.</li>
                        </ul>
                        <div className="text-center pt-4">
                            <NavLink to="/Career" className="btn btn-primary">Apply Now</NavLink>

                        </div>
                        </div>
                    </div>
                </div>
            </section>
        
         </WebBase>
        </>
    )
}

export default AboutUs
