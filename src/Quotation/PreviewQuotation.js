import React, {useState} from "react";
import moment from "moment";
import BaseTable from "../Utils/BaseTable";
import NumToWords from "../Utils/NumToWords";
import Line from "../Utils/Line";
import Signature from "./signature.jpg";
import ColumnTable from "./ColumnTable";
import {Table} from "antd";
const { Column, ColumnGroup } = Table;

const PreviewQuotation = React.forwardRef((props) => {
    let invoice = props.invoice;
    let {screenHeight} = props
    let conditions = invoice?.conditions && invoice.conditions.split("\n");
    let itemsData = invoice?.items ? Object.values(invoice?.items) : [];

    const data = itemsData.map((o, i)=>{
        o.index = i + 1;
        const supply = Number(o.sRate || 0);
        const erection = Number(o.eRate || 0);
        return {
            key: i,
            index: i + 1,
            name: o.name,
            hsn: o.hsn,
            uom: o.uom,
            qty: o.qty,
            sRate: supply,
            sAmount:supply * o.qty,
            eRate: erection,
            eAmount: erection * o.qty,
            tRate: supply + erection,
            tAmount: (supply + erection) * o.qty,
        };
    });
    const amount = data.reduce((a, b)=> a + b.tAmount, 0)

console.log(amount)
    // let headingData = [
    //     "S. No.",
    //     "Product Description",
    //     "HSN / SAC",
    //     "UOM",
    //     "Qty",
    //     "Supply-Rate",
    //     "Erection-Rate",
    //     // "GST %",
    //     "Total Rate",
    //     // "Item Disc.",
    //     // "Taxable Value"
    // ]

    // const renderRowItem = (item, index) => {
    //     let gst = item?.gst ? (item?.gst === true ? 0 : item?.gst) : 18
    //     let taxAmount = gst ? (item?.rate || 0) * Number(item?.qty) : 0
    //     return (
    //         <tr key={index}>
    //             <td style={{textAlign:'center'}}>{index + 1}</td>
    //             <td>{item?.name}</td>
    //             <td>{item?.hsn}</td>
    //             <td>{item?.uom}</td>
    //             <td>{item?.qty}</td>
    //             <td style={{width: 150, textAlign:'center'}}>₹ {parseFloat((item?.rate) || 0).toFixed(2)}</td>
    //             <td>₹ {parseFloat( 0).toFixed(2)}</td>
    //             {/*<td>{parseFloat(gst).toFixed(2)}</td>*/}
    //             <td style={{width: 150, textAlign:'center'}}>₹ {parseFloat((item?.rate || 0) * Number(item?.qty)).toFixed(2)}</td>
    //             {/*<td>{item?.desc ? item.desc : "-"}</td>*/}
    //             {/*<td style={{width: 150, textAlign:'center'}}>₹ {parseFloat(taxAmount).toFixed(2)}</td>*/}
    //         </tr>
    //     );
    // };
    // let nonGSTItems = itemsData ? itemsData.filter(o=> o.gst === true) : [];
    // let nonGSTAmount = nonGSTItems.reduce((accumulator, currentValue)=>accumulator + (currentValue.rate * Number(currentValue.qty)) , 0);
    // let amount = Object.values(invoice).length !== 0 && Object.values(invoice?.items).reduce((accumulator, currentValue)=>accumulator + (currentValue.rate * Number(currentValue.qty)), 0)
    // amount = (amount + Number(invoice?.packing || 0) + Number(invoice?.insurance || 0) + Number(invoice?.freight || 0))  - Number(invoice?.discount || 0)
    // let GSTAmount = amount > nonGSTAmount ? amount - nonGSTAmount : nonGSTAmount - amount;
    // let igst_tax = invoice?.igst_tax ? Number(invoice.igst_tax) : undefined;
    return (
        <>
        <div className="col-md-12">
            <div   className="card indivisual_invoice">
                <div className="col-md-12">
                    <div className="col-md-12">
                        <img style={{width: '100%', height: 120}} src={"/img/logo1.png"}/>
                        <div className="row">
                            <p style={{letterSpacing: '0.7px', paddingLeft: "10px"}}><b>Distribution Transformers, LT Panels, HT Panel, CT, PT, HT/LT Cables, Cable Jointing Kit, Earthing Material, PCC Pole, Cable Tray etc.</b></p>
                        </div>
                    </div>
                    <Line left={"10px"}/>
                    <div className="col-md-12">
                        <div className="row" style={{flexWrap: "nowrap"}}>
                            {/*<div className="col-md-3 text-left">*/}
                            <p className="col-md-3 text-left"><b>GST No:</b> 06ARFPS3941N1ZA</p>
                            {/*</div>*/}
                            <div className="col-md-3 text-center">
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
                    <Line left={"10px"}/>
                </div>
                <Line/>

                <div className="col-md-12">
                    <div className="row mt-3">
                    <div className="col-md-6 invoice_logo_wrapper text-left">
                        <p className="mb-1"><b>Quotation No: </b>{invoice?.invoice_number}</p>
                    </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md-6 invoice_logo_wrapper">
                            <p className="mb-1" style={{ letterSpacing: 1 }}><b>Date: </b> {moment(invoice?.invoiceDate).format("DD-MMM-YYYY")}</p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-8 invoice_logo_wrapper">
                        {/*    <p className={"mb-1"}><b>Billed To:</b></p>*/}
                            <p className="mb-1"><b>{invoice?.billing_address?.name}</b></p>
                            <p className="mb-1"><b>{invoice?.billing_address?.address}</b></p>
                            <p className="mb-1"><b>GST No: {invoice?.billing_address?.gst}</b></p>
                            {invoice?.site_address && <p className="mb-1"><b>Site address: {invoice?.site_address}</b></p>}
                            <p className="mt-3"><b>Kind Attn. {invoice?.name}</b></p>
                            <p className="mt-3"><b>Sub:- {invoice?.subject}</b></p>
                            <p className="mt-3"><b>Dear Sir,</b></p>
                            <p className="mt-3"><b>As per your requirement, we are submitting our quotation as given bellow:-</b></p>
                        </div>
                    </div>
                </div>


                <Line/>

                <div className="col-md-12">
                    <div className="card-body">
                        <div className="acclist-height-base">
                            <Table align={'center'} sticky={true} pagination={false} key={"index"}
                                   className={'table table-striped table-bordered dt-responsive nowrap action_icons text-justify'}
                                   dataSource={data}>
                                <Column title="S.no" dataIndex="index" key="index" />
                                <Column width={800} title="Product Description" dataIndex="name" key="name" />
                                <Column title="HSN" dataIndex="hsn" key="hsn" />
                                <Column title="UOM" dataIndex="uom" key="uom" />
                                <Column title="Qty" dataIndex="qty" key="qty" />
                                <ColumnGroup title="Supply" className={'text-center'}>
                                    <Column title="Rate" dataIndex="sRate" key="sRate" />
                                    <Column title="Amount" dataIndex="sAmount" key="sAmount" />
                                </ColumnGroup>
                                <ColumnGroup title="Erection" className={'text-center'}>
                                    <Column title="Rate" dataIndex="eRate" key="eRate" />
                                    <Column title="Amount" dataIndex="eAmount" key="eAmount" />
                                </ColumnGroup>
                                <ColumnGroup title="S.E.C Total" className={'text-center'}>
                                    <Column title="Rate" dataIndex="tRate" key="tRate" />
                                    <Column title="Amount" dataIndex="tAmount" key="tAmount" />
                                </ColumnGroup>
                            </Table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7 invoice_logo_wrapper pl-5">
                        <p className="mb-1"><b>Bank Details</b></p>
                    </div>
                    <div className="col-md-3 invoice_logo_wrapper text-left">
                        <p className="mb-1 fa-1x"><b> </b></p>
                    </div>
                    <div className="col-md-2 invoice_logo_wrapper text-right pr-5">
                        <p className="mb-1"></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7 invoice_logo_wrapper pl-5">
                        <p className="mb-1"><b>Current Account: 41270364532</b></p>
                    </div>
                    <div className="col-md-3 invoice_logo_wrapper text-left">
                        <p className="mb-1 fa-1x"><b>Total Taxable Amount:</b></p>
                    </div>
                    <div className="col-md-2 invoice_logo_wrapper text-right pr-5">
                        <p className="mb-1">₹ {parseFloat(amount).toFixed(2)}</p>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-7 invoice_logo_wrapper pl-5">
                        <p className="mb-1"><b>IFSC CODE: SBIN0020829</b></p>
                    </div>
                    <div className="col-md-3 invoice_logo_wrapper text-left">
                        <p className="mb-1 fa-1x"><b>GST @ 18%:</b></p>
                    </div>
                    <div className="col-md-2 invoice_logo_wrapper text-right pr-5">
                        <p className="mb-1">₹ {parseFloat(amount * 18 / 100).toFixed(2)}</p>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-7 invoice_logo_wrapper pl-5">
                        <p className="mb-1"><b>State Bank of India, Sector - 14 Branch, Gurugram. 122001</b></p>
                    </div>
                    <div className="col-md-3 invoice_logo_wrapper text-left">
                        <p className="mb-1 fa-1x"><b>Total Amount: </b></p>
                    </div>
                    <div className="col-md-2 invoice_logo_wrapper text-right pr-5">
                        <p className="mb-1">₹ {parseFloat(amount + (amount * 18 / 100)).toFixed(2)}</p>
                    </div>

                </div>
                {/*<div className={"row"}>*/}
                {/*    <div className="col-md-12 invoice_logo_wrapper text-right" style={{marginRight: 10}}>*/}
                {/*
                {/*    </div>*/}
                {/*    <div className="col-md-12 invoice_logo_wrapper text-right" style={{marginRight: 10}}>*/}
                {/*        <p className="mb-1 fa-1x"><b>GST @ 18%: </b> ₹ {parseFloat(amount * 18 / 100).toFixed(2)}</p>*/}
                {/*    </div>*/}
                {/*    <div className="col-md-12 invoice_logo_wrapper text-right" style={{marginRight: 10}}>*/}
                {/*        <p className="mb-1 fa-1x"><b>Total Amount </b> ₹ {parseFloat(amount + (amount * 18 / 100)).toFixed(2)}</p>*/}
                {/*    </div>*/}
                    {/*<b>*/}
                    {/*    Bank Details:- <br/>*/}
                    {/*    Current Account: 41270364532<br/>*/}
                    {/*    IFSC CODE: SBIN0020829<br/>*/}
                    {/*    State Bank of India, Sector - 14 Branch, Gurugram. 122001<br/>*/}
                    {/*</b>*/}
                {/*</div>*/}


                <Line/>
                <div className="col-md-12">
                    <div className="row mt-3">
                        <div className="col-md-12 invoice_logo_wrapper">
                            {conditions.map(o=><b>{o}<br/></b>)}
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="row mt-3">
                        <div className="col-md-12 invoice_logo_wrapper">
                            <b>For KCS ELECTRICAL TRADERS & ENGINEERING</b><br/>
                            <img style={{width: 200, height: 70}} src={Signature}/><br/>
                            <b>K.C.Sharma - 9810959039</b>
                        </div>
                    </div>
                </div>
        </div>


        </div>
            {screenHeight && <div style={{position:'absolute', bottom: 1, left:0, right: 0, textAlign:'center'}}>
                <Line />
                <p style={{letterSpacing:'0px'}}>360(old 79/4) 3rd Floor, Flat No 301,  Anamika Enclave, Behind Kalyani Hospital, Gurugram - 122001, Haryana<br/>
                    https://www.kcs-electrical.com</p>
            </div>}
        </>
    );
})

export default PreviewQuotation;