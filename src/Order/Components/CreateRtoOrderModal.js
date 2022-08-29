import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { createRtoOrderRequest } from "../Duck/OrderActions";

const CreateRtoOrderModal = ({ show = false, onHide = () => {}, order = {}, ...props }) => {

    const onCreateRtoOrder = () => {
        let params = {
            order_id: order?._id,
        };
        props.createRtoOrder && props.createRtoOrder(params);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} backdrop={"static"}>
            <Modal.Header>
                <Modal.Title>Create RTO order</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Are you sure to create RTO request AWB Number <strong>{order?.ewaybill_number}</strong> order
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>

                <Button variant="primary" onClick={onCreateRtoOrder}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state, ownProps) => {
    let { order } = ownProps;

    let orderId  = order?.order_id;
    let orders = state.order?.orders;
    order = orderId && orders && orders[orderId];

    return {
        orderId: orderId,
        order: order,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createRtoOrder: (prams) => dispatch(createRtoOrderRequest(prams)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRtoOrderModal);
