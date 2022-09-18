import React from "react";
import moment from "moment";
import BaseTable from "../Utils/BaseTable";
import NumToWords from "../Utils/NumToWords";

const TableComponent = (props) => {

    let invoice = props.invoice;

    let headingData = [
        "S. No.",
        "Product Description",
        "HSN / SAC",
        "UOM",
        "Qty",
        "Rate",
        "GST %",
        "Amount",
        "Item Disc.",
        "Taxable Value"
    ]

    const renderRowItem = (item, index) => {
        return (
            <tr key={index}>
                <td style={{textAlign:'center'}}>{index + 1}</td>
                <td>{item?.name + item?.description}</td>
                <td>{item?.hsn}</td>
                <td>{item?.uom}</td>
                <td>{item?.qty}</td>
                <td style={{ width: "10%" }}>₹ {parseFloat((item?.rate) || 0).toFixed(2)}</td>
                <td style={{ width: "10%" }}>{parseFloat(item?.gst || 18).toFixed(2)}</td>
                <td style={{textAlign:'center', width: "10%"}}>₹ {parseFloat((item?.rate || 0) * Number(item?.qty)).toFixed(2)}</td>
                <td>{item?.desc ? item.desc : "-"}</td>
                <td>₹ {parseFloat((item?.rate || 0) * Number(item?.qty)).toFixed(2)}</td>
            </tr>
        );
    };
    let amount = Object.values(invoice?.items).reduce((accumulator, currentValue)=>accumulator + (currentValue.rate * Number(currentValue.qty)), 0)
    return (
        <div className="col-md-12">
            <div className="card indivisual_invoice">
                <div className="col-md-12">
                    <div className="col-md-12">
                        <img style={{width: '100%', height: 120}} src={"/img/logo.jpeg"}/>
                        <div className="row">
                            <p style={{letterSpacing: '1.3px'}}><b>Distribution Transformers, LT Panels, HT Panel, CT, PT, HT/LT Cables, Cable Jointing Kit, Earthing Material, PCC Pole, Cable Tray etc.</b></p>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            {/*<div className="col-md-3 text-left">*/}
                            <p className="mb-1"><b>GST No:</b> 06ARFPS3941N1ZA</p>
                            {/*</div>*/}
                            <div className="col-md-4 text-center">
                                <p className="mb-1"><b>PAN No:</b> ARFPS3941N</p>
                            </div>
                            <div className="col-md-4 text-center">
                                <p className="mb-1"><b>e-mail:</b> sales@kcs-electrical.com</p>
                            </div>
                            <div className="col-md-2 text-right">
                                <p className="mb-1"><b>Mob:</b> #9810959039</p>
                            </div>
                        </div>
                    </div>

                    <div className="total_amt pt-3 pb-3 d-flex justify-content-center">
                        <h5 className="">
                            <span>Tax Invoice</span>
                        </h5>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="row mt-3" >
                        <div className="col-md-6 invoice_logo_wrapper" >
                            <p className="mb-1"><b>Ship from Location: </b>{invoice?.selectedCity}</p>
                        </div>
                        <div className="col-md-6 invoice_logo_wrapper text-left">
                            <p className="mb-1"></p>
                        </div>
                    </div>

                    <div className="row mt-1">
                        <div className="col-md-6 invoice_logo_wrapper">
                            <p className="mb-1"><b>Invoice No: </b>004 /2021-22</p>
                        </div>
                        <div className="col-md-6 invoice_logo_wrapper text-left">
                            <p className="mb-1"><b>Transport Mode: </b>{invoice?.selectedTransport}</p>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md-6 invoice_logo_wrapper">
                            <p className="mb-1" style={{ letterSpacing: 1 }}><b>Invoice Date: </b> {moment(invoice?.invoiceDate).format("D MMM YYYY, h:mm:ss a")}</p>
                        </div>
                        <div className="col-md-6 invoice_logo_wrapper text-left">
                            <p className="mb-1"><b>Vehicle number:</b>{invoice?.vehicle}</p>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md-6 invoice_logo_wrapper">
                            <p className="mb-1"><b>Reverse Charge (Y/N):</b> {invoice?.selectedReverse}</p>
                        </div>
                        <div className="col-md-6 invoice_logo_wrapper text-left">
                            <p className="mb-1"><b>LR/GR No: </b>{invoice?.lrNo}</p>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md-6 invoice_logo_wrapper">
                            <p className="mb-1"><b>State:</b> {invoice?.selectedState}</p>
                        </div>
                        <div className="col-md-6 invoice_logo_wrapper text-left">
                            <p className="mb-1"><b>Place of Supply:</b>{invoice?.supply}</p>
                        </div>
                    </div>
                </div>

                <hr/>

                <div className="col-md-12">
                    <div className="row mt-3">
                        <div className="col-md-6 invoice_logo_wrapper">
                            <h5>Billed To:</h5>
                            <p className="mb-1">{invoice?.billing_address?.name}</p>
                            <p className="mb-1">{invoice?.billing_address?.address}</p>
                            <p className="mb-1"><b>GSTIN: </b>{invoice?.billing_address?.gst}</p>
                        </div>
                        <div className="col-md-6 invoice_logo_wrapper text-left">
                            <h5>Shipped To:</h5>
                            <p className="mb-1">{invoice?.shipping_address?.name}</p>
                            <p className="mb-1">{invoice?.shipping_address?.address}</p>
                            <p className="mb-1"><b>GSTIN: </b>{invoice?.shipping_address?.gst}</p>
                        </div>
                    </div>
                </div>

                <hr/>

                <div className="col-md-12 mt-3">
                    <div className="card-body">
                        <BaseTable
                            headingData={headingData}
                            rowData={Object.values(invoice?.items)}
                            renderRowItem={renderRowItem}
                        />
                    </div>
                </div>

                <div className="col-md-12 invoice_logo_wrapper text-right" style={{marginRight: 10}}>
                    <p className="mb-1 fa-1x"><b>Total:</b> ₹ {parseFloat(amount).toFixed(2)}</p>
                </div>

                <hr/>

                <div className="col md-12">
                    <div className="row">
                        {/*<div className="col-md-6 invoice_logo_wrapper"/>*/}
                        <div className="col-md-6 invoice_logo_wrapper">
                            <p className="mb-1">Add: Packing & Forwarding</p>
                        </div>
                        <div className="col-md-6 invoice_logo_wrapper text-right">
                            <p className="mb-1">{invoice?.packing}</p>
                        </div>
                    </div>
                    <div className="row">
                        {/*<div className="col-md-6 invoice_logo_wrapper"/>*/}
                        <div className="col-md-6 invoice_logo_wrapper">
                            <p className="mb-1">Add: Insurance charges</p>
                        </div>
                        <div className="col-md-6 invoice_logo_wrapper text-right">
                            <p className="mb-1">{invoice?.insurance}</p>
                        </div>
                    </div>
                    <div className="row">
                        {/*<div className="col-md-6 invoice_logo_wrapper"/>*/}
                        <div className="col-md-6 invoice_logo_wrapper">
                            <p className="mb-1">Add: Freight</p>
                        </div>
                        <div className="col-md-6 invoice_logo_wrapper text-right">
                            <p className="mb-1">{invoice?.freight}</p>
                        </div>
                    </div>
                    <div className="row">
                        {/*<div className="col-md-6 invoice_logo_wrapper"/>*/}
                        <div className="col-md-6 invoice_logo_wrapper">
                            <p className="mb-1">Less: Discount(Cash/quantity/turnover etc.)</p>
                        </div>
                        <div className="col-md-6 invoice_logo_wrapper text-right">
                            <p className="mb-1">{invoice?.discount}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 invoice_logo_wrapper"/>
                        <div className="col-md-4 invoice_logo_wrapper">
                            <p className="mb-1">Net Taxable Amount:-</p>
                        </div>
                        <div className="col-md-2 invoice_logo_wrapper text-right">
                            <p className="mb-1">₹ {parseFloat(amount).toFixed(2)}</p>
                        </div>
                    </div>
                    <hr/>

                    <div className="row">
                        <div className="col-md-8 invoice_logo_wrapper">
                            <p className="mb-1">Bank Details</p>
                        </div>
                        <div className="col-md-2 invoice_logo_wrapper text-left">
                            <p className="mb-1">Add: CGST : 9%</p>
                        </div>
                        <div className="col-md-2 invoice_logo_wrapper text-right">
                            <p className="mb-1">{amount * 9 / 100}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 invoice_logo_wrapper">
                            <p className="mb-1"><b>Current Account: 41270364532</b></p>
                        </div>
                        <div className="col-md-2 invoice_logo_wrapper text-left">
                            <p className="mb-1">Add: SGST : 9%</p>
                        </div>
                        <div className="col-md-2 invoice_logo_wrapper text-right">
                            <p className="mb-1">{amount * 9 / 100}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 invoice_logo_wrapper">
                            <p className="mb-1">State Bank of India, Sector - 14 Branch, Gurugram. 122001</p>
                        </div>
                        <div className="col-md-2 invoice_logo_wrapper text-left">
                            <p className="mb-1">Add: IGST :</p>
                        </div>
                        <div className="col-md-2 invoice_logo_wrapper text-right">
                            <p className="mb-1">--</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 invoice_logo_wrapper">
                            <p className="mb-1">IFSC CODE: SBIN0020829</p>
                        </div>
                        <div className="col-md-2 invoice_logo_wrapper text-left">
                            <p className="mb-1">Grand Total</p>
                        </div>
                        <div className="col-md-2 invoice_logo_wrapper text-right">
                            <p className="mb-1">₹ {parseFloat((amount * 18 / 100) + amount).toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="col md-12">
                    <div className="row">
                        <div className="col-md-6 invoice_logo_wrapper">
                            <p className="mb-2">Terms & conditions:</p>
                            <p className="mb-2 ml-1"><b className={'p-2'}>1</b>  24% interest will be charged on bills remaining unpaid after 7 days</p>
                            <p className="mb-2 ml-1"><b className={'p-2'}> 2</b> Goods remains the property of <b>KCS Electrical Traders</b> till complete payment is not made.</p>
                            <p className="mb-2 ml-1"><b className={'p-2'}>3</b> All disputes are subject for GURUGRAM JURISDICTION only.</p>
                        </div>
                        <div className="col-md-6 invoice_logo_wrapper text-left border">
                            <p className="mt-3" style={{textTransform: "capitalize", letterSpacing: "2px"}}>₹ {NumToWords((amount * 18 / 100) + amount)}</p>
                            <hr/>
                            <div className="row">
                                <div className="col-md-6 invoice_logo_wrapper text-center border-right">
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <p className="mb-1">Common Seal</p>
                                </div>
                                <div className="col-md-6 invoice_logo_wrapper text-center border-left">
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <p className="mb-1">Authorised signatory</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col md-12 text-center mt-5">
                    <hr/>
                    <p style={{letterSpacing:'3px'}}>360(old 79/4) 3rd Floor, Flat No 301,  Anamika Enclave, Behind Kalyani Hospital, Gurugram - 122001, Haryana<br/>
                        https://www.kcs-electrical.com</p>
                </div>

            </div>
        </div>
    );
}

export default TableComponent;