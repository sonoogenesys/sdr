import React, { useEffect, useState } from "react";
import BaseTable from "../../Utils/BaseTable";
import moment from "moment";

const OrderInvoice = ({ showHeader = false, details = {} }) => {
    const [state, setState] = useState({
        headingData: [
            "No",
            "Qty",
            "Shipment Name",
            "Description",
            "Price",
            "GST at 18%",
            "Total",
        ]
    });

    let orders = details?.orders;

    const preload = () => {
        let paymentMethod = details?.paymentMethod;

        if (paymentMethod === "cod") {
            headingData = [
                "No",
                "Qty",
                "Shipment Name",
                "Description",
                "Price",
                "COD Charges",
                "GST at 18%",
                "Total",
            ];

            setState({
                ...state,
                headingData: headingData,
            });
        }
    }

    useEffect(() => {
        preload();
    }, [details?.paymentMethod]);

    const renderRowItem = (item, index) => {
        let paymentMethod = details?.paymentMethod;

        return (
            <tr key={index}>
                <td style={{textAlign:'center'}}>{index + 1}</td>
                <td>{item?.quantity}</td>
                <td>{item?.name}</td>
                <td>{item?.description}</td>
                <td style={{ width: "10%" }}>₹ {parseFloat((item?.price) || 0).toFixed(2)}</td>
                {
                    paymentMethod === "cod" &&
                    <td style={{ width: "10%" }}>₹ {parseFloat(item?.codCharges || 0).toFixed(2)}</td>
                }
                <td style={{ width: "10%" }}>{parseFloat(item?.vat || 0).toFixed(2)}</td>
                <td style={{textAlign:'center', width: "10%"}}>₹ {parseFloat(item?.total || 0).toFixed(2)}</td>
            </tr>
        );
    };

    let { headingData } = state;

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card indivisual_invoice">
                    {showHeader && (
                        <div className="col-md-12">
                            <div className="d-flex justify-content-between align-items-center invoice_logo_wrapper pt-2 pb-2">
                                <div className="col-md-3">
                                    <img src="/images/logo.svg" alt="" />
                                </div>
                                <div>
                                    <span className="theme_icon_color font-size-18 font-weight-bold">
                                        Shipment #{details?.orderId}
                                    </span>
                                </div>
                            </div>
                            <div className="total_amt pt-3 pb-3 d-flex justify-content-end">
                                <h5 className="">
                                    <span>Total Amount</span> :{" "}
                                    {`₹ ${parseFloat(details?.totalAmount || 0).toFixed(2)}`}
                                </h5>
                            </div>
                        </div>
                    )}

                    <div className="col-md-12">
                        <div className="row mt-3">
                            <div className="col-md-6 invoice_logo_wrapper">
                                <h5>Billed To:</h5>
                                <p className="mb-1">{details?.billedTo?.name}</p>
                                <p className="mb-1">
                                    {details?.billedTo?.address}
                                </p>
                            </div>
                            <div className="col-md-6 invoice_logo_wrapper text-right">
                                <h5>Shipped To:</h5>
                                <p className="mb-1">{details?.shippedTo?.name}</p>
                                <p className="mb-1">
                                    {details?.shippedTo?.address}
                                </p>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6 invoice_logo_wrapper">
                                <h5>Payment Method:</h5>
                                <p className="mb-1" style={{textTransform: 'capitalize'}}>{details?.paymentMethod}</p>
                                <p className="mb-1">{details?.email}</p>
                            </div>

                            {
                                details?.order_date &&
                                <div className="col-md-6 invoice_logo_wrapper text-right">
                                    <h5>Shipment Date:</h5>
                                    <p className="mb-1" style={{ letterSpacing: 1 }}>{moment(details?.order_date).format("D MMM YYYY, h:mm:ss a")}</p>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card-body">
                            <BaseTable
                                headingData={headingData}
                                rowData={orders}
                                renderRowItem={renderRowItem}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderInvoice;
