import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Badge } from "react-bootstrap";
import axios from "axios";
import appUrl from "../../Constants/AppUrl";
import fileDownload from "js-file-download";
import { showNotification } from "../../Utils/CommonFunctions";

const UsageOrderItem = (props = {}) => {
    let { index = 0, orderId, order } = props;

    const [state, setState] = useState({
        isLoading: false,
    });

    let { isLoading } = state;

    if (!order) {
        return <></>;
    }

    const onDownloadInvoice = (e) => {
        let params = {
            user_id: order?.created_by?._id,
        }

        if (order?.bulk_id) {
            params.bulk_id = order?.bulk_id;
        } else {
            params.order_id = orderId;
        }

        if (!isLoading) {
            setState({ isLoading: true });
            axios({
                method: "GET",
                url: appUrl.ORDER_INVOICE_DOWNLOAD,
                params: params,
                contentType: 'application/doc; charset=utf-8',
                responseType: 'arraybuffer',
            })
            .then(res => {
                console.log("res.data", res);
                fileDownload(res.data, `invoice-${order?.invoice?.invoice_number}.pdf`);
                setState({ isLoading: false });
            })
            .catch(err => {
                showNotification("error", "Error in Download file");
                console.log("onDownloadOrder ", err);
                setState({ isLoading: false });
            });
        }
    }

    let transaction = order?.transaction_id;
    let orderStatus = Array.isArray(order?.orderStatus) && order.orderStatus.length > 0 && order.orderStatus[0];
    let scanDetail = Array.isArray(orderStatus?.scan_detail) && orderStatus.scan_detail?.length > 0 && orderStatus.scan_detail[orderStatus.scan_detail.length - 1];
    let deliveryDetail = Array.isArray(orderStatus?.scan_detail) && orderStatus.scan_detail?.length > 0 &&
        orderStatus?.scan_detail.find(s => s?.status?.toLowerCase().includes("delivered") && !s?.status?.toLowerCase().includes("undelivered"))
    let comments = order?.comments || [];
    let mLogistic;

    let selected_courier_tat = order.available_logistic[0].tat_score;
    let delivered_date = deliveryDetail?.updated_date ?  deliveryDetail?.updated_date : moment();
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
            style={{ background: orderRowBg }}
        >
            <td style={{ textAlign: "center" }}>
                {index + 1}
            </td>
            <td>
                {order?.ewaybill_number}
                <Badge
                    className="ml-1"
                    style={{ color: "#fff", fontSize: 12 }}
                    variant={order?.bulk_id ? "warning" : "primary"}
                >
                    {order?.bulk_id ? "Bulk" : "Individual"}
                </Badge>
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
                        <i className="fas fa-check-double" />
                    ) : (
                        order?.sent_to_am && <i className="fas fa-check" />
                    )}
                </span>
            </td>

            <td style={{ textTransform: "lowercase" }}>
                {mLogistic?.name || "-"}
            </td>

            <td>
                {mLogistic?.price?.day ? `${mLogistic?.price?.day} days` : "-"}
            </td>

            <td style={{ textAlign: "center" }}>
                <samp
                    className={`${!isLoading ? "pointer" : undefined}`}
                    data-title={!isLoading ? "Download Invoice" : undefined}
                    onClick={!isLoading && onDownloadInvoice}
                >
                    {
                        isLoading
                        ? <i className="bx bx-loader bx-spin"></i>
                        : <i className="fa fa-download" aria-hidden="true" />
                    }
                </samp>

            </td>
        </tr>
    );
};

const mapStateToProps = (state, ownProps) => {
    let { id } = ownProps;

    let orders = state.order?.orders;
    let order = id && orders && orders[id];

    return {
        orderId: id,
        order: order,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UsageOrderItem);
