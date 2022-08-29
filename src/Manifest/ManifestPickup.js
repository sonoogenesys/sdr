import "react-datepicker/dist/react-datepicker.css";
import React, { Component } from "react";
import moment from "moment";
import BaseTable from "../Utils/BaseTable";
import ManifestOrderItem from "./Components/ManifestOrderItem";
import ReactToPrint from "react-to-print";
import { connect } from "react-redux";

class ManifestPickup extends Component {

    constructor(props) {
        super(props);
        this.pageRef = React.createRef();
    }

    componentDidMount() {
        let { printSelection, history } = this.props;
        console.log("this.props", history);
        if (!printSelection?.length) {
            history?.replace("/app/Manifest");
        }
    }

    onGoBack = () => {
        this.props.history.goBack();
    }

    render() {
        let { printSelection, orders, loggedInUser } = this.props;
        let sellerName = loggedInUser?.first_name ? `${loggedInUser?.first_name} ${loggedInUser?.last_name || ""}`.trim() : loggedInUser?.email;

        let mOrders = printSelection?.map(id => id && orders && orders[id]);

        let logistics = [...(new Set(mOrders?.map(order => {
            if (order?.available_logistic?.length > 0) {
                let logistic_name = String(order.available_logistic[0]?.name).trim();
                logistic_name = logistic_name.replace(new RegExp("[0-9]+ KG", "i"), "").trim();
                logistic_name = logistic_name.replace(new RegExp("[0-9]+KG", "i"), "").trim();
                return logistic_name;
            }
        })))];
        let sellerAddress = [...(new Set(mOrders?.map(order => {
            let customer_details = order?.customer_details;
            let pickup_address = customer_details?.pickup_address;
            let sAddress = `${pickup_address?.line1}`.trim();
            sAddress = `${sAddress} ${pickup_address?.line2}`.trim();
            sAddress = `${sAddress} ${pickup_address?.city}`.trim();
            sAddress = `${sAddress} ${pickup_address?.state}`.trim();
            sAddress = `${sAddress} ${pickup_address?.postcode}`.trim();

            return sAddress;
        })))];

        return (
            <>
                 <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between pb-1">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Manifest Pickup
                                    </h2>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end">
                                <ReactToPrint
                                    pageStyle={pageStyle}
                                    trigger={() => (
                                        <button
                                            className="btn btn-primary my-2 btn-icon-text"
                                            type="button"
                                        >
                                            <i className="dripicons dripicons-print mr-2" />
                                            Print Manifest
                                        </button>
                                    )}
                                    documentTitle={`Manifest - ${moment().format('DD-MMM-YY')}`}
                                    content={() => this.pageRef.current}
                                />

                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text ml-3"
                                    onClick={this.onGoBack}
                                >
                                    <i className="fa fa-arrow-circle-left mr-1"></i>
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="card" ref={this.pageRef}>
                            {/* <h4 className="card-title">Manifest Pickup</h4> */}
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6" style={{ width: "50%" }}>
                                        <p className="font-size-16">
                                            <strong>Seller Name:</strong> {sellerName}
                                        </p>
                                        <p className="font-size-16">
                                            <strong>Seller Contact No:</strong> {loggedInUser?.mobile_number || "-"}
                                        </p>
                                        <p className="font-size-16">
                                            <strong>Seller Address: </strong> {
                                                sellerAddress?.length > 0
                                                ? sellerAddress?.map((address, i) => address && `${address}${(sellerAddress?.length - 1) !== i ?  ", " : ""}`)
                                                : "-"
                                            }
                                        </p>
                                    </div>
                                    <div className="col-lg-6" style={{ width: "50%", textAlign: "right" }}>
                                        <p className="font-size-16">
                                            <strong>Manifest No.: </strong> {Date.now()}
                                        </p>
                                        <p className="font-size-16">
                                            <strong>Logistics Channel: </strong> {
                                                logistics?.length > 0
                                                ? logistics?.map((name, i) => name && `${name}${(logistics?.length - 1) !== i ?  ", " : ""}`)
                                                : "-"
                                            }
                                        </p>
                                        <p className="font-size-16">
                                            <strong>Order Quantity: </strong> {printSelection?.length || 0} items
                                        </p>
                                        <p className="font-size-16">
                                            <strong>Pickup Date: </strong> {moment().format("DD-MM-YY")}
                                        </p>
                                    </div>

                                    <div className="col-lg-12 mt-3 mb-4">
                                        <BaseTable
                                            className="table table-striped table-bordered dt-responsive nowrap action_icons"
                                            headingData={[
                                                "No.",
                                                "Tracking Number",
                                                "Customer Name",
                                                { text: "Shipment Value", style: { textAlign: "center" } },
                                                { text: "Mode", style: { textAlign: "center" } },
                                                "Weight",
                                            ]}
                                            rowData={printSelection}
                                            renderRowItem={(item, index) => <ManifestOrderItem id={item} index={index} />}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-8" style={{ width: "70%" }}>
                                        <p className="font-size-16">
                                                <strong>Courier Signature:</strong>

                                            </p>
                                    </div>
                                    <div className="col-lg-4" style={{ width: "30%" }}>
                                        <p className="font-size-16">
                                                <strong>Dispatch Person's Name:</strong>

                                            </p>
                                            <p className="font-size-16">
                                                <strong>Dispatch Stamp:</strong>

                                            </p>
                                            <p className="font-size-16">
                                                <strong>Dispatch Date:</strong>
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

    }

}

const pageStyle = `
    @media all {
        .page-break {
            display: none;
        }
    }

    @media print {
        html, body {
            height: initial !important;
            overflow: initial !important;
            -webkit-print-color-adjust: exact;
        }
    }

    @media print {
        .page-break {
            height: 25rem;
            display: block;
            page-break-before: auto;
        }
    }

    @page {
        size: auto;
        margin: 20mm;
    }
`;

const mapStateToProps = (state) => {
    let loggedInUser = state.loggedInUser?.data?.data;
    let orders = state.order?.orders;
    let printSelection = state.order?.printSelection || [];

    return {
        loggedInUser: loggedInUser,
        orders: orders,
        printSelection: printSelection,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManifestPickup);