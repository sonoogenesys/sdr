import React from 'react'
import { connect } from 'react-redux';

const ManifestOrderItem = ({ index = 0, order }) => {
    let customer_details = order?.customer_details;
    let product = order?.product_details;

    return (
        <tr>
            <td style={{ textAlign: "center" }}>{index + 1}</td>
            <td>{order?.ewaybill_number}</td>
            <td>{customer_details?.first_name ? `${customer_details?.first_name} ${customer_details?.last_name || ""}` : customer_details?.email} </td>
            <td style={{ textAlign: "center" }}>₹ {parseFloat(product?.selling_price || 0).toFixed(2)}</td>
            <td style={{ textAlign: "center" }}>{order?.payment_method}</td>
            <td style={{ textAlign: "center" }}>{parseFloat(product?.weight || 0).toFixed(2)} kg</td>
        </tr>
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

export default connect(mapStateToProps)(ManifestOrderItem);