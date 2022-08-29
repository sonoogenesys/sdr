import React from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { cancelOrderRequest } from "../Duck/OrderActions";

const CancelOrderModal = ({ show = false, onHide = () => {}, order = {}, ...props }) => {
    const onCancelOrder = () => {
        let { order_id, airwaybilno } = order;
        let params = {
            order_id: order_id,
            airwaybilno: airwaybilno,
        };
        props.cancelOrder && props.cancelOrder(params);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} backdrop={"static"}>
            <Modal.Header>
                <Modal.Title>Cancel order</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Are you sure to cancel AWB Number <strong>{order?.airwaybilno}</strong> order
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>

                <Button variant="primary" onClick={onCancelOrder}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        cancelOrder: (prams) => dispatch(cancelOrderRequest(prams)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrderModal);
