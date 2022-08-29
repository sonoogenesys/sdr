import moment from 'moment';
import React from 'react'
import BarCode from "react-barcode";
import { connect } from 'react-redux';

import { getCourierPartnerIcon, getCourierPartnerBarcode } from '../../Utils/CommonFunctions';

const OrderLabel = ({order}) => {
    let { first_name, last_name, shipping_address, rto_address } = order?.customer_details || {};
    let created_by = order?.created_by;
    let shippedBy = created_by?.first_name ? `${created_by?.first_name} ${created_by?.last_name || ""}` : (created_by?.email || "-");
    shippedBy = shippedBy?.trim();

    let shippingAddress = `${shipping_address?.line1 || ""}`.trim();
    shippingAddress = `${shippingAddress} ${shipping_address?.line2 || ""}`.trim();
    shippingAddress = `${shippingAddress} ${shipping_address?.city || ""}`.trim();
    shippingAddress = `${shippingAddress} ${shipping_address?.state || ""}`.trim();
    shippingAddress = `${shippingAddress} ${shipping_address?.postcode || ""}`.trim();

    let rtoAddress = `${rto_address?.line1 || ""}`.trim();
    rtoAddress = `${rtoAddress} ${rto_address?.line2 || ""}`.trim();
    rtoAddress = `${rtoAddress} ${rto_address?.city || ""}`.trim();
    rtoAddress = `${rtoAddress} ${rto_address?.state || ""}`.trim();
    rtoAddress = `${rtoAddress} ${rto_address?.postcode || ""}`.trim();

    let product_details = order?.product_details;
    let transaction_id = order?.transaction_id;
    let available_logistic = Array.isArray(order?.available_logistic) && order?.available_logistic.length > 0 && order?.available_logistic[0];

    let invoice = order.invoice;

    // let logisticName = available_logistic?.name?.toLowerCase();
    let logo = getCourierPartnerIcon(available_logistic?.name);

    // if (logisticName === "wow express") {
    //     logo = "/img/wowexpress.png";
    // } else if (logisticName === "delhivery air") {
    //     logo = "/images/delhivery_air.png";
    // } else if (logisticName === "delhivery surface") {
    //     logo = "/images/delhiverysurface.jpg";
    // } else if (logisticName === "xpressbees") {`
    //     logo = "/images/xpressbees_air.jpg";
    // } else if (logisticName === "xpressbees air") {
    //     logo = "/images/xpressbees_air.jpg";
    // } else if (logisticName === "xpressbees surface") {
    //     logo = "/images/xpressbees_air.jpg";
    // }

    // console.log("created_by", created_by);

    let barcodeWidth = getCourierPartnerBarcode(available_logistic?.name)

    let logistic_name = String(available_logistic?.name).trim();
    logistic_name = logistic_name.replace(new RegExp("[0-9]+ KG", "i"), "").trim();
    logistic_name = logistic_name.replace(new RegExp("[0-9]+KG", "i"), "").trim();

    // product dimensions
    let height = parseFloat(product_details?.height || 0).toFixed(2);
    let length = parseFloat(product_details?.length || 0).toFixed(2);
    let breadth = parseFloat(product_details?.breadth || 0).toFixed(2);
    let weight = parseFloat(product_details?.weight || 0).toFixed(2);

    return (
        <>
            <table width="100%" cellspacing="0" cellpadding="0" border="0" className="orderLableTbl">
                <tbody>
                    <tr>
                        <td valign="top">
                            <table cellspacing="0" cellpadding="0" border="0" width="100%" align="center">
                                <tbody>
                                    <tr>
                                        <td width="70%">
                                            <div className="mb-3 mt-2">
                                                <img src="/img/logo.svg" style={{width:"75px"}} alt=""/>
                                            </div>
                                            <p className="font-p-12 print-font-bold"><strong>Ship To</strong></p>
                                            <p className="text-uppercase font-p-12 print-font-bold" style={{ marginBottom: 5 }}>{first_name} {last_name},</p>
                                            <p className="font-p-12 print-font-bold line-clamp" style={{ marginBottom: 5 }}>
                                                {shippingAddress}
                                                </p>
                                        </td>
                                        <td width="30%" className="text-right">
                                            <div className="mb-2 mt-2">
                                                {
                                                    logo &&
                                                    <img src={logo} style={{width:"75px"}} alt=""/>
                                                }
                                            </div>
                                            <p className="font-p-10" style={{ marginBottom: 5 }}>
                                                <strong>Courier</strong>: {logistic_name}
                                            </p>
                                            <p className="font-p-10" style={{ marginBottom: 0 }}>
                                                <strong>Awb</strong>: {order?.ewaybill_number}
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                             </table>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td width="75%">
                                           <div className="row">
                                                <div className="col-lg-6">
                                                    <p className="font-p-12" style={{ marginBottom: 5 }}>
                                                    <strong>Contact No</strong>: <span>{order.customer_details.mobile_number}</span>
                                                    </p>
                                                </div>
                                                <div className="col-lg-6">
                                                    <p className="font-p-12"> <strong>Fm Hub</strong>:  <span style={{ textTransform: "uppercase" }}>{available_logistic?.destination_hub || "-"}</span> </p>
                                                </div>
                                           </div>
                                            <hr style={{ borderColor: "#000", marginTop: 0, marginBottom: 5 }} />
                                            <div className="row">
                                                <div className="col-lg-6">
                                                        <p className="font-p-10">
                                                        <strong>Dimensions</strong>: {length} x {breadth} x {height}
                                                        </p>
                                                        <p className="font-p-10">
                                                        <strong>Payment</strong> : <span style={{ textTransform: "uppercase" }}>{order?.payment_method}</span>
                                                            </p>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <p className="font-p-10">
                                                            <strong>Weight</strong> : {weight} kg
                                                        </p>
                                                        <p className="font-p-10">
                                                                <strong>Items</strong>: <span>{product_details?.product_name}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <hr style={{ borderColor: "#000", marginTop: 0, marginBottom: 5 }} />

                                                <p className="font-p-12" style={{ marginBottom: 5 }}>
                                                    <strong>Shipped by</strong>: {shippedBy}, (If undelivered, return to)
                                                </p>
                                                <p className="font-p-12 line-clamp" style={{ marginBottom: 5 }}>
                                                    {rtoAddress || "-"}
                                                </p>
                                                <p className="font-p-12" style={{ marginBottom: 5 }}>
                                                    <strong>Lmd Hub</strong>: <span style={{ textTransform: "uppercase" }}>{available_logistic?.source_hub || "-"}</span>
                                                </p>
                                                <hr style={{ borderColor: "#000", marginTop: 0, marginBottom: 5 }} />
                                                <p className="font-p-10" style={{ marginBottom: 5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                <strong className="text-capitalize">product description:</strong> {product_details?.product_name}
                                                </p>

                                                <div className="d-flex">
                                                    <div className="col-lg-5 pl-0 pr-0">
                                                         <p className="font-p-10 mb-2" style={{ wordBreak:"break-word" }}>
                                                        <strong className='pr-1'>SKU:</strong> {String(product_details?.master_sku || "-").replace(",", ", ").trim()}
                                                          </p>
                                                    </div>
                                                    <div className="col-lg-3 pr-0">
                                                         <p className="font-p-10" style={{ marginBottom: 5 }}>
                                                        <strong className="pl-1">|</strong>
                                                        <strong className="pl-1">QTY:</strong> {product_details?.quantity}
                                                          </p>
                                                    </div>
                                                    <div className="col-lg-4 pr-0">
                                                           <p className="font-p-10" style={{ marginBottom: 5 }}>
                                                        <strong className="pl-1">|</strong>
                                                        <strong className="pl-1">TOTAL:</strong> ₹ {parseFloat(product_details?.selling_price || 0).toFixed(2)}
                                                         </p>
                                                    </div>
                                                </div>

                                                <div className="d-flex">
                                                     <div className="col-lg-6 pl-0">
                                                    <p className="font-p-10" style={{ marginBottom: 5 }}>
                                                        <strong>Invoice  No: </strong> {invoice && invoice?.invoice_number || "-"}
                                                    </p>
                                                    </div>
                                                     <div className="col-lg-6">
                                                    <p className="font-p-10" style={{ marginBottom: 5 }}>
                                                        <strong className="pl-1">|</strong>
                                                        <strong className="pl-1">Invoice Date:</strong> {invoice && invoice?.date && moment(invoice?.date).format("DD-MM-YYYY") || "-"}
                                                    </p>
                                                    </div>
                                                </div>
                                                <p className="font-p-10" style={{ marginBottom: 5 }}>
                                                    <strong>GST No:</strong> {created_by?.bank_detail?.gst_number || "---"}
                                                </p>
                                            </td>
                                        <td width="25%">
                                            <div className="barCodeContainer">
                                                <div className="barCodeDiv position-relative">
                                                    <BarCode
                                                        value={order?.ewaybill_number}
                                                        format={"CODE128"}
                                                        displayValue = {true}
                                                        width={barcodeWidth}
                                                        height={100}
                                                        fontSize={12}
                                                        background= {"transparent"}
                                                    />
                                                </div>
                                            </div>
                                            <p className="font-p-10 mb-2" style={{ marginBottom: 0 }}><strong>Shipment</strong> #{order?.order_id}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td width="100%">
                                        <hr style={{ borderColor: "#000", marginTop: 0, marginBottom: 5 }} />
                                            <p className="font-p-10 text-center mb-2">
                                                All dispute are subject Uttar Pradesh jurisdiction. Goods once sold will only be taken back or exchanged as per the store's exchange/return policy
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td width="100%">
                                        <hr style={{ borderColor: "#000", marginTop: 0, marginBottom: 5 }} />
                                            <p className="text-uppercase font-p-10 text-center mb-2">
                                                this is an auto generated label and does not need any signature
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

        </>
   )
}

const mapStateToProps = (state, ownProps) => {
    let { id } = ownProps;

    let orders = state.order?.orders;
    let order = id && orders && orders[id];

    return {
        orderId: id,
        order: order,
    };
};

export default connect(mapStateToProps)(OrderLabel)