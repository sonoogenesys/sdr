import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import Tippy from '@tippyjs/react';
import { Badge } from "react-bootstrap";

import { raiseDisputeRequest, settleDisputeRequest } from "../Duck/OrderActions";
import RaiseDispute from "./RaiseDispute";
import appUrl from "../../Constants/AppUrl";
import fileDownload from "js-file-download";
import axios from "axios";
import TextInput from "../../Utils/TextInput";
import DisputeSettled from "./DisputeSettled";
import WeightDisputeDetails from "./WeightDisputeDetails";

const WeightDisputeItem = ({
    index = 0,
    orderId,
    order,
    history,
    printSelection = [],
    loggedInUser,
    showTicketStatus,
    ...props
}) => {
    const [state, setState] = useState({
        showDisputeRaisedModel: false,
        showDisputeSettledModel: false,
        accept: false,
        remark: "",
    })

    if (!order) {
        return <></>;
    }

    const {
        showDisputeRaisedModel,
        showDisputeSettledModel,
        showWeightDisputeDetails,
        accept,
    } = state;

    const handleDisputeRaisedModel = () => {
        setState({
            showDisputeRaisedModel: true,
        });
    }

    const handleDisputeSettledModel = (accept = false) => {
        accept = typeof accept === "boolean" && accept;
        setState({
            showDisputeSettledModel: true,
            accept,
        });
    }

    const handleWeightDisputeDetailsModel = () => {
        setState({
            showWeightDisputeDetails: true,
        });
    }

    const handleClose = () => {
        setState(preState => ({
            ...preState,
            showDisputeRaisedModel: false,
            showDisputeSettledModel: false,
            showWeightDisputeDetails: false,
            remark: "",
        }));
    }

    let {
        product_details = {},
        weight_dispute = {},
    } = order;

    let {
        length = 0,
        breadth = 0,
        height = 0,
    } = product_details;

    let weight = Number(product_details?.weight || 0);
    let vol_weight = (Number(length) * Number(breadth) * Number(height)) / 5000;
    if (weight < vol_weight) {
        weight = vol_weight;
    }

    let changed_weight = Number(weight_dispute?.changed_weight) || 0;

    let status = "mismatch";
    if (order?.isLoading) {
        status = "loading...";
    } else if (weight_dispute?.raised) {
        if (weight_dispute?.settled) {
            status = weight_dispute?.accepted ? "accepted" : "rejected";
        } else {
            status = "verification pending";
        }
    }

    const onDownloadAttachment = () => {
        let { attachment_id } = weight_dispute;

        axios({
            method: 'GET',
            url: `${appUrl.ATTACHMENTS_DOWNLOAD}/${attachment_id?._id}`,
            responseType: 'arraybuffer',
        })
        .then(res => {
            const filename = attachment_id?.filename;
            const extension = filename?.split?.('.')?.[filename?.split?.('.')?.length - 1];

            fileDownload(res.data, `References Document.${extension}`);
        })
        .catch(err => {
            console.log("onDownloadOrder ", err);
        });
    }

    let permissions = loggedInUser?.role?._id?.permissions || {};
    return (
        <>
            <tr
                key={index}
                className={weight_dispute?.settled ? "pointer" : ""}
                onClick={weight_dispute?.settled && handleWeightDisputeDetailsModel}
            >
                <td style={{ textAlign: "center" }}>
                    {index + 1}
                </td>
                <td style={{ letterSpacing: 1 }}>
                    {order?.order_date && moment(order.order_date).format("D MMM YYYY, h:mm:ss a")}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                    {order?.ewaybill_number}

                    {
                        weight_dispute?.remark &&
                        <Badge
                            className="ml-1"
                            style={{ color: "#fff", fontSize: 12 }}
                            variant={"primary"}
                        >R</Badge>
                    }
                </td>
                <td>{order?.created_by?.first_name}</td>
                <td>{parseFloat(weight).toFixed(2)}</td>
                <td>{parseFloat(changed_weight).toFixed(2)}</td>
                <td>{weight_dispute?.transaction_id ? moment(weight_dispute?.transaction_id?.created_at).format("D MMM YYYY, h:mm:ss a") : "-"}</td>
                <td>{weight_dispute?.transaction_id ? parseFloat(weight_dispute?.transaction_id?.total).toFixed(2) : "-"}</td>
                <td style={{ textTransform: "lowercase" }}>{order?.courier_name || "-"}</td>
                <td style={{ textAlign: "center", minWidth: 150 }}>
                    {
                        weight_dispute?.attachment_id
                        ? (
                            <span className="btn-link" onClick={onDownloadAttachment}>
                                <Tippy content="Download Document">
                                    <button className="btn btn-link">
                                        <i className="fa fa-file-download fa-2x mr-2 btn-link" aria-hidden="true" />
                                    </button>
                                </Tippy>
                            </span>
                        )
                        : "-"
                    }
                </td>
                <td
                    className={
                        order?.isLoading || weight_dispute?.accepted
                            ? "greenColor"
                            : weight_dispute?.raised && !weight_dispute?.settled ? "warning" : "redColor"
                    }
                    style={{ textTransform: "lowercase" }}
                >{status}</td>

                <td style={{ textAlign: "center", minWidth: 150 }}>
                    {
                        weight_dispute?.transaction_id &&
                        !weight_dispute?.settled &&
                        (
                            moment(weight_dispute?.created_at).add(7, "days").startOf("days").isSameOrAfter(moment(), "days") &&
                            (!weight_dispute?.raised && loggedInUser?._id === (order?.created_by?._id || order?.created_by) || permissions?.showAllOrders) ||
                            (weight_dispute?.raised && permissions?.showAllOrders)
                        )
                        ? (
                            <>
                                {
                                    order?.isLoading
                                    ? (
                                        <>
                                            <i className="bx bx-loader bx-spin"></i>
                                        </>
                                    ) : weight_dispute?.raised
                                        ? (
                                            <>
                                                <span className="mr-2" onClick={() => handleDisputeSettledModel(true)}>
                                                    <Tippy content="Accept">
                                                        <i
                                                            className="mdi mdi-thumb-up font-size-24"
                                                            aria-hidden="true"
                                                        />
                                                    </Tippy>
                                                </span>

                                                <span onClick={handleDisputeSettledModel}>
                                                    <Tippy content="Reject">
                                                        <i
                                                            className="mdi mdi-thumb-down font-size-24"
                                                            aria-hidden="true"
                                                        />
                                                    </Tippy>
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="btn btn-primary view_btn"
                                                    onClick={handleDisputeRaisedModel}
                                                >Raise Dispute</button>
                                            </>
                                        )
                                }
                            </>
                        ) : "-"
                    }
                </td>
            </tr>

            {
                weight_dispute?.raised &&
                !weight_dispute?.settled &&
                <DisputeSettled
                    show={showDisputeSettledModel}
                    accept={accept}
                    handleClose={handleClose}
                    settleDispute={({remark}) => props?.settleDispute?.({ _id: orderId, accepted: accept, remark})}
                    ewaybill_number={order?.ewaybill_number}
                />
            }

            {
                !weight_dispute?.raised &&
                <RaiseDispute
                    show={showDisputeRaisedModel}
                    onHide={handleClose}
                    orderId={orderId}
                    ewaybill_number={order?.ewaybill_number}
                    />
                }

            {
                weight_dispute?.settled &&
                <WeightDisputeDetails
                    show={showWeightDisputeDetails}
                    onHide={handleClose}
                    order={order}
                />
            }

        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    let { id } = ownProps;

    let loggedInUser = state?.loggedInUser?.data?.data;

    let printSelection = state.order?.printSelection;
    let orders = state.order?.orders;
    let order = id && orders && orders[id];

    return {
        orderId: id,
        order: order,
        printSelection: printSelection,
        loggedInUser: loggedInUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // raiseDispute: (id) => dispatch(raiseDisputeRequest(id)),
        settleDispute: (params) => dispatch(settleDisputeRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeightDisputeItem);
