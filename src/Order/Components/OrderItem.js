import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Badge } from "react-bootstrap";
import { selectOrdersRequest, trackOrderRequest, cancelOrderRequest } from "../Duck/OrderActions";
import appUrl from "../../Constants/AppUrl";
import { showNotification } from "../../Utils/CommonFunctions";
import axios from "axios";
import fileDownload from 'js-file-download';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import Tippy from '@tippyjs/react';

const OrderItem = (props = {}) => {
    const [state, setState] = useState({
        downloading: false
    });
    const { downloading } = state;
    let { index = 0, orderId, order, history, printSelection = [], loggedInUser, showTicketStatus } = props;
    let isSelected = printSelection?.includes(orderId);

    // console.log("loggedInUser", loggedInUser);

    if (!order) {
        return <></>;
    }

    const onShowOrderSummary = () => {
        let path = order?.bulk_id && !transaction ? `/app/bulkShipmentList/${order?.bulk_id?._id}` : `/app/individualShipment/${orderId}`;
        history?.push(path);
    };

    const onRefreshOrder = (e) => {
        e.stopPropagation()
        let { _id, ewaybill_number } = order;
        if (_id && ewaybill_number) {
            let params = {
                order_id: _id,
                airwaybilno: ewaybill_number,
            };

            props.trackOrder && props.trackOrder(params);
        }
    }

    const onDownloadPendingOrders = (e) => {
        if (!downloading) {
            setState({ downloading: true });

            axios({
                method: "GET",
                url: `${appUrl.ORDERS_URL}/bulk-download/pending`,
                params: { bulk_id: order?.bulk_id?._id },
                contentType: 'application/doc; charset=utf-8',
                responseType: 'arraybuffer',
            })
            .then(res => {
                let fileName = `Bulk-Pending-${moment().format("DD-MM-YYYY")}.xlsx`;
                let mineType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                fileDownload(res.data, fileName, mineType);
                setState({ isLoading: false });
            })
            .catch(err => {
                let resData = String.fromCharCode.apply(null, new Uint8Array(err.response.data));
                showNotification("error", resData?.meta?.message || resData?.message || "Error in Download file");
                console.log("onDownloadOrder ", resData);
                setState({ isLoading: false });
            });
        }
    }

    const onCancelOrder = (e) => {
        e.stopPropagation()
        let { _id, ewaybill_number } = order;
        if (_id && ewaybill_number) {
            let params = {
                order_id: _id,
                airwaybilno: ewaybill_number,
            };

            props.handleCancelOrderModal && props.handleCancelOrderModal(true, params);
        }
    }

    const onCreateRtoOrder = (e) => {
        e.stopPropagation()
        let { _id, ewaybill_number } = order;
        if (_id && ewaybill_number) {
            let params = { order_id: _id };

            props.handleCreateRtoOrderModal && props.handleCreateRtoOrderModal(true, params);
        }
    }

    const onShowOrderInvoice = (e) => {
        e.stopPropagation();
        history?.push(`/app/individualinvoice/${orderId}`);
    }

    const onShowTicket = (e) => {
        e.stopPropagation();
        history?.push(`/app/orderActivity/${orderId}`);
    }

    const onPrint = (e) => {
        e.stopPropagation();
        history?.push(`/app/ShipmentPrintModal/${orderId}`);
        // props.togglePreview &&
        // props.togglePreview("603e1853b938c5789c7fcf99", [
        //     {
        //         _id: "603e1853b938c5789c7fcf99",
        //         filename: "Dispatch Label.png",
        //     },
        // ]);
    }

    const onSelect = (e) => {
        e.stopPropagation();
        props.selectOrders && props.selectOrders([orderId], !isSelected);
    }

    let transaction = order?.transaction_id;
    let orderStatus = Array.isArray(order?.orderStatus) && order.orderStatus.length > 0 && order.orderStatus[0];
    let scanDetail = Array.isArray(orderStatus?.scan_detail) && orderStatus.scan_detail?.length > 0 && orderStatus.scan_detail[orderStatus.scan_detail.length - 1];
    let deliveryDetail = Array.isArray(orderStatus?.scan_detail) && orderStatus.scan_detail?.length > 0 &&
        orderStatus?.scan_detail.find(s => s?.status?.toLowerCase().includes("delivered") && !s?.status?.toLowerCase().includes("undelivered"))
    let comments = order?.comments || [];
    let mLogistic;

    let selected_courier_tat = order?.available_logistic?.length > 0 && order.available_logistic[0]?.tat_score;
    let delivered_date = order?.delivery_date ?  order?.delivery_date : moment();
    let date_created = transaction?.created_at && moment(moment.utc(transaction?.created_at).format('DD-MM-YYYY'), 'DD-MM-YYYY');
    let date_delivered = moment(moment.utc(delivered_date).format('DD-MM-YYYY'), 'DD-MM-YYYY');
    let last_deliver_tat = date_created && moment(date_created).add(Number(selected_courier_tat), "days");
    let date_gap = moment.duration(date_delivered.diff(date_created)).asDays();

    let orderRowBg;
    if (
        String(scanDetail?.status).trim().toUpperCase() === "UNDELIVERED" ||
        String(scanDetail?.status_description).trim().toUpperCase() === "UNDELIVERED" ||
        String(order?.latest_order_status).trim().toUpperCase() === "UNDELIVERED" ||
        (transaction && Number(date_gap) > Number(selected_courier_tat))
    ) {
        orderRowBg = "#f8d7da";
    } else if (comments?.length > 0) {
        orderRowBg = "#fff3cd";
    }

    if ((transaction || order?.ewaybill_number) && Array.isArray(order?.available_logistic) && order?.available_logistic?.length > 0) {
        mLogistic = order?.available_logistic[0];
    }

    return (
        <tr
            key={index}
            className={!order?.bulk_id || (order?.bulk_id && transaction) ? "pointer" : ""}
            style={{ background: orderRowBg }}
            onClick={!order?.bulk_id || (order?.bulk_id && transaction) ? onShowOrderSummary : undefined}
        >
            {
                props.showSelect &&
                <td className="text-center">
                    { !transaction ?
                        <Tippy content="Unable to select as payment is pending">
                        <input
                            id={orderId}
                            type="checkbox"
                            checked={isSelected}
                            onClick={onSelect}
                            disabled={!transaction}
                        />
                        </Tippy>
                        :
                        <input
                            id={orderId}
                            type="checkbox"
                            checked={isSelected}
                            onClick={onSelect}
                            disabled={!transaction}
                        />
                    }

                </td>
            }
            <td style={{ textAlign: "center" }}>
                {index + 1}
            </td>
            <td onClick={(e) => e.stopPropagation()}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyItems: "start",
                    justifyContent: "space-between"
                }}>

                    <div>
                        {order?.ewaybill_number}
                        <Badge
                            className="ml-1"
                            style={{ color: "#fff", fontSize: 12 }}
                            variant={order?.bulk_id ? "warning" : "primary"}
                        >
                            {order?.bulk_id ? "Bulk" : "Individual"}
                        </Badge>

                        {
                            order?.rto_init &&
                            <Badge
                                className="ml-1"
                                style={{ color: "#fff", fontSize: 12 }}
                                variant={"info"}
                            >RTO</Badge>
                        }
                    </div>

                    <div className="ml-2">
                        {
                            order?.ewaybill_number &&
                            <CopyToClipboard
                                text={order?.ewaybill_number}
                                onCopy={() => showNotification("info", `Successfully Copy AWB ${order?.ewaybill_number}`)}
                            >

                                <span className="mr-2">
                                    <Tippy content="Copy AWB">
                                        <i className="far fa-copy" style={{ color: "#495057" }}></i>
                                    </Tippy>
                                </span>
                            </CopyToClipboard>
                        }
                    </div>
                </div>
            </td>
            <td style={{ textAlign: "center" }}>
                { order?.created_by?.first_name }
            </td>
            <td style={{ letterSpacing: 1 }}>
                {order?.order_date && moment(order.order_date).format("D MMM YYYY, h:mm:ss a")}
            </td>

            <td
                style={{
                    textTransform:
                        order?.payment_method === "cod"
                            ? "uppercase"
                            : "capitalize",
                }}
            >
                {order?.payment_method}
                <span className="ml-1">
                    {order?.action_done ? (
                          <Tippy content="Remitted">
                         <i className="fas fa-check-double" />
                          </Tippy>
                    ) : (
                        order?.sent_to_am &&
                        <Tippy content="Ready to remit">
                        <i className="fas fa-check" />
                        </Tippy>
                    )}
                </span>
            </td>

            <td style={{ textTransform: "lowercase" }}>
                {mLogistic?.name || "-"}
            </td>
            <td>
                {mLogistic?.price?.day ? `${mLogistic?.price?.day} days` : "-"}
            </td>
            {
                showTicketStatus &&
                <td style={{ textTransform: "uppercase" }}>
                    {comments?.length > 0 ? comments[comments?.length - 1]?.remark : "-"}
                </td>
            }
            <td
                className={order?.ewaybill_number || order?.isLoading ? "greenColor" : "redColor"}
                style={{ textTransform: "lowercase" }}
            >
                {
                    order?.isLoading
                        ? order?.isCreateRto ? "rto initialing..." : "Checking..."
                        : order?.ewaybill_number
                            ? (order?.latest_order_status || scanDetail?.status)
                            : "payment pending"
                }
            </td>
            <td style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                {!order?.bulk_id && !transaction && (
                    <span className="mr-2">
                        <Tippy content="Make payment">
                         <i className="bx bxs-pencil"></i>
                         </Tippy>
                    </span>
                )}

                {order?.bulk_id && !transaction && (
                    typeof order?.bulk_id?.total_payout !== "number"
                    ? (
                        <span
                            onClick={onShowOrderSummary}
                            className="mr-2"
                        >
                            <Tippy content="Make payment">
                            <i className="bx bxs-pencil"></i>
                           </Tippy>
                            </span>
                    ) : (
                        downloading
                        ? (
                            <span className="mr-2">
                                <i className="bx bx-loader bx-spin"></i>
                            </span>
                        ) : (
                            <span
                                onClick={onDownloadPendingOrders}
                                className="mr-2"
                            >
                               <Tippy content="Download Pending Order">
                                <i className="fa fa-download ml-2" aria-hidden="true"></i>
                                </Tippy>
                            </span>
                        )
                    )
                )}

                {transaction && (
                    <>
                        {
                            order?.isLoading ?
                            <span
                                className="mr-2"
                                style={{ position: "relative", top: 2 }}
                            >
                                 <Tippy content="Refresh status">
                                 <i className="bx bx-loader bx-spin"></i>
                                 </Tippy>
                            </span>
                            : (
                                <>
                                    <span
                                        onClick={onRefreshOrder}
                                        className="mr-2"
                                    >
                                         <Tippy content="Refresh status">
                                         <i className="dripicons dripicons-clockwise"></i>
                                         </Tippy>
                                    </span>
                                </>
                            )
                        }
                    </>
                )}

                {transaction && (
                    <span
                        onClick={onShowOrderInvoice}
                        className="mr-2"
                    >
                        <Tippy content="Invoice">
                            <i className="mdi mdi-eye"></i>
                        </Tippy>
                    </span>
                )}

                {transaction && (
                    <>
                        {
                            !order?.isLoading && props.showCancelOrder && loggedInUser &&
                            !order?.is_cancelled &&
                            (
                                String(order?.latest_order_status || scanDetail?.status).trim().toLowerCase().includes("pending") ||
                                String(order?.latest_order_status || scanDetail?.status).trim().toLowerCase() === "out for pickup" ||
                                String(order?.latest_order_status || scanDetail?.status).trim().toLowerCase() === "pending pickup" ||
                                String(order?.latest_order_status || scanDetail?.status).trim().toLowerCase() === "pending for pickup"
                            ) &&
                            (
                                loggedInUser?._id === (order?.created_by?._id || order?.created_by) ||
                                // String(loggedInUser?.role?._id?.name).trim().toLowerCase() === "administrator"
                                loggedInUser?.role?._id?.permissions?.showAllOrders
                            ) &&
                            <span
                                onClick={onCancelOrder}
                                className="mr-2"
                                style={{ position: "relative", top: 2 }}
                            >
                              <Tippy content="Cancel Order">
                                <i className="dripicons dripicons-cross"></i>
                               </Tippy>
                            </span>
                        }
                    </>
                )}

                {transaction && (
                    <>
                        {
                            !order?.isLoading && props.handleCreateRtoOrderModal && loggedInUser && !order?.rto_init &&
                            // String(order?.latest_order_status).trim().toLowerCase() === "undelivered" &&
                            // String(order?.latest_order_status || scanDetail?.status).trim().toLowerCase() === "pending pickup" &&
                            !(
                                String(order?.latest_order_status || scanDetail?.status).trim().toLowerCase() === "pending pickup" ||
                                String(order?.latest_order_status || scanDetail?.status).trim().toLowerCase() === "pending for pickup" ||
                                String(order?.latest_order_status || scanDetail?.status).trim().toLowerCase().match(new RegExp("^delivered", "i")) ||
                                String(order?.latest_order_status || scanDetail?.status).trim().toLowerCase().match(new RegExp("^rto delivered", "i")) ||
                                String(order?.latest_order_status || scanDetail?.status).trim().toLowerCase().match(new RegExp("cancel", "i"))
                            ) &&
                            (
                                loggedInUser?._id === (order?.created_by?._id || order?.created_by)
                                // ||
                                // String(loggedInUser?.role?._id?.name).trim().toLowerCase() === "administrator"
                            ) &&
                            <span
                                onClick={onCreateRtoOrder}
                                className="mr-2"
                                style={{ position: "relative", top: 2 }}
                            >
                              <Tippy content="Create RTO Order">
                                <i className="fas fa-retweet"></i>
                             </Tippy>
                            </span>
                        }
                    </>
                )}

                {transaction && (
                    <span
                        className="mr-2"
                        onClick={onShowTicket}
                    >
                         <Tippy content="Shipment Activity">
                          <i className="far fa-comment-dots"></i>
                        </Tippy>
                    </span>
                )}

                {/* {
                    order?.ewaybill_number &&
                    <CopyToClipboard
                        text={order?.ewaybill_number}
                        onCopy={() => showNotification("info", `Successfully Copy AWB ${order?.ewaybill_number}`)}
                    >
                        <span className="mr-2">
                            <Tippy content="Copy AWB">
                                <i className="far fa-copy"></i>
                            </Tippy>
                        </span>
                    </CopyToClipboard>
                } */}
            </td>
        </tr>
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
        trackOrder: (prams) => dispatch(trackOrderRequest(prams)),
        cancelOrder: (prams) => dispatch(cancelOrderRequest(prams)),
        selectOrders: (ids, isSelected) => dispatch(selectOrdersRequest(ids, isSelected)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
