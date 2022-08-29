

import React from 'react';
import {Link} from 'react-router-dom'

const Invoice = () => {
    return (
        <>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card p-3 Walletinvoice">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                       <div className="mb-3">
                                           <img src="/img/logo.svg" alt="" width="180px" />
                                       </div>
                                       <p>
                                        <strong>Registered Address : </strong> KH 237 Mavai Road Ghaziabad Uttar Pradesh 201009
                                        </p>
                                        <p>
                                        <strong>Corporate Address : </strong> 8th floor, Metro Towers, P-809, scheme 54 Near Mangal City, Indore, Madhya Pradesh-452010
                                        </p>
                                        <div className="d-flex justify-content-center align-content-center">
                                            <p>
                                                <strong>TEL : </strong>  073 1497 0648
                                            </p> &nbsp; &nbsp;
                                            <p className="font-size-16">
                                                <strong className="text-primary">GSTIN : </strong> 09AABCY3114B1ZS
                                            </p>
                                        </div>
                                      </div>
                                    </div>
                                   
                                    <div className="row">
                                    <div className="col-lg-12">
                                        <h4 className="mb-3 tax_title text-center">
                                        Tax Invoice
                                        </h4>
                                    </div>
                                    <div className="col-lg-6">
                                        <p><strong>Invoice No : </strong> 8399494 </p>
                                        <p><strong>Invoice date : </strong>  11-03-2021 </p>
                                        <p><strong>State : </strong> Uttar Pradesh  </p>
                                    </div>
                                    <div className="col-lg-6">
                                        <p><strong>Invoice Type : </strong> 8399494 </p>
                                        <p><strong>Vehicle number : </strong>  446000 </p>
                                     
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <div className="w-100" style={{backgroundColor: "#a67d01",padding: "12px 15px"}}>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                <h5 className="text-white mb-0 text-center">Bill to Party</h5>
                                                </div>
                                                {/* <div className="col-lg-6">
                                                    <h5 className="text-white mb-0 text-center">Ship to Party</h5>
                                                </div> */}
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <p><strong>Name : </strong> YOLOJET INTERNET SERVICES PRIVATE LIMITED </p>
                                            <p><strong>Address : </strong>  KH-237 MAVAI ROAD GHAZIABAD Ghaziabad UP 201009 </p>
                                          
                                        </div>
                                        <div className="col-lg-6">
                                            <p><strong>GSTIN : </strong> 09AABCY3114B1ZS </p>
                                            <p><strong>PAN NO :</strong> AABCY3114B  </p>
                                            <p><strong>State :</strong> Uttar Pradesh  </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-12">
                                        <table className="table table-striped table-bordered dt-responsive nowrap action_icons">
                                            <thead style={{background:"#a57d01"}} className="text-white">
                                                <tr>
                                                    <th>No.</th>
                                                    <th>AWB Number</th>
                                                    <th>HSN/SAC</th>
                                                    <th>Amount (₹)</th>
                                                    <th>Taxable Value (₹)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        1.
                                                    </td>
                                                    <td>
                                                        Milestone 2
                                                    </td>
                                                    <td>
                                                        998314
                                                    </td>
                                                    <td>
                                                        250
                                                    </td>
                                                 
                                                    <td>
                                                        250
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style={{textAlign:"right"}}> 
                                                      <strong className="font-size-20">Total (₹)</strong>
                                                    </td>
                                                    <td>
                                                        200
                                                    </td>
                                                    <td>
                                                        --
                                                    </td>
                                                    <td>
                                                        200
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h5>
                                            Total Invoice amount in words
                                            </h5>
                                            <p>
                                            Rs : Seven Lakh Eighty Nine Thousand Eight Hundred Sixty
                                            Two Only.
                                            </p>
                                            <h5>
                                            Bank Details
                                            </h5>
                                            <p><strong>Bank A/C :</strong> 39774091794 </p>
                                            <p><strong>Bank IFSC: </strong> SBIN0011477 </p>
                                          
                                        </div>
                                        <div className="col-lg-6">
                                            <p className="mb-1"><strong>Total Amount before Tax : </strong> </p>
                                            <p className="mb-1"><strong>Add: SGST @ 9% : </strong>  </p>
                                            <p className="mb-1"><strong>Add: CGST @ 9% : </strong>  </p>
                                            <p className="mb-1"><strong>Add: IGST @ 18% :</strong>   </p>
                                            <p className="mb-1"><strong>Total Amount after Tax :</strong>  </p>
                                            <p className="mb-1"><strong>GST on Reverse Charge :</strong>  </p>
                                        </div>
                                      
                                    </div>
                                    <div className="row" style={{borderTop: "1px solid #eee"}}>
                                    <div className="col-lg-6 pt-2">
                                                <h5>
                                                Terms & conditions
                                                </h5>
                                                <ol style={{paddingLeft:"15px"}}>
                                                    <li>
                                                    Visit yolojet.com/TermsAndConditions to view the conditions of carriage
                                                    </li>
                                                    <li>
                                                    Shipping charges are inclusive of service tax and all figures are in INR

                                                    </li>
                                                    <li>
                                                    All disputes are subject to GHAZIABAD (U.P) jurisdiction.
                                                    </li>
                                                </ol>
                                            </div>
                                            <div className="col-lg-6">
                                            <h5 className="pt-5 text-center">For Yolojet Internet Services Pvt. Ltd.</h5>
{/* 
                                            <h6 className="pt-5 text-center">
                                            Authorised signatory
                                            </h6> */}
                                            </div>
                                            <div className="col-lg-12 text-center">
                                                <p className="font-size-13 mt-3 pt-3 pb-3 mb-0" style={{    background:" #eee"}}>This is an auto generated invoice and does not need a signature</p>
                                            </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Invoice
