import React from "react";
import moment from "moment";
import { connect } from "react-redux";

const InvoiceItem = (props = {}) => {
    let { index = 0, orderId, order = {}  } = props;


    if (!order) {
        return <></>;
    }

    console.log("order", order);

    let {
        product_details = {},
        created_by = {},
        invoice = {},
        transaction_id = {},
        available_logistic = [],
        rto_init,
        orderStatus = [],
        delivery_date,
    } = order;
    let selected_logistic = Array.isArray(available_logistic) && available_logistic.length > 0 ? available_logistic[0] : {};
    let price = selected_logistic?.price;

    let amount = 0;
    let tax = 0;
    if (rto_init) {
        amount = price?.total_value * 2;
        tax = (price?.total_value * 0.18) * 2;
    } else {
        amount = price?.total_value + (price?.cod_charges || 0);
        tax = price?.tax;
    }

    let scan_detail = [];
    if (Array.isArray(orderStatus[0]?.scan_detail) && orderStatus[0]?.scan_detail.length > 0) {
        scan_detail = [...orderStatus[0]?.scan_detail];

        if (
            scan_detail.length > 1 &&
            scan_detail[0]?.updated_date &&
            scan_detail[scan_detail.length - 1]?.updated_date &&
            moment(scan_detail[0]?.updated_date).isBefore(scan_detail[scan_detail.length - 1]?.updated_date)
        ) {
            scan_detail.reverse();
        }
    }

    return (
        <tr
            key={index}
            style={{ whiteSpace: "nowrap" }}
        >
            <td style={{ textAlign: "center" }}>
                {index + 1}
            </td>
            <td>
                {created_by?.first_name} {created_by?.last_name}
            </td>
            <td>
                <p style={{ width: 500, overflow: "hidden", textOverflow: "ellipsis" }} data-title={created_by?.bank_detail?.gst_address}>
                    {created_by?.bank_detail?.gst_address}
                </p>
            </td>
            <td>
                {created_by?.bank_detail?.gst_number}
            </td>
            <td>

            </td>
            <td>

            </td>
            <td>
                {created_by?.mobile_number}
            </td>
            <td>
                {created_by?.email}
            </td>
            <td>
                {invoice?.invoice_number}
            </td>
            <td>
                {delivery_date && moment(delivery_date).format("DD/MM/YYYY") || "-"}
            </td>
            <td>
                {order?.ewaybill_number}
            </td>
            <td>
                {product_details?.product_name}
            </td>
            <td>

            </td>
            <td>
                {parseFloat(amount || 0).toFixed(2)}
            </td>
            <td>
                {parseFloat(tax || 0).toFixed(2)}
            </td>
            <td>
                {parseFloat((amount || 0) + (tax || 0)).toFixed(2)}
            </td>
            <td>

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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceItem);
